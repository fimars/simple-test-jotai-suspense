import { atom, useAtom } from "jotai";
import { atomFamily } from "jotai/utils";
import { ofetch } from "ofetch";

type Book =
  | undefined
  | {
      id: number;
      title?: string;
    };

const BookAPI = (itemId: number) =>
  `https://hacker-news.firebaseio.com/v0/item/${itemId}.json?print=pretty`;

const bookFamily = atomFamily((id: number) =>
  atom<Book | Promise<Book>>({ id })
);

function Book({ id }: { id: number }) {
  const [book, setBook] = useAtom(bookFamily(id));

  const handleClick = () => {
    setBook(ofetch<Book>(BookAPI(id)));
  };

  return (
    <button onClick={handleClick}>
      <div>{id}</div>
      <div>{book?.title}</div>
    </button>
  );
}

export default Book;
