import { useState } from "react"

export default function Search () {
    const [searchText, setSearchText] = useState("");
    const [searchTag, setSearchTag] = useState("");

    const searchResource = (e) => {
        searchText(e.target.value);
    }

    const clearSearch = () => {
        setSearchText("");
        setSearchTag("");
    }

    return (
        <div className="bg-white border border-gray-300 w-full mh-75 mb-8 rounded-md p-10">
            <div className=" w-full mb-5">
                <p className="text-xl mb-2">Search by title</p>
                <input type="text"
                value={searchText}
                className="rounded pl-2 pr-2 w-full h-10 border border-gray-300" placeholder="Enter keywords from title...." />
            </div>
            <div className=" w-full mb-7">
                <p className="text-xl mb-2">Filter by tag</p>
                <input type="text"
                value={searchTag}
                className="rounded pl-2 pr-2 w-full h-10 border border-gray-300" placeholder="Enter keywords from title...." />
            </div>
            <div className="w-full flex justify-between">
                <button onClick={searchResource} className="bg-blue-700 w-[calc(50%-10px)] h-10 rounded text-white hover:bg-blue-800"> Search </button>
                <button onClick={clearSearch} className="bg-white w-[calc(50%-10px)] border border-blue-500 h-10 rounded text-black hover:bg-blue-700 hover:text-white"> Clear </button>
            </div>

        </div>
    )
}