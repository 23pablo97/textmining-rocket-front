import { formatFileSize } from "@/utils/utils";
import { handleDownloadFile } from '../../_components/utils';

interface Version {
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

export default function ResourceChangelog({ versions, currentDocumentName }: { versions: Version[], currentDocumentName: any }) {
    console.log(versions)

    return (
        <div className="mt-5">
            <p className="text-4xl font-bold text-gray-900">{currentDocumentName}</p>
            <p className="text-lg font-normal text-gray-900 dark:text-white">Changelog</p>

            {versions && versions.length !== 0 ? 
                <ol className="mt-5 ml-3 relative border-s border-gray-200 dark:border-gray-700">
                    {versions.map((version) => (
                        <li id={version._id} className="mb-10 ms-6">            
                            <div className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -start-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                                <span className="font-medium text-xs text-gray-600">PA</span>
                            </div>
                            <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-700 dark:border-gray-600">
                                <div className="items-center justify-between sm:flex">
                                    <time className="text-xs font-normal text-gray-400 sm:order-last sm:mb-0">{version.created_at}</time>
                                    <div className="text-sm font-normal text-gray-500 lex dark:text-gray-300">{version.created_by} has created {version.version !== 'raw' ? <>version <span className="bg-gray-100 text-gray-800 text-xs font-normal me-2 px-2.5 py-0.5 rounded dark:bg-gray-600 dark:text-gray-300">{version.version}</span>of</>:<></> } <a className="font-semibold text-gray-600 ">{version.resource_name}</a></div>
                                </div>
                                <span className="mb-3 inline-flex items-center text-xs font-normal text-gray-500 dark:text-gray-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-2.5 h-2.5 me-1">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m10.5 21 5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 0 1 6-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 0 1-3.827-5.802" />
                                    </svg>
                                    {version.resource_language}
                                </span> 
                                <span className="ml-3 inline-flex items-center text-xs font-normal text-gray-500 dark:text-gray-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-2.5 h-2.5 me-1">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                                    </svg>
                                    {formatFileSize(version.resource_size)}
                                </span> 
                                <span className="ml-3 inline-flex items-center text-xs font-normal text-gray-500 dark:text-gray-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" className="w-2.5 h-2.5 me-1">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776" />
                                    </svg>

                                    {version.file_path}
                                </span> 
                                <div className="p-3 text-xs italic font-normal text-gray-500 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-600 dark:border-gray-500 dark:text-gray-300">{version.resource_description}</div>
                                <button type="button" onClick={() => handleDownloadFile({ id: version._id, resourceName: version.resource_name, version: version.version })} className="mt-3 py-1.5 px-5 me-2 text-xs font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100">Download Zip</button>
                            </div>
                        </li>
                    ))}
                </ol>
            :
                <></>
            }
        </div>
    )
}