import React, { useState } from 'react';
import SearchResult from "../components/searchResults";
import Search from '../components/searchControls';

export default function List() {
    return (
        <>
            <Search />
            <SearchResult />
        </>
    )
}