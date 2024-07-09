import { formatFileSize } from "@/utils/utils";
import { handleDownloadFile } from '../../_components/utils';
import { Document } from "@/app/_utils/types/Document";
import UserProfileImage from "@/app/_utils/UserPhoto";
import UploadResourceForm from "./uploadResource";
import DeleteResource from "./deleteResource";
import DeleteResourceById from "./deleteResourceById";


export default function ResourceChangelog({ versions, currentDocumentName, fetchData, resourceId }: { versions: Document[], currentDocumentName: any, fetchData: any, resourceId: string }) {
    return (
        <div className="mt-5">
            <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                    <p className="text-4xl font-bold text-gray-900">{currentDocumentName}</p>
                    <p className="text-lg font-normal text-gray-900 dark:text-white">Changelog</p>
                </div>
                <div className="sm:col-span-3">
                    <div className="flex justify-end py-4">
                        <UploadResourceForm fetchData={fetchData} latestVersion={versions[0]}/>
                        <DeleteResource resourceId={resourceId}/>
                    </div>
                </div>
            </div>

            
            {versions && versions.length !== 0 ? 
                <ol className="mt-5 ml-3 relative border-s border-gray-200 dark:border-gray-700">
                    {versions.map((version) => (
                        <li key={version._id} id={version._id} className="mb-10 ms-6">            
                            <div className="absolute flex items-center justify-center w-6 h-6 overflow-hidden bg-blue-100 rounded-full -start-3 ring-8 ring-white">
                                <UserProfileImage user={version.created_by}/>
                            </div>
                            <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-700 dark:border-gray-600">
                                <div className="items-center justify-between sm:flex">
                                    <div className={`text-sm font-normal lex ${version.is_deleted ? 'line-through text-gray-500' : 'text-gray-500'}`}>{version.created_by.username} has created {version.version !== 'raw' ? <>version <span className="bg-gray-100 text-gray-800 text-xs font-normal me-2 px-2.5 py-0.5 rounded dark:bg-gray-600 dark:text-gray-300">{version.version}</span>of</>:<></> } <a className="font-semibold text-gray-600 ">{version.resource_name}</a></div>
                                    <div className="flex justify-between items-center">
                                        <time className="text-xs font-normal text-gray-400 sm:mb-0">{version.created_at}</time>
                                        {version && !version.is_deleted && <DeleteResourceById fetchData={fetchData} resourceId={version._id} version={version.version}/>}
                                    </div>
                                </div>
                                <span className={`mb-3 inline-flex items-center text-xs font-normal ${version.is_deleted ? 'line-through text-gray-500' : 'text-gray-500'}`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-2.5 h-2.5 me-1">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m10.5 21 5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 0 1 6-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 0 1-3.827-5.802" />
                                    </svg>
                                    {version.resource_language}
                                </span> 
                                <span className={`ml-3 inline-flex items-center text-xs font-normal ${version.is_deleted ? 'line-through text-gray-500' : 'text-gray-500'}`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-2.5 h-2.5 me-1">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                                    </svg>
                                    {formatFileSize(version.resource_size)}
                                </span> 
                                <span className={`ml-3 inline-flex items-center text-xs font-normal ${version.is_deleted ? 'line-through text-gray-500' : 'text-gray-500'}`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" className="w-2.5 h-2.5 me-1">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776" />
                                    </svg>
                                    {version.file_path}
                                </span>

                                {version && version.save_remote && (
                                    <span className="ml-3 inline-flex items-center text-xs font-normal text-gray-500 dark:text-gray-400">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" className="w-2.5 h-2.5 me-1">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 0 1-3-3m3 3a3 3 0 1 0 0 6h13.5a3 3 0 1 0 0-6m-16.5-3a3 3 0 0 1 3-3h13.5a3 3 0 0 1 3 3m-19.5 0a4.5 4.5 0 0 1 .9-2.7L5.737 5.1a3.375 3.375 0 0 1 2.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 0 1 .9 2.7m0 0a3 3 0 0 1-3 3m0 3h.008v.008h-.008v-.008Zm0-6h.008v.008h-.008v-.008Zm-3 6h.008v.008h-.008v-.008Zm0-6h.008v.008h-.008v-.008Z" />
                                        </svg>
                                        Saved in Marenostrum 5
                                    </span> 
                                )}
                                <div className="p-3 text-xs italic font-normal text-gray-500 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-600 dark:border-gray-500 dark:text-gray-300">{version.resource_description}</div>
                                
                                {version && !version.is_deleted ? 
                                    (
                                        <button type="button" onClick={() => handleDownloadFile({ id: version._id, resourceName: version.resource_name, version: version.version })} className="mt-3 py-1.5 px-5 me-2 text-xs font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100">Download Zip</button>
                                    )
                                    :
                                    (
                                        <div className="mt-5">
                                            <div className="items-center justify-between sm:flex">
                                                <div className={`text-sm font-normal lex text-gray-500`}>{version.deleted_by} has deleted {version.version !== 'raw' ? <>version <span className="bg-gray-100 text-gray-800 text-xs font-normal me-2 px-2.5 py-0.5 rounded dark:bg-gray-600 dark:text-gray-300">{version.version}</span>of</>:<></> } <a className="font-semibold text-gray-600 ">{version.resource_name}</a></div>
                                                <div className="flex justify-between items-center">
                                                    <time className="text-xs font-normal text-gray-400 sm:mb-0">{version.deleted_at}</time>
                                                </div>
                                            </div>
                                            <div className="mt-2 p-3 text-xs italic font-normal text-gray-500 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-600 dark:border-gray-500 dark:text-gray-300">{version.delete_comment}</div>
                                        </div>
                                    )
                                }
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