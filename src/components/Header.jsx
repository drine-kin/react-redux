import { Fragment, useRef } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link, NavLink } from 'react-router-dom'
import Logo from '../assets/logo.png'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../state/reducers'

const navigation = [
    { name: 'Home', link: '/' },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Header() {

    const dispatch = useDispatch();

    const user = useSelector((state) => state.user);

    const cart = useSelector((state) => state.cartItems);

    const disclosureRef = useRef();

    return (
        <Disclosure as="nav" className="bg-themeColor2">
            {({ open }) => (
                <>
                    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                        <div className="relative flex h-20 items-center justify-between">
                            <div className="absolute inset-y-0 right-0 flex items-center sm:hidden">

                                {/* Mobile menu button*/}
                                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 bg-themeColor text-white hover:bg-themeColor">
                                    <span className="absolute -inset-0.5" />
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                    ) : (
                                        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                    )}
                                </Disclosure.Button>

                            </div>
                            <div className="flex items-center justify-between w-full ">
                                <Link to="/" className="flex flex-shrink-0 items-center">
                                    <img
                                        className="h-16 w-auto"
                                        src={Logo}
                                        alt="My Fone"
                                    />
                                </Link>
                                <div className="hidden sm:ml-6 sm:block">
                                    <div className="flex space-x-4">
                                        {navigation.map((item) => (
                                            <NavLink
                                                key={item.name}
                                                to={item.link}
                                                className={({ isActive }) => `${isActive ? 'text-themeColor3 ' : 'text-white hover:text-themeColor3'} rounded-md px-3 py-2 text-base font-medium`}
                                            >
                                                {item.name}
                                            </NavLink>
                                        ))}
                                        <NavLink
                                            to="/cart"
                                            className={({ isActive }) => `${isActive ? 'text-themeColor3 ' : 'text-white hover:text-themeColor3'} rounded-md px-3 py-2 text-base font-medium`}
                                        >

                                            <button className="relative ">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                                                </svg>
                                                <span className="absolute bg-themeColor text-white px-2 w-5 h-5 text-[0.75rem] font-bold rounded-full -top-3 -right-3">{cart.length}</span>
                                            </button>

                                        </NavLink>
                                    </div>
                                </div>
                            </div>
                            <div className="absolute inset-y-0 right-0 items-center pr-2 hidden sm:flex sm:static sm:inset-auto sm:ml-6 sm:pr-0">

                                {/* Profile dropdown */}
                                {
                                    user ? <Menu as="div" className="relative ml-3">
                                        <div>
                                            <Menu.Button className="relative flex rounded-full">
                                                <span className="absolute -inset-1.5" />
                                                <span className="sr-only">Open user menu</span>

                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="block w-6 h-6 text-white">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                                </svg>

                                            </Menu.Button>
                                        </div>
                                        <Transition
                                            as={Fragment}
                                            enter="transition ease-out duration-100"
                                            enterFrom="transform opacity-0 scale-95"
                                            enterTo="transform opacity-100 scale-100"
                                            leave="transition ease-in duration-75"
                                            leaveFrom="transform opacity-100 scale-100"
                                            leaveTo="transform opacity-0 scale-95"
                                        >
                                            <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ">
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <a
                                                            href="#"
                                                            className={classNames(active ? 'bg-themeColor2 text-white' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                            onClick={() => dispatch(logout())}
                                                        >
                                                            Log out
                                                        </a>
                                                    )}
                                                </Menu.Item>
                                            </Menu.Items>
                                        </Transition>
                                    </Menu> : <Link to="/login" className='bg-themeColor text-white hover:bg-themeColor3 rounded-md px-3 py-2 font-medium'>Login</Link>
                                }
                            </div>
                        </div>
                    </div>

                    <Disclosure.Panel className="sm:hidden">
                        <div className="space-y-1 px-2 pb-3 pt-2 bg-themeColor3">
                            {navigation.map((item) => (
                                <NavLink
                                    key={item.name}
                                    to={item.link}
                                    className={({ isActive }) => `${isActive ? 'text-themeColor2 ' : 'text-white hover:text-themeColor'} block rounded-md px-3 py-2 text-base font-medium`}
                                    onClick={ToggleEvent}
                                >
                                    {item.name}
                                </NavLink>
                            ))}
                            <NavLink
                                to="/cart"
                                className={({ isActive }) => `${isActive ? 'text-themeColor2 ' : 'text-white hover:text-themeColor3'} block rounded-md px-3 py-2 text-base font-medium`}
                                onClick={ToggleEvent}
                            >
                                Cart ({cart.length})
                            </NavLink>
                            {
                                user ? <Link
                                    to="/"
                                    className='text-white hover:text-themeColor block rounded-md px-3 py-2 text-base font-medium'
                                    onClick={() => {
                                        dispatch(logout());
                                        disclosureRef.current.close();
                                    }}
                                >
                                    Log out
                                </Link>
                                    : <Link
                                        to="/login"
                                        className='text-white hover:text-themeColor block rounded-md px-3 py-2 text-base font-medium'
                                        onClick={ToggleEvent}
                                    >
                                        Log in
                                    </Link>
                            }
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    )
}
