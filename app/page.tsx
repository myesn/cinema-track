"use client";

import CinemaList from "@/components/CinemaList";
import SignIn from "@/components/SignInModal";
import { useEffect, useState } from "react";
import supabase from "@/supabse";
import { Button, Input } from "@nextui-org/react";
import { CinemaDto } from "@/types/dto";
import { PostgrestError } from "@supabase/supabase-js";
import ArrowPathIcon from "@/components/icons/ArrowPathIcon";
import PlusIcon from "@/components/icons/PlusIcon";
import CinemaUpsertDialog from "@/components/CinemaUpsertCard";

export default function Home() {
  const [signinVisible, setSigninVisible] = useState(false);
  const [upsertVisible, setUpsertVisible] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [keyword, setKeyword] = useState("");
  const { loading, upserting, error, cinemas, list, upsert, remove } =
    useCinema({
      keyword,
    });
  const [upsertForm, setUpsertForm] = useState<CinemaUpsertForm | null>(null);

  useEffect(() => {
    handleSigninOk();
    list();
  }, []);

  async function handleSigninOk() {
    const { data, error } = await supabase().auth.getUser();
    if (error) {
      console.log(`获取用户信息失败: ${error.message}`);
      return;
    }

    setSigninVisible(false);
    setUser((x) => ({ ...x, email: data.user?.email }));
  }

  async function handleSignoutClick() {
    await supabase().auth.signOut();
    setUser(null);
  }

  function handleSearchInputChange(value: any) {
    setKeyword(value ?? "");
  }

  function handleNewClick() {
    setUpsertVisible(true);

    // 有关键字但是筛选除的结果为空时
    if (keyword && !cinemas.length) {
      setUpsertForm({ name: keyword });
    } else {
      setUpsertForm(null);
    }
  }

  async function handleUpsertClick(form: CinemaUpsertForm) {
    await upsert(form);

    setKeyword("");

    if (form.id) {
      setUpsertVisible(false);
    }

    setUpsertForm({ id: undefined, name: "", remarks: "" });

    await list();
  }

  async function handleCinemaItemAction(action: string, cinema: CinemaDto) {
    if (action === "edit") {
      setUpsertVisible(true);
      setUpsertForm({
        id: cinema.id,
        name: cinema.name,
        remarks: cinema.remarks,
      });
    } else if (action === "delete") {
      if (confirm("确认删除？")) {
        await remove(cinema.id);
      }
    }
  }

  async function handleRefreshClick() {
    await list();
  }

  return (
    <main className="px-10">
      <div className="flex justify-between text-base">
        <p color="green" className="py-5">
          cenima records
        </p>

        <UserBlock
          user={user}
          onSigninClick={async () => {
            setSigninVisible(true);
          }}
          onSignoutClick={handleSignoutClick}
        />
      </div>

      <SignIn
        isOpen={signinVisible}
        onClose={() => setSigninVisible(false)}
        onSigninOk={handleSigninOk}
      />

      <div className="flex space-x-2">
        <Input
          autoFocus={true}
          readOnly={loading}
          placeholder="Search..."
          className="mb-5"
          value={keyword}
          isClearable
          onValueChange={handleSearchInputChange}
          onClear={() => handleSearchInputChange(null)}
        />

        <Button
          isLoading={loading}
          isIconOnly
          color="secondary"
          aria-label="Refresh"
          onPress={handleRefreshClick}
        >
          {!loading && <ArrowPathIcon />}
        </Button>

        {user && (
          <Button
            isLoading={loading}
            isIconOnly
            color="primary"
            aria-label="New"
            onPress={handleNewClick}
          >
            {!loading && <PlusIcon />}
          </Button>
        )}
      </div>

      {upsertVisible && (
        <CinemaUpsertDialog
          upserting={upserting}
          defaultValue={upsertForm}
          onUpsert={handleUpsertClick}
          onClose={() => setUpsertVisible(false)}
        />
      )}

      <CinemaList
        loading={loading}
        upserting={upserting}
        error={error}
        items={cinemas}
        keyword={keyword}
        showActions={!!user}
        onItemAction={handleCinemaItemAction}
      />
    </main>
  );
}

interface User {
  email?: string;
}

function UserBlock(props: UserBlockProps) {
  const { user } = props;

  if (!user) {
    return (
      <p
        className="py-5 underline cursor-pointer"
        onClick={props.onSigninClick}
      >
        signin
      </p>
    );
  }

  const { email } = user;
  const [username] = email?.split("@") ?? [];

  return (
    <p className="py-5 underline cursor-pointer" onClick={props.onSignoutClick}>
      <span className="no-underline">{username}</span> - signout
    </p>
  );
}

interface UserBlockProps {
  user: User | null;
  onSigninClick: () => Promise<void>;
  onSignoutClick: () => Promise<void>;
}

function useCinema(props: useCinemaProps) {
  const [cinemas, setCinemas] = useState<CinemaDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [upserting, setUpserting] = useState(false);
  const [error, setError] = useState<PostgrestError | null>(null);
  let filteredCinemas: CinemaDto[] = [...cinemas];

  // 立即执行
  // useEffect(() => {
  //   (async () => {

  //   })();
  // }, []);

  if (props.keyword) {
    filteredCinemas = [
      ...cinemas.filter((x) => x.name.toLowerCase().includes(props.keyword!)),
    ];
  }

  async function list() {
    setLoading(true);

    const { data, error } = await supabase()
      .from("cinemas")
      .select()
      .order("updated_at", { ascending: false });

    if (error) {
      setError(error);
    }

    if (!error && data) {
      const items: CinemaDto[] = data.map((x) => ({
        id: x.id,
        name: x.name,
        remarks: x.remarks ?? "",
        updated: new Date(x.updated_at).toLocaleDateString(),
      }));

      setCinemas([...items]);
    }

    setLoading(false);
  }

  async function remove(id: number) {
    if (!id) return;

    setLoading(true);

    const { error } = await supabase().from("cinemas").delete().eq("id", id);
    if (error) {
      //setError(error);
      alert(error.message);
    } else {
      setCinemas((items) => [...items.filter((x) => x.id !== id)]);
    }

    setLoading(false);
  }

  async function upsert(form: CinemaUpsertForm) {
    setUpserting(true);

    const { data, error } = await supabase()
      .from("cinemas")
      .upsert({
        id: form.id ?? undefined,
        name: form.name!,
        remarks: form.remarks ?? undefined,
      })
      .select();
    if (error?.message) {
      //setError(error);
      alert(error.message);
    }

    setUpserting(false);
  }

  return {
    loading,
    upserting,
    error,
    cinemas: filteredCinemas,

    list,
    upsert,
    remove,
  };
}

interface useCinemaProps {
  keyword?: string;
}

export interface CinemaUpsertForm
  extends Partial<Pick<CinemaDto, "id" | "name" | "remarks">> {}
