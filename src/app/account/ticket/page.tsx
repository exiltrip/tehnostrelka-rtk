"use client"
import { useEffect, useState } from "react";
import axios from "axios";
import {getToken} from "@/app/lib/token";
import TicketInput from "@/app/ui/ticketInput/ticketInput";

interface Message {
    id: number;
    ticket: number;
    text: string;
    timestamp: string;
    role: string;
}

export default function Page() {
    const token = getToken();
    const [id, setId] = useState<string|null>("")
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const url = new URL(document.location.href);
            const idInner = url.searchParams.get('id')
            setId(idInner)
        }
    }, []);

    const [messages, setMessages] = useState<Message[]>([]);

    const getMessages = () => {
        axios.get(`https://ts.geliusihe.ru/tickets/${id}/messages/`, {headers: {Authorization: `Bearer ${token}`}})
            .then((response) => {
                setMessages(response.data);
            })
            .catch((error) => {
                console.error("Ошибка при получении сообщений:", error);
            });
    }
    useEffect(() => {
        if (id) {
            getMessages()
        }
    }, [id]);

    return (
        <div className="p-10 flex flex-col gap-4">
            <h1 className="text-xl font-bold ">Обращение #{id}</h1>
            {messages.map((message) => (
                <div className="border rounded-xl w-max p-3 min-w-[30%]  max-md:w-full" key={message.id}>
                    <p className="text-sm font-bold text-gray-700">{message.role == "user" ? "Вы" : "Оператор"}</p>
                    <p>{message.text}</p>
                    <p className="text-xs text-gray-600">{message.timestamp}</p>
                </div>
            ))}
            <div className="p-1"></div>
            <TicketInput id={id} reloadMessages={getMessages}/>
        </div>
    );
}