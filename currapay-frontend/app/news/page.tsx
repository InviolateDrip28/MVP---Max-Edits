"use client";
import { Pagination } from "@/components/Pagination";
import { useEffect, useState } from "react";

const DUMMY_LIST = [
  {
    title: "Article1",
    date: "2024-01-01",
    content: "This is article 1",
    author: "Dr Suess",
  },
  {
    title: "Article2",
    date: "2024-01-01",
    content: "This is article 2",
    author: "Dr Suess",
  },
  {
    title: "Article3",
    date: "2024-01-01",
    content: "This is article 3",
    author: "Dr Suess",
  },
  {
    title: "Article4",
    date: "2024-01-01",
    content: "This is article 4",
    author: "Dr Suess",
  },
  {
    title: "Article5",
    date: "2024-01-01",
    content: "This is article 5",
    author: "Dr Suess",
  },
  {
    title: "Article6",
    date: "2024-01-01",
    content: "This is article 6",
    author: "Dr Suess",
  },
  {
    title: "Article7",
    date: "2024-01-01",
    content: "This is article 7",
    author: "Dr Suess",
  },
  {
    title: "Article8",
    date: "2024-01-01",
    content: "This is article 8",
    author: "Dr Suess",
  },
  {
    title: "Article9",
    date: "2024-01-01",
    content: "This is article 9",
    author: "Dr Suess",
  },
  {
    title: "Article10",
    date: "2024-01-01",
    content: "This is article 10",
    author: "Dr Suess",
  },
];

export default function News() {
  const length = Math.ceil(DUMMY_LIST.length / 5);
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
          <div className="group ">
            <div
              key={article.title}
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
          </div>
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
