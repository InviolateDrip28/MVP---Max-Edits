"use client";
import { Pagination } from "@/components/Pagination";
import Link from "next/link";
import { useEffect, useState } from "react";

// article needs a unique id that will be used as the url path
const DUMMY_LIST = [
  {
    id: "article-1",
    title: "Article1",
    date: "2024-01-01",
    content: "This is article 1",
    author: "Dr Suess",
  },
  {
    id: "article-2",
    title: "Article2",
    date: "2024-01-01",
    content: "This is article 2",
    author: "Dr Suess",
  },
  {
    id: "article-3",
    title: "Article3",
    date: "2024-01-01",
    content: "This is article 3",
    author: "Dr Suess",
  },
  {
    id: "article-4",
    title: "Article4",
    date: "2024-01-01",
    content: "This is article 4",
    author: "Dr Suess",
  },
  {
    id: "article-5",
    title: "Article5",
    date: "2024-01-01",
    content: "This is article 5",
    author: "Dr Suess",
  },
  {
    id: "article-6",
    title: "Article6",
    date: "2024-01-01",
    content: "This is article 6",
    author: "Dr Suess",
  },
  {
    id: "article-7",
    title: "Article7",
    date: "2024-01-01",
    content: "This is article 7",
    author: "Dr Suess",
  },
  {
    id: "article-8",
    title: "Article8",
    date: "2024-01-01",
    content: "This is article 8",
    author: "Dr Suess",
  },
  {
    id: "article-9",
    title: "Article9",
    date: "2024-01-01",
    content: "This is article 9",
    author: "Dr Suess",
  },
  {
    id: "article-10",
    title: "Article10",
    date: "2024-01-01",
    content: "This is article 10",
    author: "Dr Suess",
  },
];

export interface Article { 
  id: string;
  title: string;
  date: string;
  content: string;
  author: string;
}

export default function News() {
  const [articles, setArticles] = useState(DUMMY_LIST.slice(0, 5));
  const [current, setCurrent] = useState(1);

  useEffect(() => {
    setArticles(DUMMY_LIST.slice((current - 1) * 5, current * 5));
  }, [current]);

  return (
    <section>
      <h1>News</h1>
      <div className="flex flex-col gap-4 w-full py-8">
        {articles.map((article) => (
          <Link href={`/news/${article.id}`} className="group" key={article.id}>
            <div
              className="border bg-white py-6 px-8 rounded-lg shadow-md space-y-4 group-hover:scale-[102%] group-hover:shadow-xl "
            >
              <div className="inline-flex justify-between w-full">
                <p>{article.author}</p>
                <p>{article.date}</p>
              </div>
              <div>
                <p className="font-semibold text-2xl">
                  {article.title}
                </p>
                <p>{article.content}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <Pagination
        onPageChange={setCurrent}
        totalCount={DUMMY_LIST.length}
        pageSize={5}
        currentPage={current}
        className=""
      />
    </section>
  );
}
