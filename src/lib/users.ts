
export const getUserByEmail = async (email: string) => {

    return await prisma.user.findFirst({
        where: {
            email
        }
    })

} 