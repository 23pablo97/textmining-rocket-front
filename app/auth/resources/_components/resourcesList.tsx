"use client";
import { authenticatedRequest } from '@/utils/api';
import { handleDownloadFile } from './utils';
import { useState, useEffect } from 'react';
import Pagination from '@/app/_utils/Pagination';
import { capitalizeFirstLetter, formatFileSize } from '@/utils/utils';
import UploadResourceForm from './uploadResource';
import { Document } from '@/app/_utils/types/Document';

export default function ResourcesList() {
    const [documents, setDocuments] = useState<Document[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalDocuments, setTotalDocuments] = useState(0);
    const [initDocumentCurrentPage, setInitDocumentCurrentPage] = useState(1);
    const [finalDocumentCurrentPage, setFinalDocumentCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');

    const limit = 10;

    const fetchData = async () => {
        try {
            let query = `/file_storage/latest_versions?pagination=true&page=${currentPage}&limit=${limit}`;
            
            if (searchQuery !== ''){
                query = `/file_storage/latest_versions?pagination=true&page=${currentPage}&limit=${limit}&resource_name=${searchQuery}`
            }

            const response = await authenticatedRequest('get', query);
            setDocuments(response.data.data);
            setTotalDocuments(response.data.metadata.total_documents);
            setTotalPages(Math.ceil(response.data.metadata.total_pages));
            setInitDocumentCurrentPage((currentPage-1) * limit  + 1);
            setFinalDocumentCurrentPage((currentPage-1) * limit + response.data.metadata.documents_in_current_page);
        } catch (error) {
            console.error('Error fetching documents:', error);
        }
    };

    useEffect(() => {fetchData();}, [currentPage, searchQuery]);

    return (
        <div>
            <div className="flex items-center justify-between space-x-6 mt-3 mb-3">
                <div className="flex-grow">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                            </svg>
                        </div>
                        <input 
                            onChange={(e) => setSearchQuery(e.target.value)} 
                            type="search" 
                            id="default-search" 
                            className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                            placeholder="Search resources..." 
                            required 
                        />
                    </div>
                </div>
                <div>
                    <UploadResourceForm fetchData={fetchData}/>
                </div>
            </div>
            <div className="overflow-x-auto">
                {totalDocuments !== 0 ? 
                    <>
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Resource Name
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Type
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Language
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Path
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Lastest version
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Size
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Created by
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Created at
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {documents.map((document) => (
                                    <tr key={document._id} className="bg-white border-b text-xs">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            {document.resource_name}
                                        </th>
                                        <td className="px-6 py-4">
                                            {capitalizeFirstLetter(document.resource_type)}
                                        </td>
                                        <td className="px-6 py-4">
                                            {capitalizeFirstLetter(document.resource_language)}
                                        </td>
                                        <td className="px-6 py-4">
                                            {document.file_path}
                                        </td>
                                        <td className="px-6 py-4">
                                            {document.version}
                                        </td>
                                        <td className="px-6 py-4">
                                            {formatFileSize(document.resource_size)}
                                        </td>
                                        <td className="px-6 py-4">
                                            {document.created_by.username}
                                        </td>
                                        <td className="px-6 py-4">
                                            {document.created_at}
                                        </td>
                                        <td className="flex px-6 py-4">
                                            <a onClick={() => handleDownloadFile({ id: document._id, resourceName: document.resource_name, version: document.version })} className="mr-2 font-medium text-blue-500 hover:text-blue-700">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                                                </svg>
                                            </a>
                                            <a href={`/auth/resources/${document._id}`} className="font-medium text-blue-500 hover:text-blue-700">
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
                        <Pagination 
                            currentPage={currentPage}
                            totalPages={totalPages}
                            totalDocuments={totalDocuments}
                            initDocumentCurrentPage={initDocumentCurrentPage}
                            finalDocumentCurrentPage={finalDocumentCurrentPage}
                            setCurrentPage={setCurrentPage}
                        />
                    </>
                : 
                    <>
                        <img src="https://cdn.dribbble.com/userupload/7051469/file/original-bb6f16ce2c8ea76a86409476f8ea051f.png?resize=1200x500" className="h-full w-full object-cover object-center group-hover:opacity-75"/>
                        <div className="text-center">
                            <h1 className="mt-4 text-xl font-bold tracking-tight text-gray-900">No resources available</h1>
                            <p className="mt-2 text-base leading-7 text-gray-600">Please upload a new resource</p>
                        </div>
                    </>
                }
            </div>
        </div>
    )
}