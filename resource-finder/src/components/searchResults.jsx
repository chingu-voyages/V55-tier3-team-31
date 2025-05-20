import SearchIcon from '../assets/magnifying-glass.png';

export default function SearchResult () {
    return (
        <div className="bg-white border border-gray-300 full-width h-[calc(100vh-550px)] mb-10 rounded-md p-10">
            <div className="rounded border border-dotted h-full w-full flex justify-center items-center">
                <img src={SearchIcon} alt="Search Resources" />
                <p className="ml-5 text-gray-400/[70%] text-xl">Start searching  by title or filter</p>
            </div>

        </div>
    )
}