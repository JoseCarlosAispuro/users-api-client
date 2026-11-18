import { useState, useEffect } from 'react'
import SearchBox from './components/SerachBox'
import UsersList from './components/UserList'

const serverUrl = import.meta.env.VITE_API_URL

console.log(serverUrl)

function App() {
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [users, setUsers] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()
    setLoading(true)
    setError('')

    const url = query
      ? `${serverUrl}/users?name=${encodeURIComponent(query)}`
      : `${serverUrl}/users`

    fetch(url, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`)
        return response.json()
      })
      .then((data) => {
        setUsers(data)
        setLoading(false)
      })
      .catch((error) => {
        if (error.name === 'AbortError') return
        setError("There's an error on the server...")
        setUsers([])
        setLoading(false)
      })

    return () => controller.abort()
  }, [query])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 text-center">
          User Search
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-center mb-8">
          Search for users by name
        </p>

        <SearchBox onSearch={setQuery} />

        <div className="mt-6">
          {loading ? (
            <div className="flex justify-center items-center py-16">
              <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : error ? (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 rounded-xl px-5 py-4 text-sm text-center">
              {error}
            </div>
          ) : (
            <UsersList users={users} />
          )}
        </div>
      </div>
    </div>
  )
}

export default App
