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
  const [tickets, setTickets]: ticket[] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const token = getToken();
        const response = await axios.get(
            "https://ts.geliusihe.ru/tickets/",
            { headers: { Authorization: `Bearer ${token}` } }
        );
        setTickets(response.data);
      } catch (error) {
        console.error("Error fetching tickets:", error);
      }
    };

    fetchTickets();
  }, []);

  return (
      <div className="p-8">
          <h1 className="text-xl mb-8">Ваши обращения</h1>
        <ul className="gap-3 flex flex-col ">
          {tickets.map((ticket) => (
              <li className="p-3" key={ticket.id}>
                <Link className="p-3 border rounded-xl w-max" href={`/ticket/${ticket.id}`}>
                  {ticket.title}
                </Link>
              </li>
          ))}
        </ul>
      </div>
  );
}
