import { useState } from "react";
import { useUser } from "../../../contexts/User/UserContext";

const NewTicketForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");

  const fetchAllTix = async() =>{
    const res = await fetch('/api/tickets/alltickets', {
      method: 'GET',
    })
    console.log(res.json())
  }
  const { id } = useUser();
  console.log('user id on form', {id})
  const handleSubmit = async (e) => {
    e.preventDefault()
    const body = {
      userId: id,
      title,
      description,
      priority,
    };
    console.log({body})
    fetchAllTix()
    const data = await fetch("/api/tickets/newticket", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    console.log({data})
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="priority">Priority:</label>
        <select
          id="priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          required
        >
          <option value="">Select Priority</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
      <button onClick={handleSubmit}>Submit</button>
    </form>
  );
};

export default NewTicketForm;
