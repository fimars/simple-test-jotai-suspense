import { atom, useAtom } from "jotai";
import { ofetch } from "ofetch";
import { Suspense, useEffect } from "react";
import "./Panel.css";
import Book from "./Book";

const HackerNewsJsonURI =
  "https://hacker-news.firebaseio.com/v0/topstories.json";

const storiesAtom = atom<number[] | Promise<number[]>>([]);

function MagicBooks() {
  const [stories, setStories] = useAtom(storiesAtom);

  useEffect(() => {
    setStories(ofetch<number[]>(HackerNewsJsonURI));
  }, [setStories]);

  return (
    <div className="magicbooks">
      {stories.map((story) => (
        <div key={story}>
          <Suspense fallback={<div>*</div>}>
            <Book id={story} />
          </Suspense>
        </div>
      ))}
    </div>
  );
}

function Panel() {
  return (
    <div>
      <h1>Suspense</h1>
      <Suspense fallback={<div>Magics Loading...</div>}>
        <MagicBooks />
      </Suspense>
    </div>
  );
}

export default Panel;
