"use client";
import { authenticatedRequest } from '@/utils/api';
import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { capitalizeFirstLetter } from '@/utils/utils';

export default function UpdateInfo({user}:{user: any}) {
    const roles = ['user', 'admin', 'external'];
    const [role, setRole] = useState(roles[0]);
    const [username, setUsername] = useState('');
    const [initialUsername, setInitialUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState<string | undefined>('');
    const [isUpload, setIsUpload] = useState(true);
    const [isSuccess, setIsSuccess] = useState(true);
    const [message, setMessage] = useState('');
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [usernameCheck, setUsernameCheck] = useState('');

    useEffect(() => {
        if (user) {
            setInitialUsername(user.username)
            setUsername(user.username);
            setFirstName(user.first_name);
            setLastName(user.last_name);
            setEmail(user.email);
            setRole(user.role);
        }
    }, [user]);

    const handleRoleChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setRole(event.target.value);
    };

    const handleUpdateInfo = async (e: FormEvent) => {
        e.preventDefault();

        setIsUpload(false);
        setIsSuccess(false);

        try {
            const response = await authenticatedRequest('put', `/users/${username}`, {
                username: username.trim(),
                first_name: firstName.trim(),
                last_name: lastName.trim(),
                email,
                role
            });
            setMessage(response.data.message || 'Information updated successfully.');
            setIsUpload(true);
            setIsSuccess(true);
        } catch (error) {
            setMessage('Failed to upload file.');
            setIsUpload(true);
            console.error(error);
        }
    };

    const handleChangeUsername = async (event: ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
        if (event.target.value === initialUsername){
            setUsernameCheck('Same initial username');
            return;
        }
        if (event.target.value !== '') {
            const response = await authenticatedRequest('get', `/users/check_username?username=${event.target.value}`);
            setUsernameCheck(response.data.message);
        } else {
            setUsernameCheck('');
        }
    };

    

    return (
        <div>
            <div className="p-4 mt-5 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
                <h5 className="text-xl font-bold">General information</h5>
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
                                <input onChange={handleChangeUsername} value={username} type="text" id="username" className="mb-2 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                            </div>
                            {usernameCheck !== '' ?
                                (<div className="flex mb-4 items-center text-xs text-green-800" role="alert">
                                    <svg className="flex-shrink-0 inline w-3 h-3 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                                    </svg>
                                    <span className="sr-only">Info</span>
                                    <div>
                                        <span className="font-medium">{usernameCheck}</span>
                                    </div>
                                </div>)
                                :
                                <></>
                            }
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                            <label htmlFor="first_name" className="block text-sm font-medium leading-6 text-gray-900">First Name</label>
                            <div className="mt-2">
                                <input 
                                    onChange={e => setFirstName(e.target.value)} 
                                    value={firstName} 
                                    type="text" 
                                    id="first_name" 
                                    className="mb-5 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" 
                                />
                            </div>
                        </div>
                        <div className="sm:col-span-3">
                            <label htmlFor="last_name" className="block text-sm font-medium leading-6 text-gray-900">Last Name</label>
                            <div className="mt-2">
                                <input 
                                    onChange={e => setLastName(e.target.value)} 
                                    value={lastName} 
                                    type="text" 
                                    id="last_name" 
                                    className="mb-5 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" 
                                />
                            </div>
                        </div>
                    </div>
                    <div className="sm:col-span-3 mb-5">
                        <label htmlFor="email" className="block mt-2 text-sm font-medium leading-6 text-gray-900">Email</label>
                        <div className="mt-2">
                            <input 
                                onChange={e => setEmail(e.target.value)} 
                                value={email} 
                                type="email" 
                                id="email" 
                                className="mb-5 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" 
                            />
                        </div>
                    </div>
                </form>
                {isUpload ?
                    <button 
                        onClick={handleUpdateInfo} 
                        type="submit" 
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Update information
                    </button>
                    :
                    <button 
                        disabled 
                        type="button" 
                        className="text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 inline-flex items-center"
                    >
                        <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                        </svg>
                        Updating...
                    </button>
                }
                {message && <p className="mt-2 text-sm text-red-600">{message}</p>}
            </div>
        </div>
    );
}
