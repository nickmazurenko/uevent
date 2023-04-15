export const getUserByEmail = async (
  email: string,
  includeFavorites: boolean = false
) => {
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
      favorites: includeFavorites && {
        select: {
          event: {
            include: {
              purchasedTickets: true,
              favoritedBy: {
                select: {
                  user: {
                    select: {
                      email: true,
                    },
                  },
                },
              },
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
    ...(includeFavorites
      ? {
          favorites: user.favorites.map((favorite) => ({
            ...favorite.event,
            created_at: favorite.event.created_at.toISOString(),
            start_at: favorite.event.start_at.toISOString(),
          })),
        }
      : {}),
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
