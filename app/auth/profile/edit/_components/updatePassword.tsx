"use client";
import { authenticatedRequest } from "@/utils/api";
import PrelineScript from "@/utils/preline";
import { useState, FormEvent } from 'react';
import { useUser } from "../../../_layout/userContext";

export default function UpdatePassword() {
    const { user } = useUser();
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [isUpload, setIsUpload] = useState(true);
    const [isSuccess, setIsSuccess] = useState(true);
    const [message, setMessage] = useState('');


    const handleUpdatePassword = async (e: FormEvent) => {
        e.preventDefault();

        setIsUpload(false);
        setIsSuccess(false);

        if (newPassword !== confirmNewPassword){
            setIsUpload(true);
            setIsSuccess(true);
            setMessage("New Password doesn't match with validation password.");
        }

        try {
            if (user) {

                const response = await authenticatedRequest('put', `/users/${user.username}`, {
                    password: password,
                    new_password: newPassword,
                });
                setIsUpload(true);
                setIsSuccess(true);
                setMessage(response.data.message || 'Password updated successfully.');
            }
        } catch (error) {
            setMessage('Error during changing the password, please contact the admin.');
            console.error(error);
        }
    };

    return (
        <div>
            <PrelineScript />
            <div className="p-4 mt-5 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
                <h5 className="text-xl font-bold">Change password</h5>
                <form>
                    <div className="relative sm:col-span-3 mb-5">
                        <label htmlFor="current-password" className="block mt-5 text-sm font-medium leading-6 text-gray-900">Current password</label>
                        <input
                            onChange={e => setPassword(e.target.value)}
                            value={password}
                            id="current-password"
                            type="password"
                            className="mt-2 mb-5 shadow-sm bg-gray-50 text-gray-900 leading block border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none w-full p-2.5"
                            placeholder="Enter current password"
                        />
                        <button type="button" data-hs-toggle-password='{"target": "#current-password"}' className="absolute top-9 end-0 p-2.5 rounded-e-md">
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
                    <div className="relative sm:col-span-3 mb-5">
                        <label htmlFor="new-password" className="block text-sm font-medium leading-6 text-gray-900">New password</label>
                        <input
                            onChange={e => setNewPassword(e.target.value)}
                            value={newPassword}
                            id="new-password"
                            type="password"
                            className="mt-2 mb-5 shadow-sm bg-gray-50 text-gray-900 leading block border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none w-full p-2.5"
                            placeholder="Enter new password"
                        />
                        <button type="button" data-hs-toggle-password='{"target": "#new-password"}' className="absolute top-9 end-0 p-2.5 rounded-e-md">
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
                    <div className="relative sm:col-span-3 mb-5">
                        <label htmlFor="confirm-new-password" className="block text-sm font-medium leading-6 text-gray-900">Confirm new password</label>
                        <input
                            onChange={e => setConfirmNewPassword(e.target.value)}
                            value={confirmNewPassword}
                            id="confirm-new-password"
                            type="password"
                            className="mt-2 mb-5 shadow-sm bg-gray-50 text-gray-900 leading block border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none w-full p-2.5"
                            placeholder="Confirm new password"
                        />
                        <button type="button" data-hs-toggle-password='{"target": "#confirm-new-password"}' className="absolute top-9 end-0 p-2.5 rounded-e-md">
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
            
                {isUpload ?
                    <button onClick={handleUpdatePassword} type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Change Password
                    </button>
                    :
                    <button disabled type="button" className="text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 inline-flex items-center">
                        <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                        </svg>
                        Updating...
                    </button>
                }
                {message && <p className="mt-2 text-sm text-red-600">{message}</p>}
            </div>
        </div>
    );
}
