import prisma from '../../../../lib/prisma';

export default async function handle(req, res) {
  const { id: ticketId, title, description, priority, responderId } = req.body;
  console.log('ticket id from body:', ticketId)
  try {
    const updatedTicket = await prisma.ticket.update({
      where: {
        id: ticketId,
      },
      // ideally, want something less clunky. want to be able to just pass the changing data
      
      data: {
        title,
        description,
        priority,
        responderId: responderId || undefined, 
      },
    });

    res.json(updatedTicket);
  } catch (error) {
    console.error('Error updating ticket:', error);
    res.status(500).json({ error: 'An error occurred while updating the ticket.' });
  }
}