"use client";
import React, { useState, useRef, ChangeEvent, FormEvent } from 'react';
import { authenticatedRequest } from '@/utils/api';
import { capitalizeFirstLetter } from '@/utils/utils';
import { useUser } from '../../_layout/userContext';

interface UploadResourceFormProps {
    fetchData: () => void;
}

const UploadResourceForm: React.FC<UploadResourceFormProps> = ({ fetchData }) => {
    const resourceTypes = ['corpus', 'ontology', 'other'];
    const needLanguage = ['corpus', 'ontology'];
    const languages = ['catalan', 'english', 'spanish'];

    const [file, setFile] = useState<File | null>(null);
    const [filename, setFilename] = useState('');
    const [resourceName, setResourceName] = useState('');
    const [description, setDescription] = useState('');
    const [resourceType, setType] = useState(resourceTypes[0]);
    const [resourceLanguage, setResourceLanguage] = useState(languages[0]);
    const [saveRemote, setSaveRemote] = useState(true);
    const [message, setMessage] = useState('');
    const [isUpload, setIsUpload] = useState(true);
    const [isSuccess, setIsSuccess] = useState(false);
    const [filenameCheck, setFilenameCheck] = useState('');
    const [isNameDuplicated, setIsNameDuplicated] = useState(false);
    const { user } = useUser();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const setInitialData = () => {
        setFile(null);
        setFilename('');
        setResourceName('');
        setDescription('');
        setType('corpus');
        setResourceLanguage('catalan');
        setMessage('');
        setIsSuccess(false);
        setFilenameCheck('');
        setIsNameDuplicated(false);
        setSaveRemote(true);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    }

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setFile(event.target.files[0]);
            setFilename(event.target.files[0].name);
        }
    };

    const handleChangeName = async (event: ChangeEvent<HTMLInputElement>) => {
        setResourceName(event.target.value);
        if (event.target.value !== '') {
            const response = await authenticatedRequest('get', `/file_storage/check_filename?resource_name=${event.target.value}`);
            setFilenameCheck(response.data.message);
            setIsNameDuplicated(response.data.is_duplicated);
        } else {
            setFilenameCheck('');
        }
    };

    const handleTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setType(event.target.value);
    };

    const handleLanguageChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setResourceLanguage(event.target.value);
    };

    const hideModal = () => {
        const closeModalButton = document.getElementById('close-modal-button');
        if (closeModalButton) {
            closeModalButton.click();
        }
    };

    const handleSubmit = async (e: FormEvent<HTMLButtonElement>) => {
        e.preventDefault();

        setIsUpload(false);
        setIsSuccess(false);
        if (!file) {
            setMessage('Please select a file.');
            setIsUpload(true);
            return;
        }

        try {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = async () => {
                const base64File = (reader.result as string).split(',')[1];
                if (!user) {
                    setMessage('User not found.');
                    return;
                }
                const response = await authenticatedRequest('put', `/file_storage/upload_file`, {
                    resource_file: base64File,
                    resource_filename: filename,
                    resource_name: resourceName.trim(),
                    resource_description: description,
                    resource_language: resourceLanguage,
                    resource_type: resourceType,
                    save_remote: saveRemote,
                    created_by: user.username,
                });
                if (response.status === 200){
                    fetchData();
                    hideModal();
                    setIsSuccess(true);
                } else {
                    console.log(response.data.error);
                    setMessage(response.data.error);
                }
                setIsUpload(true);
            };
        } catch (error) {
            setMessage('Failed to upload file.');
            console.error(error);
        }
        setInitialData();
    };

    const handleCheckboxChange = (event: { target: { checked: boolean | ((prevState: boolean) => boolean); }; }) => {
        console.log(event.target.checked);
        setSaveRemote(event.target.checked);
    };

    return (
        <div>
            <button type="button" data-modal-target="upload-resource-form" data-modal-toggle="upload-resource-form" className="flex items-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-100 focus:ring-4 focus:ring-gray-100">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4 mr-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15" />
                </svg>
                Upload resource
            </button>
            {isSuccess ? (
                <div id="toast-top-right" className="fixed flex bg-green-400 text-white items-center w-full mt-40 max-w-xs p-4 space-x-4 text-gray-500 bg-emerald divide-x rtl:divide-x-reverse divide-gray-200 rounded-lg shadow top-5 right-4" role="alert">
                    <div className="text-sm font-normal">Resource uploaded successfully.</div>
                    <div className="flex items-center ms-auto">
                        <button type="button" className="ms-auto -my-1.5 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8" onClick={() => setIsSuccess(false)} aria-label="Close">
                            <span className="sr-only">Close</span>
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                        </button>
                    </div>
                </div>
            ) : null}
            <div id="upload-resource-form" tabIndex={-1} aria-hidden="true" className="hidden fixed inset-0 z-50 overflow-y-auto bg-gray-900 bg-opacity-75 flex justify-center items-center">
                <div className="relative p-4 w-full max-w-2xl max-h-full">
                    <div className="relative bg-white rounded-lg shadow">
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                            <h3 className="text-xl font-semibold text-gray-900">
                                Upload resource
                            </h3>
                            <button id="close-modal-button" type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" data-modal-hide="upload-resource-form">
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        <div className="p-4 md:p-5 space-y-2">
                            {/* Form */}
                            <div className="flex p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400" role="alert">
                                <svg className="flex-shrink-0 inline w-4 h-4 me-3 mt-[2px]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                                </svg>
                                <span className="sr-only">Info</span>
                                <div>
                                    <span className="font-medium">Data quality matters to us! Follow these tips</span>
                                    <ul className="mt-1.5 list-disc list-inside">
                                        <li>Use a clear resource name.</li>
                                        <li>In the description be as comprehensive as possible with what the resource contains, this helps us to understand what we have.</li>
                                    </ul>
                                </div>
                            </div>
                            <form>
                                <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                    <div className="sm:col-span-3">
                                        <label htmlFor="type" className="block text-sm font-medium leading-6 text-gray-900">Type</label>
                                        <div className="mt-2">
                                            <select 
                                                id="type"
                                                className="mb-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                                value={resourceType}
                                                onChange={handleTypeChange}
                                            >
                                                {resourceTypes.map((resourceTypeOption, index) => (
                                                    <option key={index} value={resourceTypeOption}>{capitalizeFirstLetter(resourceTypeOption)}</option>
                                                ))}
                                            </select>                                    
                                        </div>
                                    </div>

                                    {needLanguage.includes(resourceType) ? 
                                        <div className="sm:col-span-3">
                                            <label htmlFor="language" className="block text-sm font-medium leading-6 text-gray-900">Language</label>
                                            <div className="mt-2">
                                                <select 
                                                    id="language"
                                                    className="mb-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                                    value={resourceLanguage}
                                                    onChange={handleLanguageChange}
                                                >
                                                    {languages.map((language, index) => (
                                                        <option key={index} value={language}>{capitalizeFirstLetter(language)}</option>
                                                    ))}
                                                </select>                                    
                                            </div>
                                        </div>
                                    :
                                        <div className="sm:col-span-3">
                                            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">Resource Name</label>
                                            <div className="mt-2">
                                                <input onChange={handleChangeName} value={resourceName} type="text" id="name" className="mb-1 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                                            </div>
                                            {filenameCheck !== '' ?
                                            (<div className="flex items-center text-xs text-green-800" role="alert">
                                                <svg className="flex-shrink-0 inline w-3 h-3 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                                                </svg>
                                                <span className="sr-only">Info</span>
                                                <div>
                                                    <span className="font-medium">{filenameCheck}</span>
                                                </div>
                                            </div>)
                                            :
                                            <></>
                                        }
                                        </div>
                                    }
                                </div>

                                {needLanguage.includes(resourceType) ? 
                                    <div className="sm:col-span-3 mb-5">
                                        <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">Resource Name</label>
                                        <div className="mt-2">
                                            <input onChange={handleChangeName} value={resourceName} type="text" id="name" className="mb-1 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                                        </div>
                                        {filenameCheck !== '' ?
                                            (<div className="flex items-center text-xs text-green-800" role="alert">
                                                <svg className="flex-shrink-0 inline w-3 h-3 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                                                </svg>
                                                <span className="sr-only">Info</span>
                                                <div>
                                                    <span className="font-medium">{filenameCheck}</span>
                                                </div>
                                            </div>)
                                            :
                                            <></>
                                        }
                                    </div>
                                :
                                    <></>
                                }
                
                                <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900">Resource { !isNameDuplicated ? 'description': 'changelog' }</label>
                                <textarea onChange={e => setDescription(e.target.value)} value={description} id="description" rows={4} className="block mb-5 p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Add the resource description..."></textarea>

                                <label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="resource_file">File</label>
                                { resourceType === 'corpus' ? 
                                    (<div className="p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400" role="alert">
                                        For corpus, please upload a zip file with a folder inside with the documents. The zip and folder have to have the same name. For example:<br/>
                                        <pre className="p-2 rounded-md">
                                            <code className="font-mono">
                                                new_resource.zip<br />
                                                &emsp;|_ new_resource<br />
                                                &emsp;&emsp;|_ file_1.txt<br />
                                                &emsp;&emsp;|_ file_2.txt<br />
                                                &emsp;&emsp;|_ ...
                                            </code>
                                        </pre>
                                    </div>)
                                    :
                                    <></>
                                }
                                <input 
                                    onChange={handleFileChange}
                                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50" 
                                    id="resource_file"
                                    type="file"
                                    ref={fileInputRef}
                                />
                                <div className="flex mt-5 items-center">
                                <input
                                    id="link-checkbox"
                                    type="checkbox"
                                    checked={saveRemote}
                                    onChange={handleCheckboxChange}
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                />
                                <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Upload to Marenostrum.</label>
                                </div>                           
                            </form>
                            { message !== "" ? 
                                <div className="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                                    <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                                    </svg>
                                    <span className="sr-only">Info</span>
                                    <div>
                                        {message}
                                    </div>
                                </div>
                                :
                                <></>
                            }
                        </div>
                        <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b">
                            {isUpload?
                                <button onClick={handleSubmit} type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Upload</button>
                                :
                                <button disabled type="button" className="text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 inline-flex items-center">
                                    <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                                    </svg>
                                    Uploading...
                                </button>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UploadResourceForm;
