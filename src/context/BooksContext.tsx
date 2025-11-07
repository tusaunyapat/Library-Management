/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import getBooks from "@/libs/getBooks";
import createBookApi from "@/libs/createBook";
import updateBookApi from "@/libs/updateBook";
import deleteBookApi from "@/libs/deleteBook";
import { BookItem } from "@/type/interface";
import { useSession } from "next-auth/react";

//define context structure
interface BooksContextType {
  books: BookItem[];
  refreshBooks: () => Promise<void>;
  createBook: (data: Omit<BookItem, "_id" | "id">) => Promise<void>;
  updateBook: (id: string, data: Omit<BookItem, "_id" | "id">) => Promise<void>;
  deleteBook: (id: string) => Promise<void>;
}

//create context
const BooksContext = createContext<BooksContextType | undefined>(undefined);

//provider component
export function BooksProvider({ children }: { children: ReactNode }) {
  const { data: session } = useSession();
  const token = session?.user?.token ?? "";

  const [books, setBooks] = useState<BookItem[]>([]);

  //load books initially
  const refreshBooks = async () => {
    const res = await getBooks();
    setBooks(res.data);
  };

  //create
  const createBook = async (data: Omit<BookItem, "_id" | "id">) => {
    await createBookApi(data, token);
    await refreshBooks();
  };

  //update
  const updateBook = async (id: string, data: Omit<BookItem, "_id" | "id">) => {
    await updateBookApi(id, data, token);
    await refreshBooks();
  };

  //   //delete
  const deleteBook = async (id: string) => {
    await deleteBookApi(id, token);
    await refreshBooks();
  };

  useEffect(() => {
    refreshBooks();
  }, []);

  return (
    <BooksContext.Provider
      value={{
        books,
        refreshBooks,
        createBook,
        updateBook,
        deleteBook,
      }}
    >
      {children}
    </BooksContext.Provider>
  );
}

//hook for easy use
export function useBooks() {
  const context = useContext(BooksContext);
  if (!context) {
    throw new Error("useBooks must be used inside BooksProvider");
  }
  return context;
}
