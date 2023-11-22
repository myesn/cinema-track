"use client";

import { useEffect, useState } from "react";
import supabase from "@/supabse";
import { CinemaUpsertForm } from "@/components/cinema-manage/cinema-upsert";
import SignInModal from "@/components/sign-in-modal";
import UserBlock from "@/components/user-block";
import CinemaManage from "@/components/cinema-manage/cinema-manage";
import { useCinemaClient } from "@/hooks/use-cinema-client";

export default function Home() {
  const [signinVisible, setSigninVisible] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const { loading, items: cinemas, list, upsert, remove } = useCinemaClient();

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
    setUser((x) => ({
      ...x,
      id: data.user.id,
      email: data.user.email!,
    }));
  }

  async function handleSignoutClick() {
    await supabase().auth.signOut();
    setUser(null);
  }

  async function handleCinemaRefresh() {
    await list();
  }

  async function handleCinemaUpsert(form: CinemaUpsertForm) {
    await upsert(user!.id, form);
    await list();
  }

  async function handleCinemaDelete(id: number) {
    await remove(id);
  }

  return (
    <main className="px-10">
      <div className="flex justify-between text-base">
        <p color="green" className="py-5">
          cenima records
        </p>

        <UserBlock
          user={user}
          onSigninClick={() => {
            setSigninVisible(true);
          }}
          onSignoutClick={handleSignoutClick}
        />
      </div>

      <SignInModal
        isOpen={signinVisible}
        onClose={() => setSigninVisible(false)}
        onSigninOk={handleSigninOk}
      />

      <CinemaManage
        isSingin={!!user}
        listLoading={loading}
        items={cinemas}
        onRefresh={handleCinemaRefresh}
        onUpsert={handleCinemaUpsert}
        onDelete={handleCinemaDelete}
      />
    </main>
  );
}

interface User {
  id: string;
  email: string;
}
