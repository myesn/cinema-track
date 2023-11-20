"use client";

import { useEffect, useState } from "react";
import supabase from "@/supabse";
import { CinemaUpsertForm } from "@/components/CinemaManage/CinemaUpsertCard";
import SignIn from "@/components/SignInModal";
import UserBlock from "@/components/UserBlock";
import CinemaManage from "@/components/CinemaManage/CinemaManage";
import { useCinema } from "@/hooks/useCinema";

export default function Home() {
  const [signinVisible, setSigninVisible] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const { loading, cinemas, list, upsert, remove } = useCinema();

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

      <SignIn
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
