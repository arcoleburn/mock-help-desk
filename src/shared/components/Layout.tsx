import React, { ReactNode } from "react";
import Header from "./Header";
import { Layout, Menu } from "antd";
import { useUser } from "../contexts/User/UserContext";
import Link from "next/link";
type Props = {
  children: ReactNode;
};

const MyLayout: React.FC<Props> = (props) => {
  const { isAdmin, isLoggedIn, logout } = useUser();

  return (
    <div>
      <Layout>
        <Header />
        {isLoggedIn && (
          <Menu mode="horizontal">
            {isAdmin ? (
              <Menu.Item key="home">
                <Link href="/">Home</Link>
              </Menu.Item>
            ) : (
              <>
                <Menu.Item key="home">
                  <Link href="/">Home</Link>
                </Menu.Item>
                <Menu.Item key="new-ticket">
                  <Link href="/newTicket">New Ticket</Link>
                </Menu.Item>
              </>
            )}
        
          </Menu>
        )}
        <div>{props.children}</div>
      </Layout>
    </div>
  );
};
export default MyLayout;
