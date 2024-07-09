"use client";
import Image from 'next/image';
import { authenticatedRequest } from '@/utils/api';
import { useState, useEffect, useCallback } from 'react';
import Pagination from '@/app/_utils/Pagination';
import UploadServiceForm from './uploadService';
import { Service } from '@/app/_utils/types/Service';

export default function ServicesList() {
    const [services, setServices] = useState<Service[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalDocuments, setTotalDocuments] = useState(0);
    const [initDocumentCurrentPage, setInitDocumentCurrentPage] = useState(1);
    const [finalDocumentCurrentPage, setFinalDocumentCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');

    const limit = 10;

    const fetchData = useCallback(async () => {
        try {
          let query = `/services?pagination=true&page=${currentPage}&limit=${limit}`;
          if (searchQuery) {
            query += `&search=${searchQuery}`;
          }
    
          const response = await authenticatedRequest('get', query);
          setServices(response.data.data);
          setTotalDocuments(response.data.metadata.total_documents);
          setTotalPages(Math.ceil(response.data.metadata.total_pages));
          setInitDocumentCurrentPage((currentPage - 1) * limit + 1);
          setFinalDocumentCurrentPage((currentPage - 1) * limit + response.data.metadata.documents_in_current_page);
        } catch (error) {
          console.error('Error fetching services:', error);
        }
    }, [currentPage, limit, searchQuery]);

    useEffect(() => {fetchData();}, [fetchData, currentPage, searchQuery]);

    return (
        <div>
            <div className="flex items-center justify-between space-x-6 mt-3 mb-3">
                <div className="flex-grow" />
                <div>
                    <UploadServiceForm fetchData={fetchData}/>
                </div>
            </div>
            <div className="overflow-x-auto">
                {totalDocuments !== 0 ? 
                    <>
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Service Name
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Type
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        port
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
                                {services.map((service) => (
                                    <tr key={service._id} className="bg-white border-b text-xs">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            {service.name}
                                        </th>
                                        <td className="px-6 py-4">
                                            {service.template}
                                        </td>
                                        <td className="px-6 py-4">
                                            {service.config.port}
                                        </td>
                                        <td className="px-6 py-4">
                                            {service.created_by.username}
                                        </td>
                                        <td className="px-6 py-4">
                                            {service.created_at}
                                        </td>
                                        <td className="flex px-6 py-4">
                                            {/* <a href={`/auth/resources/${service._id}`} className="font-medium text-blue-500 hover:text-blue-700">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                                </svg>
                                            </a> */}
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
                        <Image 
                            src="https://cdn.dribbble.com/userupload/7051469/file/original-bb6f16ce2c8ea76a86409476f8ea051f.png?resize=1200x500"
                            alt="Description"
                            layout="responsive"
                            width={1200}
                            height={500}
                            className="object-cover object-center group-hover:opacity-75"
                        />
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