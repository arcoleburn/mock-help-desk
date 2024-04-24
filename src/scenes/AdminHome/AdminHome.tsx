import { useEffect, useState } from "react";
import { Button, Switch, Table, Tag } from "antd";
import { updateTicket } from "../../shared/utils/api";
import { format } from "date-fns";
import { useUser } from "../../shared/contexts/User/UserContext";
import { useRouter } from "next/router";
const AdminHome = () => {
  const [tickets, setTickets] = useState([]);

  const router = useRouter();
  const { username, id, isLoggedIn } = useUser();

  //centralize this somewhere
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
  const getAllTickets = async () => {
    const res = await fetch("/api/tickets/alltickets");
    const tix = await res.json();

    const formattedTix = tix.map((ticket) => {
      return {
        ...ticket,
        responder: !ticket.responder ? "Assign to me" : ticket.responder.name,
        createdAt: format(ticket.createdAt, "Pp"),
        details: "Details",
        priority: getTag(ticket.priority),
        status: getTag(ticket.status),
      };
    });
    return formattedTix;
  };
  const loadTickets = async () => {
    const results = await getAllTickets();
    if (results) {
      setTickets(results);
    }
  };

  useEffect(() => {
    if (!tickets.length) {
      loadTickets();
    }
  }, [tickets.length]);

  const handleAssignClick = async (changedTicket) => {
    await updateTicket({ ...changedTicket, responderId: id });
    setTickets(
      tickets.map((ticket) => {
        if (ticket.id === changedTicket.id) {
          return { ...ticket, responder: username };
        }
        return ticket;
      })
    );
  };
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
      render: (responder, record) =>
        responder !== "Assign to me" ? (
          <span>{responder}</span>
        ) : (
          <Button
            style={{ padding: "0" }}
            type="link"
            onClick={() => handleAssignClick(record)}
          >
            {responder}
          </Button>
        ),
      filters: [
        { text: "Unassigned", value: "Assign to me" },
        { text: "My Tickets", value: username },
      ],
      onFilter: (value, record) => {
        return record.responder === value;
      },
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
      <h1> Admin Home</h1>
      {tickets && <Table columns={columns} dataSource={tickets} />}
    </div>
  ) : (
    <></>
  );
};

export default AdminHome;
