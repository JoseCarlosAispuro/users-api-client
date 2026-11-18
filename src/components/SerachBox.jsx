const SearchBox = ({ onSearch }) => {
    const handleSearch = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        onSearch(formData.get('search'))
    }

    return (
        <form
            noValidate
            onSubmit={handleSearch}
            className="flex gap-2 w-full"
        >
            <label htmlFor="search" className="sr-only">
                Search by name
            </label>
            <input
                name="search"
                id="search"
                placeholder="Search by name..."
                className="flex-1 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 px-4 py-3 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
            />
            <button
                type="submit"
                className="rounded-xl bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-semibold text-sm px-5 py-3 shadow-sm transition cursor-pointer"
            >
                Search
            </button>
        </form>
    )
}

export default SearchBox
