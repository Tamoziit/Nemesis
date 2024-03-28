import { useEffect, useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import useConversation from "../../zustand/useConversation";
import useGetConversations from "../../hooks/useGetConversations";
import toast from "react-hot-toast";

const SearchInput = () => {
    const [search, setSearch] = useState("");
    const { setSelectedConversation } = useConversation();
    const { conversations } = useGetConversations();
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        if (search === "") {
            setSearchResults([]);
            return;
        }

        // Implement debouncing here to delay the search
        const timer = setTimeout(() => {
            const filteredResults = conversations.filter(
                (c) =>
                    c.fullName.toLowerCase().includes(search.toLowerCase()) ||
                    c.username.toLowerCase().includes(search.toLowerCase())
            );
            setSearchResults(filteredResults);
        }, 300); // Adjust debounce delay as needed

        return () => clearTimeout(timer);
    }, [search, conversations]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!search) return;
        if (search.length < 3) {
            return toast.error("Provide at least 3 characters to search...");
        }

        if (searchResults.length === 0) {
            toast.error("No such user found!");
            return;
        }

        // For simplicity, select the first result
        const selectedConversation = searchResults[0];
        setSelectedConversation(selectedConversation);
        setSearch("");
    };

    return (
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <input type="text" placeholder="Search..." className="input input-bordered rounded-full"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <button type="submit" className="btn btn-circle bg-sky-500 text-white">
                <IoSearchSharp className="w-6 h-6 outline-none" />
            </button>
        </form>
    )
}

export default SearchInput