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
          setBook(resData);
        }
      } catch (error) {
        console.error(error);
        setBook(null);
      }
      setIsFetchingBook(false);
    };
    getCurrentlyReading();
  }, []);

  if (isFetchingBook) {
    return <div className="font-mono text-xs">[ What am i reading ]</div>;
  }

  if (!isFetchingBook && book) {
    const bookPercent = parseInt(book.progress) + "%";
    return (
      <div className="flex font-mono font-normal text-xs items-center gap-x-4 mr-4">
        <div className="flex items-center gap-x-2">
          <FaBookOpen color="skyblue" />
          <p>
            {book.bookTitle} by {book.author}
          </p>
        </div>
        {bookPercent && (
          <div className="flex gap-x-2 items-center justify-center">
            <div className="h-1 w-16 rounded-2xl bg-gray-400">
              <div
                style={{
                  width: bookPercent,
                }}
                className={`h-1 rounded-xl bg-[#96031A]`}
              ></div>
            </div>
            <div>{bookPercent}</div>
          </div>
        )}
      </div>
    );
  }
  return (
    <div className="font-mono font-normal text-xs">
      [I am not reading anything]
    </div>
  );
}
