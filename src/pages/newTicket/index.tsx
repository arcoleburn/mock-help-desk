import { useState } from "react";
import { useUser } from "../../shared/contexts/User/UserContext";
import { Button, Form, Input, Select } from "antd";

const NewTicketForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("low");

  const { id } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = {
      userId: id,
      title,
      description,
      priority,
    };
    console.log({ body });

    // should abstract away to api utils
    await fetch("/api/tickets/newticket", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  };

  return (
    <Form layout="vertical">
      <Form.Item label="Title">
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </Form.Item>
      <Form.Item label="Description">
        <Input.TextArea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </Form.Item>
      <Form.Item label="Priority">
        <Select
          value={priority}
          options={[
            { value: "high", label: "High" },
            { value: "medium", label: "Medium" },
            { value: "low", label: "Low" },
          ]}
          onChange={(value) => setPriority(value)}
          defaultValue="low"
        />
      </Form.Item>
      <Button type="primary" onClick={handleSubmit}>
        Submit Ticket
      </Button>
    </Form>
  );
};

export default NewTicketForm;
