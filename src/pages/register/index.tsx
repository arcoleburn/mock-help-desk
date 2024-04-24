import React, { useState } from "react";
import { useUser } from "../../shared/contexts/User/UserContext";
import { useRouter } from "next/router";
import { Button, Form, Input, Select } from "antd";

const Register: React.FC = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const router = useRouter();
  const { login } = useUser();

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
      // abstract to api utils
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (res.status === 200) {
        login(data.id, data.name, data.isAdmin);
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2>User Registration</h2>
      <Form layout="vertical">
        <Form.Item label="Name">
          <Input value={userName} onChange={(e)=>handleName(e.target.value)} />
        </Form.Item>
        <Form.Item label="Email">
          <Input value={email} onChange={(e) => handleEmail(e.target.value)} />
        </Form.Item>
        <Form.Item label="Password">
          <Input.Password
            value={password}
            onChange={(e) => handlePass(e.target.value)}
          />
        </Form.Item>
        <Form.Item label="Role">
          <Select onChange={(value)=>handleAdmin(value==="admin")} >
            <Select.Option value="admin">Admin</Select.Option>
            <Select.Option value="general" selected>General</Select.Option>
          </Select>
        </Form.Item>
        <Button type="primary" onClick={handleRegister}>
          Register
        </Button>
      </Form>
    </div>
  );
};

export default Register;
