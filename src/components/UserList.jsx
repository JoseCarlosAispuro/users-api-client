const UsersList = ({ users }) => {
    if (!users.length) {
        return (
            <div className="flex flex-col items-center justify-center py-16 text-gray-400 dark:text-gray-600">
                <svg className="w-12 h-12 mb-3 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                        d="M17 20h5v-2a4 4 0 00-5.197-3.74M9 20H4v-2a4 4 0 015.197-3.74M15 11a4 4 0 11-8 0 4 4 0 018 0zm6 2a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <p className="text-sm font-medium">No users found</p>
            </div>
        )
    }

    return (
        <ul className="flex flex-col gap-2">
            {users.map((user) => (
                <li
                    key={`${user.id}`}
                    className="flex items-center gap-3 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl px-4 py-3 shadow-sm hover:shadow-md hover:border-indigo-200 dark:hover:border-indigo-800 transition"
                >
                    <div className="w-9 h-9 rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-semibold text-sm uppercase shrink-0">
                        {user.name?.[0] ?? '?'}
                    </div>
                    <span className="text-gray-800 dark:text-gray-100 text-sm font-medium">
                        {user.name}
                    </span>
                </li>
            ))}
        </ul>
    )
}

export default UsersList
