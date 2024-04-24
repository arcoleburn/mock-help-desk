import React from "react";
import { useRouter } from "next/router";
import { useUser } from "../contexts/User/UserContext";
import { Button } from "antd";

const Header: React.FC = () => {
  const { logout, isLoggedIn } = useUser();
  return (
    <div>
      <h1>Rebootin' Raiders Tech Support System</h1>
      <p>"Have you tried turning it off and back on again?"</p>
      {isLoggedIn && (
        <Button type="text" onClick={() => logout()}>
          Log Out
        </Button>
      )}
    </div>
  );
};

export default Header;
