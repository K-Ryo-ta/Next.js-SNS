import React from 'react'
import Link from 'next/link';

const Navbar = () => {
    return (
        <header className="bg-gray-700 p-4 text-white">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="font-bold text-2xl font-serif">
                    <Link href="/">SNS Clone</Link>
                </h1>
                <nav>
                    <ul className="flex space-x-4">
                        <>
                            <Link
                                href="/login"
                                className="bg-white text-gray-900 py-2 px-3 rounded-lg font-semibold font-serif"
                            >
                                Sign in
                            </Link>
                            <Link
                                href="/signup"
                                className="bg-white text-gray-900 py-2 px-3 rounded-lg font-semibold font-serif"
                            >
                                Sign up
                            </Link>
                        </>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Navbar;
