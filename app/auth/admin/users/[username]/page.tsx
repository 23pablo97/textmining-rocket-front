"use client";
import Breadcrumb from "@/app/_utils/Breadcrumb";
import { authenticatedRequest } from "@/utils/api";
import { useCallback, useEffect, useState } from "react";
import UpdateInfo from "./_components/updateInfo";
import DangerZone from "./_components/dangerZone";

const UserIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="text-gray-500 w-4 h-4 mr-2">
        <path d="M4.5 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM14.25 8.625a3.375 3.375 0 1 1 6.75 0 3.375 3.375 0 0 1-6.75 0ZM1.5 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM17.25 19.128l-.001.144a2.25 2.25 0 0 1-.233.96 10.088 10.088 0 0 0 5.06-1.01.75.75 0 0 0 .42-.643 4.875 4.875 0 0 0-6.957-4.611 8.586 8.586 0 0 1 1.71 5.157v.003Z" />
    </svg>
);

export default function UserInfo({ params }: { params: any }) {
    const [user, setUser] = useState(null);

    const fetchData = useCallback(async () => {
        try {
          const response = await authenticatedRequest('get', `/users/${params.username}`);
          setUser(response.data);
        } catch (error) {
          console.error('Error fetching user info:', error);
        }
    }, [params.username]); // Asegúrate de incluir las dependencias necesarias
    
    useEffect(() => {
        fetchData();
    }, [fetchData, params.resource_id]);

    const breadcrumbs = [
        { name: 'Users', path: '/auth/admin/users' },
        { name: params.username, path: '#' }
    ];
    
    return (
        <main>
            <Breadcrumb icon={UserIcon} breadcrumbs={breadcrumbs}/>
            <UpdateInfo user={user}/>
            <DangerZone user={user}/>
        </main>
    );
}