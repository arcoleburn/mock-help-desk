import React, { useEffect, useState } from "react";
import { useUser } from "../../shared/contexts/User/UserContext";
import { useRouter } from "next/router";
import { Alert, Button, Form, Input, Space } from "antd";
import Link from "next/link";

const LoginPage: React.FC = () => {
  const [username, setUserName] = useState("");
  const [pw, setPw] = useState("");
  const [error, setError] = useState(null);
  const { login, isLoggedIn } = useUser();
  const router = useRouter();

  const handleLogin = async () => {
    const body = { name: username, password: pw };
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (res.status === 200) {
      login(data.id, data.name, data.isAdmin);
      router.push("/");
    } else {
      setError(data.error);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/");
    }
  });

  return (
    <div>
      <h2>Login</h2>
      {error && <Alert message={error} type="error" showIcon />}

      <Form>
        <Form.Item label="Username" required>
          <Input
            value={username}
            onChange={(e) => setUserName(e.target.value)}
          />
        </Form.Item>
        <Form.Item label="Password" required>
          <Input.Password value={pw} onChange={(e) => setPw(e.target.value)} />
        </Form.Item>
        <Form.Item>
          <Space>
            <Button type="primary" onClick={handleLogin}>
              Login
            </Button>
            <Link href="/register">Register</Link>
          </Space>
        </Form.Item>
      </Form>
      <Button
        type="text"
        onClick={() => {
          setUserName("Admin1");
          setPw("pass");
        }}
      >
        Admin Demo
      </Button>
      <Button
        type="text"
        onClick={() => {
          setUserName("Bob");
          setPw("pass");
        }}
      >
        User Demo
      </Button>
    </div>
  );
};

export default LoginPage;
