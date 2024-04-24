import { Alert, Button, Descriptions, Form, Input, Select, Tag } from "antd";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useUser } from "../../shared/contexts/User/UserContext";
import { updateTicket } from "../../shared/utils/api";

const TicketPage = () => {
  const [ticket, setTicket] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const [response, setResponse] = useState("");
  const [alert, setAlert] = useState({ error: null, message: "" });
  
  const router = useRouter();
  const { username, id: userId, isAdmin, isLoggedIn } = useUser();
  const { id } = router.query;

  const { TextArea } = Input;

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const res = await fetch(`/api/tickets/${id}`);
        const ticketData = await res.json();
        setTicket(ticketData);
        setNewStatus(ticketData.status);
      } catch (error) {
        console.error("Error fetching ticket", error);
      }
    };

    fetchTicket();
  }, [id]);

  const handleAssignClick = async (changedTicket) => {
    await updateTicket({ ...changedTicket, responderId: userId });
    setTicket({ ...changedTicket, responder: username });
  };

  //need to centralize this, its repeated in places
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

  const handleResponseEdit = (input) => {
    setResponse(input);
  };

  const handleResponseSubmit = async () => {
    const update = await updateTicket({
      ...ticket,
      status: newStatus,
      ick: userId,
    });
    setAlert(
      update.error
        ? { error: true, message: update.error }
        : { error: false, message: "Ticket Updated, Reply Sent" }
    );
    console.log("Would send email to:", ticket.reporter.email, "with:");
    console.table({
      title: ticket.title,
      description: ticket.description,
      priority: ticket.priority,
      status: newStatus,
      responder: username,
      response,
    });
  };

  if (!ticket) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Descriptions title="Ticket Details" bordered column={1}>
        <Descriptions.Item label={"Title"}>{ticket.title}</Descriptions.Item>
        <Descriptions.Item label={"Description"}>
          {ticket.description}
        </Descriptions.Item>
        <Descriptions.Item label={"Priority"}>
          {getTag(ticket.priority)}
        </Descriptions.Item>
        <Descriptions.Item label="Reporter">
          {`${ticket.reporter.name} (${ticket.reporter.email})`}
        </Descriptions.Item>
        <Descriptions.Item label={"Status"}>
          {getTag(ticket.status)}
        </Descriptions.Item>
        <Descriptions.Item label={"Assigned To"}>
          {ticket.responder ? (
            ticket.responder.name
          ) : isAdmin ? (
            <Button type="link" onClick={() => handleAssignClick(ticket)}>
              Assign to me
            </Button>
          ) : (
            "Unassigned"
          )}
        </Descriptions.Item>
      </Descriptions>
      {isAdmin && (
        <Form layout="vertical">
          <h3>Ticket Response Form</h3>
          {alert.message ? (
            <Alert
              type={alert.error ? "error" : "success"}
              message={alert.message}
              action={
                !alert.error && (
                  <Button
                    size="small"
                    type="link"
                    onClick={() => router.push("/")}
                  >
                    Go Home
                  </Button>
                )
              }
            />
          ) : null}
          <Form.Item label="Response" required>
            <TextArea
              onChange={(e) => handleResponseEdit(e.target.value)}
              rows={6}
            />
          </Form.Item>
          <Form.Item label="Update Status" required>
            <Select
              defaultValue={ticket.status}
              onChange={(value) => setNewStatus(value)}
              options={[
                { value: "inProgress", label: "In Progress" },
                { value: "new", label: "New" },
                { value: "resolved", label: "Resolved" },
              ]}
            ></Select>
          </Form.Item>
          <Button type="primary" onClick={handleResponseSubmit}>
            Submit Response
          </Button>
        </Form>
      )}
    </div>
  );
};

export default TicketPage;
