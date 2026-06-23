"use client";

import { useEffect, useState } from "react";
import CurrentlyReadingListItem from "../components/CurrentlyReadingListItem";

export type Book = {
  bookTitle: string;
  author: string;
  progress: string;
};

export default function NowReading() {
  const [books, setBooks] = useState<Book[] | null>(null);
  const [isFetchingBook, setIsFetchingBook] = useState(false);

  useEffect(() => {
    const getCurrentlyReading = async () => {
      setIsFetchingBook(true);
      try {
        const res = await fetch(
          "http://localhost:3001/get-currently-reading-book",
          // "https://currently-reading-api.onrender.com/get-currently-reading-book",
        );
        const resData = await res.json();

        if (res.status !== 404) {
          setBooks(resData.books);
        }
      } catch (error) {
        console.error(error);
        setBooks(null);
      }
      setIsFetchingBook(false);
    };

    getCurrentlyReading();
  }, []);

  if (isFetchingBook) {
    return <div className="font-mono text-xs">[ Fetching Book ]</div>;
  }

  if (!isFetchingBook && books && books?.length > 0) {
    return (
      <div className="flex flex-col font-mono font-normal text-xs items-center gap-x-4 mr-4 group">
        {books?.length > 0 && (
          <div className="hidden group-hover:block bg-gray-900 px-2 flex-col absolute bottom-9 p-2 rounded transition-discrete transition-opacity duration-320 starting:opacity-0">
            {books?.map((book, i) => (
              <CurrentlyReadingListItem key={i} book={book} />
            ))}
          </div>
        )}
        <CurrentlyReadingListItem showIcon book={books[0]} />
      </div>
    );
  }
  return (
    <div className="font-mono font-normal text-xs">
      [I am not reading anything]
    </div>
  );
}
