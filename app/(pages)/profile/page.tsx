import BigTextEffect from "@/components/Login/BigTextEffect";
import ProfileBottom from "@/components/Profile/ProfileBottom";
import React from "react";
import { auth } from "@/auth";
import { headers } from "next/headers";
const Profile = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return (
    <section>
      <BigTextEffect headline={session?.user.name} direction={1} />
      <ProfileBottom />
    </section>
  );
};

export default Profile;
