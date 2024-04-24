import React, { useEffect } from "react";
import Layout from "../shared/components/Layout";
import { useUser } from "../shared/contexts/User/UserContext";
import AdminHome from "../scenes/AdminHome";
import UserHome from "../scenes/UserHome";
import { useRouter } from "next/router";

const Home: React.FC = (props) => {
  const { isAdmin, isLoggedIn } = useUser();
  const router = useRouter();
  useEffect(() => {
    !isLoggedIn && router.push("/login");
  }, [isLoggedIn]);
  return (
    <div>
      <div>
        <main>{isAdmin ? <AdminHome /> : <UserHome />}</main>
      </div>
    </div>
  );
};

export default Home;
