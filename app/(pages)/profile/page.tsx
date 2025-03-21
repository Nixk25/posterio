import BigTextEffect from "@/components/Login/BigTextEffect";
import ProfileBottom from "@/components/Profile/ProfileBottom";
import React from "react";

const Profile = () => {
  return (
    <section>
      <BigTextEffect headline="Joe Doe" direction={1} />

      <ProfileBottom />
    </section>
  );
};

export default Profile;
