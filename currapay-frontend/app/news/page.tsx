"use client";
import { Pagination } from "@/components/Pagination";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

// article needs a unique id that will be used as the url path
const DUMMY_LIST = [
  {
    id: "immigrating-mexico-to-us",
    imgPath: "/news/article-1-img.png",
    title:
      "Immigrating to the U.S. from Mexico: A Comprehensive Guide",
    date: "2024-01-01",
    content:
      "Immigrating to the United States from Mexico is a journey that many individuals and families undertake for various reasons, including economic opportunities, education, family reunification, and a desire for a better quality of life. This article explores the key aspects of the immigration process, the challenges faced, and the resources available for those considering this path.",
    // author: "Dr Suess",
  },
  {
    id: "immigrating-guatemala-to-us",
    imgPath: "/news/article-2-img.png",
    title:
      "Immigrating to the U.S. from Guatemala: A Comprehensive Guide",
    date: "2024-01-01",
    content:
      "Immigrating to the United States from Guatemala is a significant step that many individuals and families take in search of better economic opportunities, education, and a higher quality of life. This article outlines the immigration process, the challenges that may arise, and useful resources, including a modern tool for managing remittances back home.",
    author: "Dr Suess",
  },
  {
    id: "international-money-transfers-guide",
    imgPath: "/news/article-3-img.png",
    title: "Understanding International Money Transfers: A Guide",
    date: "2024-01-01",
    content:
      "While Venmo is a popular payment app in the U.S., it does not work in Europe or other international markets. This limitation is important for individuals looking to send money abroad. Here's a brief overview of the basics of international money transfers, including how to compare costs using tools like CurraPay.",
    author: "Dr Suess",
  },
  {
    id: "international-students-guide",
    imgPath: "/news/article-4-img.png",
    title:
      "A Guide for International Students Studying in U.S. Colleges and Universities",
    date: "2024-01-01",
    content:
      "Studying in the United States offers international students a unique opportunity to immerse themselves in diverse cultures, gain a world-class education, and build valuable connections. This article provides an overview of what international students can expect, tips for navigating life in the U.S., and resources to make the most of their experience.",
    author: "Dr Suess",
  },
];

export interface Article {
  id: string;
  imgPath: string;
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
    <section id="newsPage" className="items-center justify-start">
      <h1>News</h1>
      <div className="flex flex-col gap-8 md:gap-12 w-full py-8">
        {articles.map((article) => (
          <Link
            href={`/news/${article.id}`}
            className="group"
            key={article.id}
          >
            <div className="border bg-white py-3 px-4 xl:py-6 xl:px-8 rounded-lg shadow-md space-y-4 sm:space-x-4 md:space-x-8 xl:space-x-12 group-hover:scale-[102%] group-hover:shadow-xl relative flex flex-col sm:flex-row">
              {/* <div className="inline-flex justify-between w-full">
                  <p>{article.author}</p>
                  <p>{article.date}</p>
                </div> */}
              <div className="w-full sm:w-2/5 flex items-center justify-center">
                <div className="relative h-64 w-full xs:w-64 sm:h-48 sm:w-48 md:h-64 md:w-64 rounded-lg">
                  <Image
                    src={article.imgPath}
                    alt={article.id}
                    className="rounded-lg"
                    objectFit="cover"
                    fill
                  />
                </div>
              </div>

              <div className="pb-12 space-y-2 xl:space-y-4">
                <h3 className="font-semibold">{article.title}</h3>
                <p className="line-clamp-2 lg:line-clamp-3">
                  {article.content}
                </p>
                <div className="absolute bottom-3 xl:bottom-6 right-4 xl:right-8 items-center inline-flex space-x-1 hover:underline hover:text-accent">
                  <p>Read more</p>
                  <ArrowRightIcon className="h-4 w-4" />
                </div>
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
