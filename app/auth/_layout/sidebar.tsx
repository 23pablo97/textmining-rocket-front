export const Sidebar = ({user}: {user: any}) => {
    return (
        <aside id="logo-sidebar" className="fixed top-0 left-0 z-30 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0" aria-label="Sidebar">
            <div className="relative h-full px-3 pb-4 overflow-y-auto bg-white">
                <ul className="space-y-2 font-medium">
                    <li>
                        <a href="/auth/resources" className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group">
                        <svg className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"></path></svg>
                            <span className="ml-3">Resources</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="text-gray-500 w-6 h-6">
                            <path d="M11.644 1.59a.75.75 0 0 1 .712 0l9.75 5.25a.75.75 0 0 1 0 1.32l-9.75 5.25a.75.75 0 0 1-.712 0l-9.75-5.25a.75.75 0 0 1 0-1.32l9.75-5.25Z" />
                            <path d="m3.265 10.602 7.668 4.129a2.25 2.25 0 0 0 2.134 0l7.668-4.13 1.37.739a.75.75 0 0 1 0 1.32l-9.75 5.25a.75.75 0 0 1-.71 0l-9.75-5.25a.75.75 0 0 1 0-1.32l1.37-.738Z" />
                            <path d="m10.933 19.231-7.668-4.13-1.37.739a.75.75 0 0 0 0 1.32l9.75 5.25c.221.12.489.12.71 0l9.75-5.25a.75.75 0 0 0 0-1.32l-1.37-.738-7.668 4.13a2.25 2.25 0 0 1-2.134-.001Z" />
                        </svg>

                            <span className="ml-3">Services</span>
                        </a>
                    </li>
                </ul>
                <ul className="pt-4 mt-4 space-y-2 font-medium border-t border-gray-200">
                    <li>
                        <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group">
                        <svg viewBox="0 0 128 128" className="text-gray-500 w-6 h-6" xmlns="http://www.w3.org/2000/svg">
                            <path d="m2.5441 127 60.809-62.332a1.124 1.124 0 0 0 0.1359-1.4368c-3.6977-5.1625-10.521-6.0578-13.05-9.5268-7.4903-10.275-9.3909-16.092-12.61-15.731a0.98374 0.98374 0 0 0-0.58464 0.3085l-21.966 22.518c-12.638 12.944-14.454 41.475-14.782 65.367a1.1908 1.1908 0 0 0 2.0473 0.83273z" fill="#017cee"/>
                            <path d="m126.99 125.46-62.332-60.813a1.124 1.124 0 0 0-1.4389-0.1359c-5.1625 3.6998-6.0578 10.521-9.5268 13.05-10.275 7.4903-16.092 9.3909-15.731 12.61a0.98374 0.98374 0 0 0 0.3085 0.58248l22.518 21.966c12.944 12.638 41.475 14.454 65.367 14.782a1.1908 1.1908 0 0 0 0.83489-2.0408z" fill="#00ad46"/>
                            <path d="m60.792 112.72c-7.076-6.9035-10.355-20.559 3.2058-48.719-22.046 9.8525-29.771 22.803-25.972 26.511z" fill="#04d659"/>
                            <path d="m125.45 1.0113-60.807 62.332a1.1218 1.1218 0 0 0-0.1359 1.4368c3.6998 5.1625 10.519 6.0578 13.05 9.5268 7.4903 10.275 9.393 16.092 12.61 15.731a0.97943 0.97943 0 0 0 0.58464-0.3085l21.966-22.518c12.638-12.944 14.454-41.475 14.782-65.367a1.193 1.193 0 0 0-2.0495-0.83273z" fill="#00c7d4"/>
                            <path d="m112.73 67.211c-6.9035 7.076-20.559 10.355-48.721-3.2058 9.8525 22.046 22.803 29.771 26.511 25.972z" fill="#11e1ee"/>
                            <path d="m1.0017 2.5495 62.332 60.807a1.124 1.124 0 0 0 1.4368 0.1359c5.1625-3.6998 6.0578-10.521 9.5268-13.05 10.275-7.4903 16.092-9.3909 15.731-12.61a0.99022 0.99022 0 0 0-0.3085-0.58463l-22.518-21.966c-12.944-12.638-41.475-14.454-65.367-14.782a1.1908 1.1908 0 0 0-0.83273 2.0495z" fill="#e43921"/>
                            <path d="m67.212 15.284c7.076 6.9035 10.355 20.559-3.2058 48.721 22.046-9.8525 29.771-22.805 25.972-26.511z" fill="#ff7557"/>
                            <path d="m15.279 60.8c6.9035-7.076 20.559-10.355 48.721 3.2058-9.8525-22.046-22.803-29.771-26.511-25.972z" fill="#0cb6ff"/>
                            <circle cx="64.009" cy="63.995" r="2.7182" fill="#4a4848"/>
                        </svg>    
                            <span className="ml-3">Airflow</span>
                        </a>
                    </li>
                </ul>    
                {user && user.role === "admin" ?
                    <ul className="pt-4 mt-4 space-y-2 font-medium border-t border-gray-200">
                        <li>
                            <a href="/auth/admin/users" className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="text-gray-500 w-6 h-6"><path d="M4.5 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM14.25 8.625a3.375 3.375 0 1 1 6.75 0 3.375 3.375 0 0 1-6.75 0ZM1.5 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM17.25 19.128l-.001.144a2.25 2.25 0 0 1-.233.96 10.088 10.088 0 0 0 5.06-1.01.75.75 0 0 0 .42-.643 4.875 4.875 0 0 0-6.957-4.611 8.586 8.586 0 0 1 1.71 5.157v.003Z" /></svg>
                                <span className="ml-3">Users</span>
                            </a>
                        </li>
                    </ul>
                    : ''
                }
                <div id="dropdown-cta" className="absolute p-4 bottom-0 left-0 right-0 m-4 rounded-lg bg-blue-50" role="alert">
                    <div className="flex items-center mb-3">
                        <span className="bg-orange-100 text-orange-800 text-sm font-semibold me-2 px-2.5 py-0.5 rounded">Beta</span>
                        <button type="button" className="ms-auto -mx-1.5 -my-1.5 bg-blue-50 inline-flex justify-center items-center w-6 h-6 text-blue-900 rounded-lg focus:ring-2 focus:ring-blue-400 p-1 hover:bg-blue-200 h-6 w-6" data-dismiss-target="#dropdown-cta" aria-label="Close">
                        <span className="sr-only">Close</span>
                        <svg className="w-2.5 h-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                        </button>
                    </div>
                    <p className="mb-3 text-sm text-blue-800">
                        Rocket is still under development. Errors may occur during testing.
                    </p>
                </div>
            </div>
        </aside>
    )
}