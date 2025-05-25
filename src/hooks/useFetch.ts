import { useState } from "react";

interface Book {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    description?: string;
    imageLinks?: {
      thumbnail: string;
    };
  };
}

// Define the shape of what our custom hook returns
interface UseAsyncHookResult {
  results: Book[];
  loading: boolean;
  error: string | null;
  search: (term: string) => void;
}

// Custom hook that manages the book search functionality
export function useAsyncHook (): UseAsyncHookResult {
  // State management for the search results, loading state, and any errors
  const [results, setResults] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Function to perform the book search
  const search = async (term: string) => {
    if (!term) return;

    // Set loading state to true and clear any previous errors
    setLoading(true);
    setError(null);

    try {
      // Make the API call to Google Books
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
          term
        )}`
      );
      const data = await response.json();

      // Check if the response was successful
      if (!response.ok) {
        throw new Error(data.error?.message || "Failed to fetch books");
      }

      // Update the results state with the fetched books
      setResults(data.items || []);
    } catch (err) {
      // Handle any errors that occur during the fetch
      setError(err instanceof Error ? err.message : "An error occurred");
      setResults([]);
    } finally {
      // Always set loading back to false when done
      setLoading(false);
    }
  };

  return { results, loading, error, search };
};