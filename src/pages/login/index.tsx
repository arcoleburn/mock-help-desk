import React, { useState } from "react";
import { useUser } from "../../../contexts/User/UserContext";
import { useRouter } from "next/router";

const LoginPage: React.FC = () => {
  const [username, setUserName] = useState("");
  const [pw, setPw] = useState("");
  const [error, setError] = useState("");
  const { login } = useUser();
  const router = useRouter();
  const handleUserInput = (input) => {
    setUserName(input);
  };

  const handlePwInput = (input) => {
    setPw(input);
  };

  const handleLogin = async () => {
    const body = { name: username, password: pw };
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    console.log({ data });
    if (res.status === 200) {
      login(data.id, data.name, data.isAdmin);
      router.push('/');
    } else {
      setError(data.error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          required
          onChange={(e) => handleUserInput(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          required
          onChange={(e) => handlePwInput(e.target.value)}
        />
      </div>
      <button type="button" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
};

export default LoginPage;
