import { Event, User } from "@prisma/client";

const CHRONOS_URL = process.env.CHRONOS_URL as string;
if (CHRONOS_URL === undefined) {
    console.log("add CHRONOS_URL to .env");
}

const CHRONOS_SECRET = process.env.CHRONOS_SECRET as string;
if (CHRONOS_SECRET === undefined) {
    console.log("add CHRONOS_SECRET to .env");
}

export default class ChronosService {
    static async addEvent(event: Event, user: User, calendarName: string) {
        console.log(calendarName);
        if (!user.email) {
            throw new Error("User must have an email");
        }

        const endAt = new Date(event.start_at);
        endAt.setMilliseconds(endAt.getMilliseconds() + event.duration);

        const res = await fetch(`${CHRONOS_URL}/api/applications/events`, {
            method: "POST",
            headers: {
                appsecret: `Bearer ${CHRONOS_SECRET}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userEmail: user.email,
                calendarName,
                eventData: {
                    name: event.name,
                    color: "#D50000",
                    type: "reminder",
                    startAt: event.start_at,
                    endAt: endAt.toISOString(),
                    duration: event.duration / 100,
                },
            }),
        });

        if (!res.ok) {
            return console.log("Bad create event in chronos response");
        }

        const resData = await res.json();

        console.log(resData);

        const id: string = resData.data.event.id as string;

        // add id to user ticket?

        console.log("Created event in chronos: " + id);

        return { chronosEventId: id };
    }

    static async deleteEvent(chronosEventId: string, user: User) {
        if (!user.email) {
            throw new Error("User must have an email");
        }

        const res = await fetch(
            `${CHRONOS_URL}/api/applications/events/${chronosEventId}`,
            {
                method: "DELETE",
                headers: {
                    appsecret: `Bearer ${CHRONOS_SECRET}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userEmail: user.email,
                }),
            }
        );

        if (!res.ok) {
            console.log("Bad delete event in chronos response");
        }

        return true;
    }

    static async moveEvent(
        chronosEventId: string,
        user: User,
        calendarName: string
    ) {
        if (!user.email) {
            throw new Error("User must have an email");
        }

        const res = await fetch(
            `${CHRONOS_URL}/api/applications/events/${chronosEventId}/move`,
            {
                method: "POST",
                headers: {
                    appsecret: `Bearer ${CHRONOS_SECRET}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userEmail: user.email,
                    calendarName,
                }),
            }
        );

        if (!res.ok) {
            console.log("Bad create event in chronos response");
        }

        const resData = await res.json();

        const id: string = resData.data.event.id as string;

        // add id to user ticket?

        console.log("Created event in chronos: " + id);

        return { chronosEventId: id };
    }

    static async getUserCalendars(user: User) {
        if (!user.email) {
            throw new Error("User must have an email");
        }

        const res = await fetch(
            `${CHRONOS_URL}/api/applications/userCalendars/${user.email}`,
            {
                method: "GET",
                headers: {
                    appsecret: `Bearer ${CHRONOS_SECRET}`,
                },
            }
        );

        if (!res.ok) {
            console.log("Bad get user calendars in chronos response");
        }

        const resData = await res.json();

        if (
            !resData.data ||
            !resData.data.calendars ||
            resData.data.calendars.length < 1
        ) {
            return [];
        }
        const calendars = resData.data.calendars as { name: string }[];

        return calendars;
    }
}
