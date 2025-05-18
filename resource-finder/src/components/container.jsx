import React, { useState } from 'react';
import SearchResult from "./searchResults";
import Search from './searchControls';

export default function Container() {
    return (
        <section className="full-width pl-20 pr-20 h-[calc(100vh-180px)]">
            <Search />
            <SearchResult />
        </section>
    )
}