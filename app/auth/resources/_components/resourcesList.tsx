"use client";
import { authenticatedRequest } from '@/utils/api';
import { handleDownloadFile } from './utils';
import { useState, useEffect } from 'react';
import Pagination from '@/app/_utils/Pagination';
import { capitalizeFirstLetter, formatFileSize } from '@/utils/utils';
import UploadResourceForm from './uploadResource';

interface Document {
    _id: string;
    resource_name: string;
    resource_description: string;
    resource_type: string;
    resource_language: string;
    file_path: string;
    version: string;
    resource_size: number;
    created_by: string;
    created_at: string;
}

export default function ResourcesList() {
    const [documents, setDocuments] = useState<Document[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalDocuments, setTotalDocuments] = useState(0);
    const [initDocumentCurrentPage, setInitDocumentCurrentPage] = useState(1);
    const [finalDocumentCurrentPage, setFinalDocumentCurrentPage] = useState(1);

    const limit = 10;

    const fetchData = async () => {
        try {
            const response = await authenticatedRequest(
                'get',
                `/file_storage/latest_versions?pagination=true&page=${currentPage}&limit=${limit}`
            );
            setDocuments(response.data.data);
            setTotalDocuments(response.data.metadata.total_documents);
            setTotalPages(Math.ceil(response.data.metadata.total_pages));
            setInitDocumentCurrentPage((currentPage-1) * limit  + 1);
            setFinalDocumentCurrentPage((currentPage-1) * limit + response.data.metadata.documents_in_current_page);
        } catch (error) {
            console.error('Error fetching documents:', error);
        }
    };

    useEffect(() => {fetchData();}, [currentPage]);

    return (
        <div>
            <div className="flex justify-end py-4">
                    <UploadResourceForm fetchData={fetchData}/>
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
                                        Description
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
                                            {document.resource_description}
                                        </td>
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
                                            {document.created_by}
                                        </td>
                                        <td className="px-6 py-4">
                                            {document.created_at}
                                        </td>
                                        <td className="px-6 py-4">
                                            <a onClick={() => handleDownloadFile({ id: document._id, resourceName: document.resource_name, version: document.version })} className="font-medium text-blue-500 hover:text-blue-700">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
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