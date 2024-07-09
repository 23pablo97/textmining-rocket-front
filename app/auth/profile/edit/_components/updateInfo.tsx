"use client";
import Cookies from "js-cookie";
import Image from 'next/image';

import { authenticatedRequest } from '@/utils/api';
import { useState, useEffect, FormEvent } from 'react';
import { useUser } from "../../../_layout/userContext";
import { getFirstLetterCapitalized } from '@/utils/utils';

export default function UpdateInfo() {
    const { user } = useUser();
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState<string | undefined>('');
    const [isUpload, setIsUpload] = useState(true);
    const [isSuccess, setIsSuccess] = useState(true);
    const [message, setMessage] = useState('');
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);

    useEffect(() => {
        if (user) {
            setUsername(user.username);
            setFirstName(user.first_name);
            setLastName(user.last_name);
            setEmail(user.email);
        }
    }, [user]);

    const handleUpdateInfo = async (e: FormEvent) => {
        e.preventDefault();

        setIsUpload(false);
        setIsSuccess(false);

        try {
            if (selectedImage) {
                const reader = new FileReader();
                reader.readAsDataURL(selectedImage);
                reader.onloadend = async () => {
                    const base64Image = reader.result;
                    const response = await authenticatedRequest('put', `/users/${username}`, {
                        username: username.trim(),
                        first_name: firstName.trim(),
                        last_name: lastName.trim(),
                        email,
                        image: base64Image
                    });
                    setMessage(response.data.message || 'Information updated successfully.');
                };
            } else {
                const response = await authenticatedRequest('put', `/users/${username}`, {
                    username: username.trim(),
                    first_name: firstName.trim(),
                    last_name: lastName.trim(),
                    email
                });
                setMessage(response.data.message || 'Information updated successfully.');
            }
            setIsUpload(true);
            setIsSuccess(true);
            const responseUser = await authenticatedRequest('get', `/users/${username}`);
            Cookies.set('user', JSON.stringify(responseUser.data));
            
        } catch (error) {
            setMessage('Failed to upload file.');
            setIsUpload(true);
            console.error(error);
        }
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                const result = reader.result;
                if (typeof result === 'string') {
                    setPreview(result);
                } else {
                    console.error('FileReader result is not a string:', result);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div>
            <div className="p-4 mt-5 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
                <h5 className="text-xl font-bold">General information</h5>
                <form>
                    <div className="sm:col-span-3 mb-5">
                        <label htmlFor="username" className="block mt-5 text-sm font-medium leading-6 text-gray-900">Username: {username}</label>
                    </div>
                    <div className="sm:col-span-3 mb-5">
                        <label htmlFor="photo" className="block mt-5 text-sm font-medium leading-6 text-gray-900">Photo</label>
                        <div className="flex items-center space-x-4">
                            <div className="relative inline-flex items-center justify-center w-20 h-20 overflow-hidden bg-gray-200 rounded-full">
                                {preview ? (
                                    <Image 
                                        src={preview}
                                        alt="Preview"
                                        layout="fill"
                                        objectFit="cover"
                                    />
                                ) : (
                                    <span className="font-medium text-gray-600">
                                    {user && getFirstLetterCapitalized(user.first_name)}
                                    {user && getFirstLetterCapitalized(user.last_name)}
                                    </span>
                                )}
                            </div>
                            <input
                            onChange={handleImageChange}
                            className="ml-5 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
                            type="file"
                            id="imageUpload"
                            accept="image/*"
                            />
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
