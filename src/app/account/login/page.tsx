"use client"
import React, {useEffect, useState} from 'react';
import axios from "axios";
import {enqueueSnackbar} from "notistack";
import {closeButton} from "@/app/ui/action";
import Link from "next/link";

const Page: React.FC = () => {
    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.clear()
        }
    }, []);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        axios.post('https://ts.geliusihe.ru/login/', {username, password})
            .then(res => {
                localStorage.setItem("refresh", res.data.refresh)
                localStorage.setItem("token", res.data.access)
                localStorage.setItem("role", res.data.role)
                localStorage.setItem("isLoggedIn", "true")
                if(res.data.role == "support"){
                    window.location.href = "../../support"
                }
                window.location.href = "../../"
            })
            .catch(error => {
                console.error(error)
                // @ts-ignore
                enqueueSnackbar(`Возникла ошибка: ${error.response.data.error}`, {closeButton, 'variant': 'error', 'className': "snackerror"});
            })
    };

    return (
        <main className="w-full mt-[10%] flex justify-center items-center">
            <div className="flex w-1/3 flex-col gap-5 bg-white rounded-2xl p-10 max-md:w-full max-md:m-2">
                <h2 className="text-xl mb-10 text-center">Авторизация</h2>
                <form onSubmit={handleSubmit} className="flex flex-col space-y-4 w-full">
                    <input
                        type="text"
                        placeholder="Логин"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="border p-2 rounded-lg"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Пароль"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border p-2 rounded-lg"
                        required
                    />
                    <button type="submit" className="bg-orange text-white p-2 rounded-lg">
                        Войти
                    </button>
                </form>
                <p className="text-center">Еще не зарегестрированны? <Link href="./register" className="text-blue-500">Регистрация</Link></p>
            </div>
        </main>
    );
};

export default Page;