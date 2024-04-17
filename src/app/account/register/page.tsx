"use client"
import React, { useState } from 'react';
import axios from "axios";
import Link from "next/link";

const Page: React.FC = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        axios.post('https://ts.geliusihe.ru/register/', {username, password, email})
            .then(res => {
                axios.post('https://ts.geliusihe.ru/login/', {username, password})
                    .then(res => {
                        localStorage.setItem("refresh", res.data.refresh)
                        localStorage.setItem("token", res.data.access)
                        localStorage.setItem("role", res.data.role)
                        localStorage.setItem("isLoggedIn", "true")
                        window.location.href = "../../"
                    })
                    .catch(error => {
                        console.error(error)
                    })
            })
            .catch(error => {
                console.error(error)
            })
    };

    return (
        <main className="w-full mt-[10%] flex justify-center items-center">
            <div className="flex w-1/3 flex-col gap-5 bg-white rounded-2xl p-10 max-md:w-full max-md:m-2">
            <h2 className="text-xl text-center mb-10">Регистрация</h2>
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                <input
                    type="email"
                    placeholder="E-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border p-2 rounded-lg"
                    required
                />
                <input
                    type="username"
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
                <div className="flex items-center gap-2">
                    <input name="personalData" required={true} type="checkbox"/>
                    <label htmlFor="personalData" className="text-xs">я соглашаюсь с <Link className="text-blue-500" href="/personal-data">обработкой персональных данных</Link></label>
                </div>
                <button type="submit" className="bg-orange text-white p-2 rounded-lg">
                    Зарегестрироваться
                </button>
            </form>
                <p className="text-center">Уже зарегестрированны? <Link href="./login" className="text-blue-500">Войти</Link> </p>
            </div>
        </main>
    );
};

export default Page;