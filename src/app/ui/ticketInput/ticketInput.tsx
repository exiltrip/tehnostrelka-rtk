"use client"
import React, {useState} from 'react';
import axios from "axios";
import Image from "next/image";
import {getToken} from "@/app/lib/token";
import {enqueueSnackbar} from "notistack";
import {closeButton} from "@/app/ui/action";

const TicketInput = ({ id, reloadMessages }: { id: number|string, reloadMessages: any }) => {
    const token = getToken()
    const [file, setFile] = useState<File | null>(null);
    const [inputValue, setInputValue] = useState("")
    const handleSendMessage = () => {
        if (file !== null) {
            const formData = new FormData();
            formData.append("ticket", id.toString());
            formData.append("file", file);

            axios.post(`https://ts.geliusihe.ru/files/upload/`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            }).then(response => {
                // @ts-ignore
                enqueueSnackbar(`Файл загружен успешно`, {closeButton, 'variant': 'success', 'className': "snacksuccess"});

            }).catch(error => {
                // @ts-ignore
                enqueueSnackbar(`Возникла ошибка: ${error.response.data.error}`, {closeButton, 'variant': 'error', 'className': "snackerror"});

            });
        }

        axios.post(`https://ts.geliusihe.ru/messages/create/`, {
            ticket: id,
            text: inputValue
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => {
                setInputValue("")
                reloadMessages()

            })
    }
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSendMessage();
        }
    };
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files[0]) {
            setFile(files[0]);
        }
    };

    return (
        <div className="border w-full flex justify-between fixed bottom-0 left-0 p-1 bg-white">
            <div className="h-10 relative flex justify-center items-center cursor-pointer">
                <input onChange={handleFileChange} type="file" id="file-upload"
                       className="opacity-0 absolute w-full h-full z-10 "/>

                <label htmlFor="file-upload"
                       className="w-full h-full flex justify-center items-center bg-white hover:bg-gray-400 cursor-pointer rounded-lg">
                    <Image src="/file.svg" alt="Upload" width={24} height={24}/>
                </label>
            </div>
            <input
                type="text"
                className="w-full p-2 rounded-xl outline-none"
                placeholder="Сообщение..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
            />
            <button className="p-2" onClick={handleSendMessage}>
                <Image width={28} height={28} src="/send.svg" alt="Отправить"/>
            </button>
        </div>
    );
};

export default TicketInput;