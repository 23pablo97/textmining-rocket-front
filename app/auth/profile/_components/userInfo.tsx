"use client";
import { useState, useEffect } from 'react';
import { capitalizeFirstLetter, getFirstLetterCapitalized } from '@/utils/utils';
import Cookies from 'js-cookie';
import { useUser } from "../../_layout/userContext";

interface User {
    first_name: string;
    last_name: string;
    username: string;
    email: string;
}

declare global {
    interface Window {
        HSStaticMethods?: {
            autoInit: () => void;
        };
    }
}

export default function UserInfo() {
    const { user } = useUser();

    return (
        <div className="overflow-x-auto">
            <div className="flex justify-end py-4">
                <a href="/auth/profile/edit">
                    <button type="button" className="flex items-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-100 focus:ring-4 focus:ring-gray-100">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4 mr-1">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                        </svg>
                        Edit User
                    </button>
                </a>
            </div>

            <div className='ml-10'>
                <div className="mb-5 relative inline-flex items-center justify-center w-40 h-40 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                    <span className="font-small text-5xl text-gray-600 align-left">
                        {user && getFirstLetterCapitalized(user.first_name)}{user && getFirstLetterCapitalized(user.last_name)}
                    </span>
                </div>
                <h2 className="text-xl font-semibold text-gray-900">
                    {user && user.username}
                </h2>
                <h2 className="text-sm text-gray-700">
                    {user && capitalizeFirstLetter(user.first_name)} {user && capitalizeFirstLetter(user.last_name)}
                </h2>
                <h2 className="text-sm text-gray-700">
                    {user && user.email}
                </h2>
            </div>
        </div>
    );
}
