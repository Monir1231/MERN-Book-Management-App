import { useCallback, useContext, useEffect, useState } from "react";
import { createContext } from "react";
import axios from "axios";

const Bookcontext = createContext();

export const BookProvder = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [currentBook, setCurrentBook] = useState(null);
  const [isLoading, setISLoding] = useState(false);
  const [error, setError] = useState(null);

  const [filters, setFilters] = useState({
    page: 1,
    limit: 8,
    genre: "",
    minYear: "",
    maxYear: "",
    author: "",
    minPrice: "",
    maxPrice: "",
    sortBy: "title",
    order: "asc",
    search: "",
  });

  const [pagination, setPagination] = useState({
    totalBooks: 0,
    currentPage: 1,
    totalpages: 1,
  });

  const fatchBooks = useCallback(async () => {
    try {
      setISLoding(true);
      setError(null);
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== "") {
          params.append(key, value);
        }
      });
      const response = await axios.get(`http://localhost:3000/books?${params}`);
      setBooks(response.data.books);
      setPagination({
        currentPage: response.data.currentPage,
        totalBooks: response.data.totalBooks,
        totalpages: response.data.totalpages,
      });
    } catch (error) {
      setError(error.message);
    } finally {
      setISLoding(false);
    }
  },[filters]);

  const clearCurrentBooks = useCallback(()=>{
    setBooks(null)
  },[])

  const updateFilters = useCallback(async(newFilters)=>{
    setFilters(prev =>({
        ...prev,
        ...newFilters,
        page: newFilters.hasOwnProperty('page') ? newFilters.page : 1
    }))
  },[])

  const fatchBooksDetils = useCallback(async (bookId) => {
  try {
    setISLoding(true);
    setError(null);

    const response = await axios.get(
      `http://localhost:3000/books/${bookId}`
    );

    setCurrentBook(response.data);

    return response.data;
  } catch (error) {
    setError(error.message);
    throw error;
  } finally {
    setISLoding(false);
  }
}, []);

  useEffect(() => {
    fatchBooks();
  }, [filters]);

  const value = { books, currentBook, isLoading, error,filters,pagination,fatchBooks,clearCurrentBooks,updateFilters,fatchBooksDetils };
  return <Bookcontext.Provider value={value}>{children}</Bookcontext.Provider>;
};

export const useBooks = () => {
  const context = useContext(Bookcontext);
  if (!context) {
    throw new Error("plz waiting for a New Book");
  }
  return context;
};
