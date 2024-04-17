"use client"
import axios from "axios";
import { useEffect, useState } from "react";
import { getToken } from "@/app/lib/token";
import Link from "next/link";

interface ticket{
    id: number,
    title: string,
    description: string,
    status: string,
    created_at: string,
    updated_at: string,
    user: number,
}
export default function Page() {
    const [tickets, setTickets] = useState<ticket[]>([])

    useEffect(() => {
        const token = getToken();
        axios.get(
            "https://ts.geliusihe.ru/tickets/",
            { headers: { Authorization: `Bearer ${token}` } }
        )
            .then(res => setTickets(res.data))
            .catch(error => {
                console.error("Error fetching tickets:", error);
            })
    }, []);

    return (
        <div className="p-8">
            <h1 className="text-xl mb-8">Ваши обращения</h1>
            <ul className="gap-3 flex flex-col ">
                {tickets.map((ticket: ticket) => (
                    <li className="p-3" key={ticket.id}>
                        <Link className="p-3 border rounded-xl w-max" href={`/account/ticket?id=${ticket.id}`}>
                            #{ticket.id} {ticket.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
