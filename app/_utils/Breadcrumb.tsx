"use client";
import React from 'react';
import { useRouter } from 'next/navigation';

interface BreadcrumbProps {
    icon: React.ReactNode;
    breadcrumbs: { name: string; path: string }[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ icon, breadcrumbs }) => {
    const router = useRouter();

    return (
        <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                <li className="inline-flex items-center">
                    <a href={breadcrumbs[0]?.path} className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600">
                        <span className="text-gray-500 w-4 h-4 mr-2">
                            {icon}
                        </span>
                        {breadcrumbs[0]?.name}
                    </a>
                </li>
                {breadcrumbs.slice(1).map((breadcrumb, index) => (
                    <li key={index}>
                        <div className="flex items-center">
                            <svg className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                            </svg>
                            <a href={breadcrumb.path} className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2">
                                {breadcrumb.name}
                            </a>
                        </div>
                    </li>
                ))}
            </ol>
        </nav>
    );
};

export default Breadcrumb;
