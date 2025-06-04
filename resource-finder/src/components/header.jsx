import React from 'react';
import { formatDate } from '../utils/commonUtils';
import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <header className="full-width h-25 pl-20 pr-20 flex justify-between items-center border-b border-gray-100/20 mb-8">
            <div className="w-3/6 flex flex-start">
                <h1 className="text-4xl font-[700]">
                    <Link to="/" className="hover:text-primary/80 transition-all duration-300">
                    Rekurso
                    </Link>
                    </h1>
                <p className="text-sm ml-5 mt-4">Find technical learning resource for developers</p>
            </div>
            <div className="w-3/6 flex justify-end">
                <div className="width-1/6 text-right">
                    {formatDate()}
                </div>
                <div className="width-1/6 text-right hidden">
                    User Info
                </div>
            </div>
        </header>
    )
}
