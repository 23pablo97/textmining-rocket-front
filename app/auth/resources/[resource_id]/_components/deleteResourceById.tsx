"use client";
import { useState, FormEvent } from 'react';
import { useRouter } from "next/navigation";
import { authenticatedRequest } from '@/utils/api';
import { useUser } from '../../../_layout/userContext';

export default function DeleteResourceById({ resourceId, version, fetchData }: { resourceId: string, version: string, fetchData: any }) {
    const router = useRouter();
    const [isUpload, setIsUpload] = useState(true);
    const [deleteWord, setDeleteWord] = useState('');
    const [deleteComment, setDeleteComment] = useState('');
    const [isForDelete, setIsForDelete] = useState(false);
    const [message, setMessage] = useState('');
    const { user } = useUser();

    const handleDeleteResource = async (e: FormEvent) => {
        e.preventDefault();

        setIsUpload(false);

        try {
            await authenticatedRequest('delete', `/file_storage/version?resource_id=${resourceId}`, {
                delete_comment: deleteComment,
                deleted_by: user && user.username || null,
            });
            fetchData();
            hideModal();
            setIsUpload(true);
        } catch (error) {
            console.error(error);
        }
    };

    const hideModal = () => {
        const modal = document.getElementById(`delete-resource-form-${resourceId}`);
        if (modal) {
            modal.classList.add('hidden');
        }
    };

    const showModal = () => {
        const modal = document.getElementById(`delete-resource-form-${resourceId}`);
        if (modal) {
            modal.classList.remove('hidden');
        }
    };

    const handleDeleteInput = (word: string) => {
        setDeleteWord(word);
        setIsForDelete(word === `DELETE_${version}` && deleteComment !== "");
    };

    const handleDeleteComment = (comment: string) => {
        setDeleteComment(comment);
        setIsForDelete(deleteWord === `DELETE_${version}` && comment !== "");
    };

    return (
        <div>
            <div className='ml-2'>
                <button type="button" onClick={showModal} className="flex items-center py-1 px-1 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-100 focus:ring-4 focus:ring-gray-100">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-3 h-3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                </button>

                <div id={`delete-resource-form-${resourceId}`} tabIndex={-1} aria-hidden="true" className="fixed hidden overflow-y-auto overflow-x-hidden top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50">
                    <div className="relative p-4 w-full max-w-2xl max-h-full">
                        <div className="relative bg-white rounded-lg shadow">
                            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                                <h3 className="text-xl font-semibold text-gray-900">
                                    {`Delete version "${version}"`}
                                </h3>
                                <button onClick={hideModal} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center">
                                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>
                            <div className="p-4 md:p-5 space-y-2">
                                <form onSubmit={handleDeleteResource}>
                                    <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900">Delete Comment</label>
                                    <textarea onChange={e => handleDeleteComment(e.target.value)} value={deleteComment} id="description" rows={4} className="block mb-5 p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Explain why you are deleting the resource. (it is required)"></textarea>

                                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                        Please, type the word DELETE_{version} to delete the resource
                                    </p>
                                    <div className="sm:col-span-3 mb-5">
                                        <div className="mt-2">
                                            <input onChange={e => handleDeleteInput(e.target.value)} value={deleteWord} type="text" id="delete-word" className="mb-5 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                                        </div>
                                    </div>
                                    <div className="flex items-center border-t border-gray-200 rounded-b dark:border-gray-600">
                                        {isUpload ?
                                            (!isForDelete ?
                                                <button disabled className="mt-3 text-white bg-red-500 focus:ring-4 focus:outline-none focus:ring-red-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Delete Resource</button>
                                                :
                                                <button type="submit" className="mt-3 text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Delete Resource</button>
                                            )
                                            :
                                            <button disabled type="button" className="mt-3 text-white bg-red-500 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 inline-flex items-center">
                                                <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                                                </svg>
                                                Deleting...
                                            </button>
                                        }
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
