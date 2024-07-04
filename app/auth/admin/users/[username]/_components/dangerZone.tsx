"use client";
import { useState, useEffect, FormEvent } from 'react';
import { useRouter } from "next/navigation";
import { authenticatedRequest } from '@/utils/api';


export default function DangerZone({user}:{user: any}) {
    const router = useRouter();
    const [isUpload, setIsUpload] = useState(true);
    const [deleteWord, setDeleteWord] = useState('');
    const [isForDelete, setIsForDelete] = useState(false);
    const [username, setUsername] = useState('');
    const [resetMessage, setResetMessage] = useState('');

    useEffect(() => {
        if (user) {
            setUsername(user.username);
        }
    }, [user]);

    const handleDeleteProfile = async (e: FormEvent) => {
        e.preventDefault();

        setIsUpload(false);

        try {
            await authenticatedRequest('delete', `/users/${username}`, {});
            setIsUpload(true);
            hideModal();
            router.push('/auth/admin/users');
        } catch (error) {
            console.error(error);
        }
    };

    const hideModal = () => {
        const closeModalButton = document.getElementById('close-modal-button');
        if (closeModalButton) {
            closeModalButton.click();
        }
    };

    const handleDeleteInput = (word: string) => {
        setDeleteWord(word);
        setIsForDelete(word === 'DELETE');
    };

    const handleResetPassword = async () => {
        setIsUpload(false);
        await authenticatedRequest('post', `/reset_password/${username}`, {});
        setIsUpload(true);
        setResetMessage('Password reseted');
    }

    return (
        <div>
            <div className="p-4 mt-5 border-2 border-red-600 border-dashed rounded-lg dark:border-gray-700">
                <h5 className="text-xl font-bold">Danger Zone</h5>

                <ul className="mt-5 divide-y divide-gray-200 dark:divide-gray-700">
                    <li className="pb-3 sm:pb-4">
                        <div className="flex items-center space-x-4 rtl:space-x-reverse">
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                    Reset Password
                                </p>
                            </div>
                            {isUpload ? 
                                (<button onClick={handleResetPassword} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Reset Password</button>)
                             :
                                (<button 
                                    disabled 
                                    type="button" 
                                    className="text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 inline-flex items-center"
                                >
                                    <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                                    </svg>
                                    Reseting...
                                </button>)
                            }
                        </div>
                        {resetMessage !== "" && <p className="mt-2 text-sm text-red-600">{resetMessage}</p>}
                    </li>
                    <li className="pb-3 sm:pb-4">
                        <div className="flex mt-4 items-center space-x-4 rtl:space-x-reverse">
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                    Delete profile
                                </p>
                            </div>
                            <button data-modal-target="delete-profile-form" data-modal-toggle="delete-profile-form" className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Delete Profile</button>
                        </div>
                    </li>
                </ul>

                <div id="delete-profile-form" tabIndex={-1} aria-hidden="true" className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                    <div className="relative p-4 w-full max-w-2xl max-h-full">
                        <div className="relative bg-white rounded-lg shadow">
                            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t ">
                                <h3 className="text-xl font-semibold text-gray-900">
                                    Delete profile
                                </h3>
                                <button id="close-modal-button" type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" data-modal-hide="delete-profile-form">
                                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>
                            <div className="p-4 md:p-5 space-y-2">
                                <form>
                                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                        Please, type the word "DELETE" to delete the profile
                                    </p>
                                    <div className="sm:col-span-3 mb-5">
                                        <div className="mt-2">
                                            <input onChange={e => handleDeleteInput(e.target.value)} value={deleteWord} type="text" id="delete-word" className="mb-5 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                                {isUpload ?
                                    (!isForDelete ? 
                                        <button disabled className="text-white bg-red-500 focus:ring-4 focus:outline-none focus:ring-red-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Delete Profile</button>
                                        :
                                        <button onClick={handleDeleteProfile} type="submit" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Delete Profile</button>
                                    )
                                    :
                                    <button disabled type="button" className="text-white bg-red-500 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 inline-flex items-center">
                                        <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                                        </svg>
                                        Deleting...
                                    </button>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
