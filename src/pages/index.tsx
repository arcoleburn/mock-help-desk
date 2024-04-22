import React from "react"
import Layout from "../../components/Layout"
import { useUser } from "../../contexts/User/UserContext";
import AdminHome from "../scenes/AdminHome";
import UserHome from "../scenes/UserHome";

const Home: React.FC = (props) => {
  const {isAdmin} = useUser()
  return (
    <Layout>
      <div className="page">
        <h1>Tech Support System</h1>
        <main>
          {isAdmin ? <AdminHome/> : <UserHome/>}
        </main>
      </div>
      <style jsx>{`
        .post {
          background: white;
          transition: box-shadow 0.1s ease-in;
        }

        .post:hover {
          box-shadow: 1px 1px 3px #aaa;
        }

        .post + .post {
          margin-top: 2rem;
        }
      `}</style>
    </Layout>
  )
}

export default Home
