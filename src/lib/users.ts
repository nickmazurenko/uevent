export const getUserByEmail = async (email: string) => {
  const user = await prisma.user.findFirst({
    where: {
      email,
    },
    include: {
      tickets: {
        include: {
          event: {
            include: {
              purchasedTickets: true,
            },
          },
        },
      },
    },
  });
  return {
    ...user,
    createdAt: user?.createdAt.toISOString(),
    updatedAt: user?.updatedAt.toISOString(),
    tickets: user?.tickets.map((ticket) => ({
      ...ticket,
      event: {
        ...ticket.event,
        created_at: ticket.event.created_at.toISOString(),
        start_at: ticket.event.start_at.toISOString(),
      },
    })),
  };
};
