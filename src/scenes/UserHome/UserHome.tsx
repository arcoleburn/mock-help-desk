import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useUser } from "../../shared/contexts/User/UserContext";
import { Button, Table, Tag } from "antd";
import { format } from "date-fns";

const UserHome = () => {
  const [tickets, setTickets] = useState([]);

  const router = useRouter();
  const { id, isLoggedIn } = useUser();

  const getTag = (value) => {
    switch (value) {
      case "high":
        return <Tag color="red">High</Tag>;
      case "medium":
        return <Tag color="yellow">Medium</Tag>;
      case "new":
        return <Tag color="volcano">New</Tag>;
      case "inProgress":
        return <Tag color="cyan">In Progress</Tag>;
      case "resolved":
        return <Tag color="#808080">Resolved</Tag>;
      default:
        return <Tag color="green">Low </Tag>;
    }
  };
  const getUserTickets = async () => {
    const res = await fetch("/api/tickets/alltickets");
    const tix = await res.json();
    const filtered = tix.filter((ticket) => ticket.reporterId === id);
    const formattedTix = filtered.map((ticket) => ({
      ...ticket,
      responder: !ticket.responder ? "Unassigned" : ticket.responder.name,
      createdAt: format(new Date(ticket.createdAt), "Pp"),
      details: "Details",
      priority: getTag(ticket.priority),
    }));
    return formattedTix;
  };

  const loadTickets = async () => {
    const results = await getUserTickets();
    if (results) {
      setTickets(results);
    }
  };

  useEffect(() => {
    if (!tickets.length) {
      loadTickets();
    }
  }, [tickets.length]);

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Date Created",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Assigned To",
      dataIndex: "responder",
      key: "responder",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Priority",
      dataIndex: "priority",
      key: "priority",
    },
    {
      details: "Details",
      dataIndex: "details",
      key: "detials",
      render: (details, record) => (
        <Button
          type="link"
          onClick={() => router.push(`/tickets/${record.id}`)}
        >
          {details}
        </Button>
      ),
    },
  ];

  return isLoggedIn ? (
    <div>
      <h1> User Home</h1>
      {tickets && <Table columns={columns} dataSource={tickets} />}
    </div>
  ) : (
    <></>
  );
};

export default UserHome;
