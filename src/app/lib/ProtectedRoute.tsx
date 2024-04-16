"use client"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    useEffect(() => {
        // Проверяем на стороне клиента, чтобы localStorage был доступен
        if (typeof window !== 'undefined') {
            const loggedIn = localStorage.getItem('isLoggedIn');
            setIsLoggedIn(loggedIn === 'true');
        }
    }, []);

    useEffect(() => {
        // Если пользователь не авторизован, перенаправляем на страницу входа
        if (!isLoggedIn) {
            router.push('/login');
        }
    }, [isLoggedIn, router]);

    // Если пользователь авторизован, рендерим дочерние компоненты
    if (isLoggedIn) {
        return {children};
    }

    // Если пользователь не авторизован, отображаем пустой компонент или загрузочный индикатор
    return null;
};

export default ProtectedRoute;