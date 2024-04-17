import React from 'react';
import Link from "next/link";
import Image from "next/image";
import HeaderProtectedFork from "@/app/ui/headerProtectedFork/headerProtectedFork";

const Header = () => {
    return (
            <header className="w-full p-2 border-b-[1px] border-gray-300 gap-3 flex justify-between items-center px-8">
                <Link href="/"><Image width={600} height={204} src="/logo.png" alt="Ростелеком" className="w-[150px] mb-3.5 max-md:mb-2"/></Link>
                <HeaderProtectedFork/>
            </header>
    );
};

export default Header;