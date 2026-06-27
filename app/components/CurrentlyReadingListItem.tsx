import { FaBookOpen } from "react-icons/fa";
import { Book } from "../ui/now-reading";

interface CurrentlyReadingListItemProps {
  book: Book;
  showIcon?: boolean;
  extraStyles?: string;
}

function truncateTitle(title: string) {
  return title.length > 30 ? `${title.substring(0, 30)}...` : title;
}

export default function CurrentlyReadingListItem({
  book,
  showIcon = false,
  extraStyles,
}: CurrentlyReadingListItemProps) {
  const bookPercent = parseInt(book.progress) + "%";
  return (
    <div className={`${extraStyles} flex gap-x-2`}>
      <div className="flex items-center gap-x-2">
        {showIcon && <FaBookOpen color="skyblue" />}
        <p>
          {truncateTitle(book.bookTitle)} by {book.author}
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
