import { useAsyncHook } from "../hooks/useFetch";
import { useState } from "react";

export default function Home() {
  const { results, loading, error, search } = useAsyncHook();
  const [searchTerm, setSearchTerm] = useState("");

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    search(searchTerm);
  };

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-6">Google Books Search</h1>

      {/* Search form with input and submit button */}
      <form onSubmit={handleSubmit} className="mb-6">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for books..."
          className="border p-2 rounded mr-2"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      {/* Display any errors that occur */}
      {error && <div className="text-red-500 mb-4">{error}</div>}

      {/* Grid of book results */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {results.map((book) => (
          <div key={book.id} className="border p-4 rounded">
            {/* Display book thumbnail if available */}
            {book.volumeInfo.imageLinks?.thumbnail && (
              <img
                src={book.volumeInfo.imageLinks.thumbnail}
                alt={book.volumeInfo.title}
                className="w-32 h-48 object-cover mb-2"
              />
            )}
            {/* Display book title and authors */}
            <h2 className="font-bold">{book.volumeInfo.title}</h2>
            {book.volumeInfo.authors && (
              <p className="text-sm text-white">
                By {book.volumeInfo.authors.join(", ")}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
