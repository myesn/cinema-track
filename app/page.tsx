"use client";

import { Flex, Title } from "@tremor/react";
import CinemaList from "@/components/CinemaList";
import SignIn from "@/components/SignIn";
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
      <Flex>
        <Title color="green" className="py-5">
          cenima records
        </Title>

        {!user.email && (
          <Title
            className="py-5 underline cursor-pointer"
            onClick={() => setSigninVisible(true)}
          >
            signin
          </Title>
        )}

        {user.email && (
          <Title
            className="py-5 underline cursor-pointer"
            onClick={() => handleSignoutClick()}
          >
            <span className="no-underline">{user.email}</span> - 登出
          </Title>
        )}
      </Flex>

      {signinVisible && <SignIn onSigninOk={handleSigninOk} />}
      <CinemaList />
    </main>
  );
}

interface User {
  email?: string;
}
