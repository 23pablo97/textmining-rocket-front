"use client";
import { useState, useEffect } from 'react';
import { authenticatedRequest } from '@/utils/api';
import { capitalizeFirstLetter } from '@/utils/utils';
import CreateUser from './createUser';

interface User {
    _id: string;
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    role: string;
}

export default function UserList() {
    const [users, setUsers] = useState<User[]>([]);

    const fetchData = async () => {
        try {
            const response = await authenticatedRequest('get', '/users');
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="overflow-x-auto">
            <div className="flex justify-end py-4">
                <CreateUser fetchData={fetchData}/>
            </div>
            {users.length > 0 ? (
                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">Username</th>
                            <th scope="col" className="px-6 py-3">First Name</th>
                            <th scope="col" className="px-6 py-3">Last Name</th>
                            <th scope="col" className="px-6 py-3">Email</th>
                            <th scope="col" className="px-6 py-3">Role</th>
                            <th scope="col" className="px-6 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user._id} className="bg-white border-b text-xs">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                    {user.username}
                                </th>
                                <td className="px-6 py-4">
                                    {capitalizeFirstLetter(user.first_name)}
                                </td>
                                <td className="px-6 py-4">
                                    {capitalizeFirstLetter(user.last_name)}
                                </td>
                                <td className="px-6 py-4">
                                    {user.email}
                                </td>
                                <td className="px-6 py-4">
                                    {capitalizeFirstLetter(user.role)}
                                </td>
                                <td className="flex px-6 py-4">
                                    <a href={`/auth/admin/users/${user.username}`} className="font-medium text-blue-500 hover:text-blue-700">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                        </svg>
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div className="text-center">
                    <img src="https://cdn.dribbble.com/userupload/7051469/file/original-bb6f16ce2c8ea76a86409476f8ea051f.png?resize=1200x500" className="h-full w-full object-cover object-center group-hover:opacity-75" alt="No resources available"/>
                    <h1 className="mt-4 text-xl font-bold tracking-tight text-gray-900">No resources available</h1>
                    <p className="mt-2 text-base leading-7 text-gray-600">Please upload a new resource</p>
                </div>
            )}
        </div>
    );
}
