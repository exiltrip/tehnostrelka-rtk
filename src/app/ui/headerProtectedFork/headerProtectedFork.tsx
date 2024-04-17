"use client"
import React, {useEffect, useState} from 'react';
import Link from "next/link";
import Record from "@/app/ui/record/record";

const HeaderProtectedFork = () => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [role, setRole] = useState<string|null>("");

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const loggedIn = localStorage.getItem('isLoggedIn');
            const userRole = localStorage.getItem('role');
            setIsLoggedIn(loggedIn === 'true');
            setRole(userRole);
        }
    }, []);
    return (
            isLoggedIn ?
                    ( <div className="flex gap-5">
                        {role === "user" && <Record/>}
                        <Link className="max-md:text-sm" href="/faq">FAQ</Link>
                        {role === "user" && <Link className="max-md:text-sm" href="/account/tickets">Ваши обращения</Link>}
                        {role === "support" && <Link className="max-md:text-sm" href="/support">Обращения</Link>}
                        <Link className="max-md:text-sm" href="/account/login">Выйти</Link>
                      </div>)

                    : ( <div className="flex gap-3">
                            <Link className="max-md:text-sm" href="/account/login">Логин</Link>
                            <Link className="max-md:text-sm" href="/account/register">Регистрация</Link>
                        </div>)


    );
};

export default HeaderProtectedFork;