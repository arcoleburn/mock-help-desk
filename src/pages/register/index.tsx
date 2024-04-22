import React, { useState } from "react";
import { useUser } from "../../../contexts/User/UserContext";
import { Router, useRouter } from "next/router";

const Register: React.FC = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const router = useRouter()
  const {login} = useUser();

  const handleName = (input) => {
    setUserName(input);
  };

  const handlePass = (input) => {
    setPassword(input);
  };

  const handleEmail = (input) => {
    setEmail(input);
  };
  const handleAdmin = (input: boolean) => {
    setIsAdmin(input);
  };

  const handleRegister = async () => {
    const body = { userName, email, password, isAdmin };

    try {
     const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json()
      if(res.status===200){
        login(data.id, data.name, data.isAdmin)
        router.push('/')
      }
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div>
      <h2>User Registration</h2>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          required
          onChange={(e) => handleName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          required
          onChange={(e) => handleEmail(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          required
          onChange={(e) => handlePass(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="role">Role:</label>
        <select
          id="role"
          name="role"
          required
          onChange={(e) => setIsAdmin(e.target.value === "admin")}
        >
          <option value=""></option>
          <option value="admin">Admin</option>
          <option value="general">General</option>
        </select>
      </div>
      <button type="button" onClick={handleRegister}>Register</button>
    </div>
  );
};

export default Register;
