import { logout } from '@/utils/api';
import { useRouter } from "next/navigation";
import { getFirstLetterCapitalized, capitalizeFirstLetter } from '@/utils/utils';

export const Navbar = ({user}: {user: any}) => {
    const router = useRouter();

    const handleLogout = async () => {
        logout();
        router.push('/login');
    };

    return (
        <nav className="fixed top-0 z-40 w-full bg-white border-b border-gray-200 ">
            <div className="px-3 py-3 lg:px-5 lg:pl-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center justify-start rtl:justify-end">
                        <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200">
                            <span className="sr-only">Open sidebar</span>
                            <svg className="w-6 h-6" aria-hidden="true" fill="black" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                            </svg>
                        </button>
                        <a href="/" className="flex ms-2 md:me-24 items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" className="w-8 h-8">
                                <path fillRule="evenodd" d="M9.315 7.584C12.195 3.883 16.695 1.5 21.75 1.5a.75.75 0 0 1 .75.75c0 5.056-2.383 9.555-6.084 12.436A6.75 6.75 0 0 1 9.75 22.5a.75.75 0 0 1-.75-.75v-4.131A15.838 15.838 0 0 1 6.382 15H2.25a.75.75 0 0 1-.75-.75 6.75 6.75 0 0 1 7.815-6.666ZM15 6.75a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Z" clipRule="evenodd" />
                                <path d="M5.26 17.242a.75.75 0 1 0-.897-1.203 5.243 5.243 0 0 0-2.05 5.022.75.75 0 0 0 .625.627 5.243 5.243 0 0 0 5.022-2.051.75.75 0 1 0-1.202-.897 3.744 3.744 0 0 1-3.008 1.51c0-1.23.592-2.323 1.51-3.008Z" />
                            </svg>
                            <span className="self-center text-xl font-semibold whitespace-nowrap text-gray-900 ml-4 leading-none">
                                <span className="block">Rocket</span>
                                <span className="block text-xs font-normal leading-none">by NLP4BIA</span>
                            </span>
                        </a>
                    </div>
                    <div className="flex items-center">
                        <div className="flex items-center ms-3 z-40">
                            <div>
                                <button type="button" className="flex text-sm bg-gray-200 rounded-full focus:ring-4 focus:ring-gray-300" aria-expanded="false" data-dropdown-toggle="dropdown-user">
                                    <span className="sr-only">Open user menu</span>
                                    <div className="relative inline-flex items-center justify-center w-8 h-8 overflow-hidden bg-gray-200 rounded-full">
                                        { user && user.image_url ? (
                                            <img className="object-cover w-full h-full" src={user.image_url} alt="Preview" />
                                        ) : (
                                            <span className="font-medium text-gray-600">
                                            {user && getFirstLetterCapitalized(user.first_name)}
                                            {user && getFirstLetterCapitalized(user.last_name)}
                                            </span>
                                        )}
                                    </div>
                                </button>
                            </div>
                            <div className="z-40 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow" id="dropdown-user">
                                <div className="px-4 py-3" role="none">
                                    <p className="text-sm text-gray-900 " role="none">
                                        {(user && capitalizeFirstLetter(user.first_name))} {(user && capitalizeFirstLetter(user.last_name))}
                                    </p>
                                    <p className="text-sm font-medium text-gray-900 truncate " role="none">
                                        {(user && user.email)}
                                    </p>
                                </div>
                                <ul className="py-1" role="none">
                                    <li>
                                        <a href="/auth/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Profile</a>
                                    </li>
                                    <li>
                                        <a onClick={handleLogout} className="block button px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer" role="menuitem">Sign out</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}