"use client";

import { useEffect, useState } from "react";

import { FaBookOpen } from "react-icons/fa";

type Book = {
  bookTitle: string;
  author: string;
  progress: string;
};

export default function NowReading() {
  const [book, setBook] = useState<Book | null>(null);

  useEffect(() => {
    const getCurrentlyReading = async () => {
      const res = await fetch(
        "http://localhost:3001/get-currently-reading-book",
        // "https://currently-reading-api.onrender.com/get-currently-reading-book",
      );
      const resData = await res.json();

      if (res.status !== 404) {
        setBook(resData);
      }
    };
    getCurrentlyReading();
  }, []);

  if (book) {
    const bookPercent = parseInt(book.progress) + "%";
    console.log(bookPercent);
    return (
      <div className="flex font-mono font-normal text-xs items-center gap-x-4 mr-4">
        <div className="flex items-center gap-x-2">
          <FaBookOpen color="skyblue" />
          <p>
            {book.bookTitle} by {book.author}
          </p>
        </div>
        {bookPercent && (
          <div className="h-1 w-16 bg-gray-400">
            <div
              style={{
                width: bookPercent,
              }}
              className={`h-1 bg-sky-400`}
            ></div>
          </div>
        )}
        {/* <p> @ {parseInt(book.progress)}%</p> */}
      </div>
    );
  }
  return <div></div>;
}
