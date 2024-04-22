import { useEffect, useState } from "react";
import TicketTable from "../../shared/components/TicketTable";
import { Button, Switch, Table } from "antd";
import { getAllTickets, updateTicket } from "../../shared/utils/api";
import { format } from "date-fns";
import { useUser } from "../../../contexts/User/UserContext";
const AdminHome = () => {
  const [tickets, setTickets] = useState([]);
  const [showAll, setShowAll] = useState(true);

  const { username, id } = useUser();
  const getAllTickets = async () => {
    const res = await fetch("/api/tickets/alltickets");
    const tix = await res.json();

    const formattedTix = tix.map((ticket) => {
      return {
        ...ticket,
        responder: !ticket.responder ? "Assign to me" : ticket.responder.name,
        createdAt: format(ticket.createdAt, "Pp"),
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
  }, [tickets.length, showAll]);

  const handleAssignClick = async (changedTicket) => {
    await updateTicket({ ...changedTicket, responderId: id });
    setTickets(
      tickets.map((ticket) => {
        if (ticket.id === changedTicket.id) {
          return { ...ticket, responder: username };
        }
        return ticket
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
          <Button type="link" onClick={() => handleAssignClick(record)}>
            {responder}
          </Button>
        ),
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
  ];

  return (
    <div>
      <h1> Admin Home</h1>
      <Switch
        checked={showAll}
        onChange={() => setShowAll(!showAll)}
        checkedChildren="Show All"
        unCheckedChildren="Show Mine"
      />
      {tickets.length && <Table columns={columns} dataSource={tickets} />}
    </div>
  );
};

export default AdminHome;
