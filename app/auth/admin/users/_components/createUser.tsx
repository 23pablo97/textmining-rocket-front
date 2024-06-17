"use client";
import { useState, ChangeEvent, FormEvent } from 'react';
import { authenticatedRequest } from '@/utils/api';
import { capitalizeFirstLetter } from '@/utils/utils';
import PrelineScript from "@/utils/preline";

interface CreateUserProps {
    fetchData: () => void;
}

export default function CreateUser({ fetchData }: CreateUserProps) {
    const roles = ['user', 'admin', 'external'];

    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState(roles[0]);
    const [password, setPassword] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const [isUpload, setIsUpload] = useState(true);
    const [message, setMessage] = useState('');

    const setInitialData = () => {
        setUsername('');
        setFirstName('');
        setLastName('');
        setEmail('');
        setRole(roles[0]);
        setPassword('');
    };

    const handleRoleChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setRole(event.target.value);
    };

    const hideModal = () => {
        const closeModalButton = document.getElementById('close-modal-button');
        if (closeModalButton) {
            closeModalButton.click();
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        setIsUpload(false);
        setIsSuccess(false);

        try {
            const response = await authenticatedRequest('post', `/users/create_user`, {
                username: username.trim(),
                password,
                first_name: firstName.trim(),
                last_name: lastName.trim(),
                email,
                role,
            });
            setMessage(response.data.message);
            fetchData();
            setIsUpload(true);
            hideModal();
            setIsSuccess(true);
        } catch (error) {
            setMessage('Failed to upload file.');
            console.error(error);
        }
        setInitialData();
    };

    return (
        <div>
            <button type="button" data-modal-target="upload-resource-form" data-modal-toggle="upload-resource-form" className="flex items-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-100 focus:ring-4 focus:ring-gray-100">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4 mr-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
                </svg>
                New user
            </button>
            <PrelineScript />
            {isSuccess && (
                <div id="toast-top-right" className="fixed flex bg-green-400 text-white items-center w-full mt-40 max-w-xs p-4 space-x-4 text-gray-500 bg-emerald divide-x rtl:divide-x-reverse divide-gray-200 rounded-lg shadow top-5 right-4" role="alert">
                    <div className="text-sm font-normal">User created successfully.</div>
                    <div className="flex items-center ms-auto">
                        <button type="button" className="ms-auto -my-1.5 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8" onClick={() => setIsSuccess(false)} aria-label="Close">
                            <span className="sr-only">Close</span>
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}
            <div id="upload-resource-form" tabIndex={-1} aria-hidden="true" className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                <div className="relative p-4 w-full max-w-2xl max-h-full">
                    <div className="relative bg-white rounded-lg shadow">
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                            <h3 className="text-xl font-semibold text-gray-900">New user</h3>
                            <button id="close-modal-button" type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" data-modal-hide="upload-resource-form">
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        <div className="p-4 md:p-5 space-y-2">
                            <form>
                                <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                    <div className="sm:col-span-3">
                                        <label htmlFor="role" className="block text-sm font-medium leading-6 text-gray-900">Role</label>
                                        <div className="mt-2">
                                            <select
                                                id="role"
                                                className="mb-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                                value={role}
                                                onChange={handleRoleChange}
                                            >
                                                {roles.map((roleOption, index) => (
                                                    <option key={index} value={roleOption}>{capitalizeFirstLetter(roleOption)}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="sm:col-span-3">
                                        <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">Username</label>
                                        <div className="mt-2">
                                            <input onChange={e => setUsername(e.target.value)} value={username} type="text" id="username" className="mb-5 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                    <div className="sm:col-span-3">
                                        <label htmlFor="first_name" className="block text-sm font-medium leading-6 text-gray-900">First Name</label>
                                        <div className="mt-2">
                                            <input onChange={e => setFirstName(e.target.value)} value={firstName} type="text" id="first_name" className="mb-5 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-3">
                                        <label htmlFor="last_name" className="block text-sm font-medium leading-6 text-gray-900">Last Name</label>
                                        <div className="mt-2">
                                            <input onChange={e => setLastName(e.target.value)} value={lastName} type="text" id="last_name" className="mb-5 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                                        </div>
                                    </div>
                                </div>

                                <div className="sm:col-span-3 mb-5">
                                    <label htmlFor="email" className="block mt-5 text-sm font-medium leading-6 text-gray-900">Email</label>
                                    <div className="mt-2">
                                        <input onChange={e => setEmail(e.target.value)} value={email} type="email" id="email" className="mb-5 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                                    </div>
                                </div>

                                <div className="relative sm:col-span-3 mb-5">
                                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                                    <input onChange={e => setPassword(e.target.value)} value={password} id="password" type="password" className="mt-2 mb-5 shadow-sm bg-gray-50 text-gray-900 leading block border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none w-full p-2.5" placeholder="Enter password" />
                                    <button type="button" data-hs-toggle-password='{"target": "#password"}' className="absolute top-9 end-0 p-2.5 rounded-e-md">
                                        <svg className="flex-shrink-0 size-3.5 text-gray-400 dark:text-neutral-600" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path className="hs-password-active:hidden" d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path>
                                            <path className="hs-password-active:hidden" d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path>
                                            <path className="hs-password-active:hidden" d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path>
                                            <line className="hs-password-active:hidden" x1="2" x2="22" y1="2" y2="22"></line>
                                            <path className="hidden hs-password-active:block" d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                                            <circle className="hidden hs-password-active:block" cx="12" cy="12" r="3"></circle>
                                        </svg>
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                            {isUpload ? (
                                <button onClick={handleSubmit} type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create</button>
                            ) : (
                                <button disabled type="button" className="text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 inline-flex items-center">
                                    <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                                    </svg>
                                    Creating...
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
