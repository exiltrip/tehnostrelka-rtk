"use client"
import Image from 'next/image';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { getToken } from '@/app/lib/token';
import "./window.css"
import {enqueueSnackbar} from "notistack";
import {closeButton} from "@/app/ui/action";

interface button{
    content: string
}

export default function Home() {
    const token = getToken();
    const [telegramLink, setTelegramLink] = useState<string | null>(null);
    const [searchWindowOpened, setSearchWindowOpened] = useState(false);
    const [messages, setMessages] = useState<object[]>([{
        message: "Привет! Я - умный бот для поддержки. Моя задача - помочь вам с ответами на ваши вопросы и решением проблем. Если вам нужна помощь от оператора, просто напишите \"оператор\", и я передам ваш запрос специалисту. Надеюсь, что смогу быть полезным для вас!",
        role: "support"
    }]);
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        if(token) {
            axios.get("https://ts.geliusihe.ru/generate_link/", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(res => {
                setTelegramLink(res.data.link);
                console.log(res.data);
            }).catch(error => {
                // @ts-ignore
                enqueueSnackbar(`Возникла ошибка: ${error.response.data.error}`, { closeButton,
                    'variant': 'error',
                    'className': "snackerror"
                });
            });
        }
    }, []);

    const sendMessage =  (messageText: string) => {
        setMessages((prevMessages) => [...prevMessages, {message: messageText, role: "user"}])
        const userMessage = messageText
        setInputValue('')
        axios.post('https://ts.geliusihe.ru/chat/init/', {message: userMessage}, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(response => {
                if(userMessage === "оператор" && response.data.message !== "Message successfully created"){
                    setMessages((prevMessages) => [...prevMessages,
                        {
                            message: "Переводим вас на оператора. Ожидайте ответ",
                            role: "support"
                        }]);
                }
                else if(userMessage === "оператор" && response.data.message == "Message successfully created")
                {
                    setMessages((prevMessages) => [...prevMessages,
                        {
                            message: "Уже перевели вас на оператора, Ожидайте ответ!",
                            role: "support"
                        }]);
                }
                else if(userMessage !== "оператор" && response.data.message == "Message successfully created")
                {
                    setMessages((prevMessages) => [...prevMessages,
                        {
                            message: "Ваше сообщение будет доставлено оператору и рассмотренно, как только оператор освободится.",
                            role: "support"
                        }]);
                }
                else
                {
                    setMessages((prevMessages) => [...prevMessages,
                        {
                            message: JSON.parse(response.data.message).messageContent,
                            button1: JSON.parse(response.data.message).button1,
                            button2: JSON.parse(response.data.message).button2,
                            button3: JSON.parse(response.data.message).button3,
                            role: "support"
                        }]);
                }


            })
            .catch(error => {
                setMessages((prevMessages) => [...prevMessages,
                    {
                        message: "Для того, что бы воспользоваться ботом, войдите или зарегестрируйтесь.",
                        role: "support"
                    }]);
                // @ts-ignore
                enqueueSnackbar(`Возникла ошибка: ${error.response.data.error}`, { closeButton, 'variant': 'error', 'className': "snackerror"});
            })
    }


    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSendMessage();
        }
    };

    const handleSendMessage = () => {
        if (inputValue.trim() !== '') {
            sendMessage(  inputValue );
        }
    };

    function Message({ message }: { message: {message: string, role: string, button1: button, button2: button, button3: button} }) {

        return (
            <div className="flex flex-col gap-3  max-w-[50%] max-md:max-w-full">
                <div className={`p-2 bg-white rounded-xl text-wrap basis-auto flex-grow-0 flex-shrink-0 ${message.role} `}>
                    <p>{message.message}</p>
                </div>
                <div className="grid gap-3">
                    {message.button1 && (
                        <div className={`grid grid-cols-${message.button2 ? '2' : '1'} gap-3`}>
                            {message.button1 && (
                                <button onClick={() => sendMessage(message.button1.content)} className="rounded-xl bg-gray-100 p-2 text-center">
                                    {message.button1.content}
                                </button>
                            )}
                            {message.button2 && (
                                <button onClick={() => sendMessage(message.button2.content)} className="rounded-xl bg-gray-100 p-2 text-center">
                                    {message.button2.content}
                                </button>
                            )}
                        </div>
                    )}
                    {message.button3 && (
                        <button onClick={() => sendMessage(message.button3.content)} className="rounded-xl bg-gray-100 p-2 text-center col-span-full">
                            {message.button3.content}
                        </button>
                    )}
                </div>
            </div>
        );
    }

    return (
        <main className="w-full">
            <div
                className={`p-10 py-20 gap-5 bg-white w-full flex flex-col justify-between searchWindow ${searchWindowOpened && "!h-screen-minus-header !py-10"}`}
            >
                {searchWindowOpened && (
                    <div className="w-full flex justify-end">
                        <button className="p-1 px-2 bg-orange rounded-lg text-white " onClick={() => setSearchWindowOpened(false)}>╳</button>
                    </div>
                )}
                <div className={`h-full flex flex-col w-full gap-2 custom-scrollbar !scroll-auto !overflow-y-scroll  ${!searchWindowOpened && "hidden"}`}>
                    {messages.map((message, index) => (
                        <Message key={index} message={message} />
                    ))}
                </div>
                <div className="flex justify-between bg-white border rounded-xl">
                    <input
                        onFocus={() => setSearchWindowOpened(true)}
                        type="text"
                        className="w-full p-2 rounded-xl outline-none"
                        placeholder="Задайте ваш вопрос..."
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <button className="p-2" onClick={handleSendMessage}>
                        <Image width={28} height={28} src="/send.svg" alt="Отправить" />
                    </button>
                </div>
            </div>
            <div className=" text-xl font-bold text-center flex items-center justify-center w-full gap-4 p-4 max-md:flex-col">
                Хотите получить уведомление об ответе оператора?
                <a href={telegramLink ? telegramLink : "/account/login"}>
                    <Image width={200} height={44} src="/linkTG.svg" alt="Привязать телеграм" />
                </a>
            </div>
        </main>
    );
}