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
                            <div className="items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:flex dark:bg-gray-700 dark:border-gray-600">
                                <time className="mb-1 text-xs font-normal text-gray-400 sm:order-last sm:mb-0">{version.created_at}</time>
                                <div className="text-sm font-normal text-gray-500 dark:text-gray-300">{version.created_by} has created {version.version !== 'raw' ? <div id='asdf'>version <span className="bg-gray-100 text-gray-800 text-xs font-normal me-2 px-2.5 py-0.5 rounded dark:bg-gray-600 dark:text-gray-300">v1</span> of<div> : <></>} <a className="font-semibold text-gray-600 ">{version.resource_name}</a></div>
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