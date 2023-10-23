"use client";

import CinemaList from "@/components/CinemaList";
import SignIn from "@/components/SignInModal";
import { useEffect, useState } from "react";
import supabase from "@/supabse";

export default function Home() {
  const [signinVisible, setSigninVisible] = useState(false);
  const [user, setUser] = useState<User>({});

  useEffect(() => {
    handleSigninOk();
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
    setUser({});
  }

  return (
    <main className="px-10">
      <div className="flex justify-between text-base">
        <p color="green" className="py-5">
          cenima records
        </p>

        {!user.email && (
          <p
            className="py-5 underline cursor-pointer"
            onClick={() => setSigninVisible(true)}
          >
            signin
          </p>
        )}

        {user.email && (
          <p
            className="py-5 underline cursor-pointer"
            onClick={() => handleSignoutClick()}
          >
            <span className="no-underline">{user.email}</span> - 登出
          </p>
        )}
      </div>

      <SignIn isOpen={signinVisible} onClose={() => setSigninVisible(false)} onSigninOk={handleSigninOk} />


      <CinemaList />

    </main>
  );
}

interface User {
  email?: string;
}
