"use client";

import { useEffect, useState } from "react";
import supabase from "@/supabse";
import SignInModal from "@/components/sign-in-modal";
import UserBlock from "@/components/user-block";
import CinemaManageContainer from "@/components/containers/cinema-manage-container";

export default function Home() {
  const [signinVisible, setSigninVisible] = useState(false);
  const [user, setUser] = useState<User | null>(null);

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

      <CinemaManageContainer userId={user?.id} />
    </main>
  );
}

interface User {
  id: string;
  email: string;
}
