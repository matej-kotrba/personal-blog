import React from "react";
import { FullPageSectionWrapper } from "../../components";
import { getAllCategories } from "../../services/index";
import { CategoryResponse } from "../../types";
import Link from "next/link";
import Head from "next/head";

type CategoriesType = {
  categories: CategoryResponse[];
};

function Categories({ categories }: CategoriesType) {
  return (
    <>
      <Head>
        <title>Sealblog - Categories</title>
      </Head>
      <FullPageSectionWrapper>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {categories.map((category, index) => {
            const color = category.color.hex;

            return (
              <Link
                href={"/categories/" + category.slug}
                key={category.name + index}
                className={`relative p-5 overflow-hidden text-2xl font-bold text-center text-black border-2
               border-black border-solid rounded-md dark:border-white dark:text-white 
                isolate ${color} group`}
              >
                <span
                  className={`absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]
                 w-[150%] aspect-square z-[-10] duration-300 rounded-full scale-0 group-hover:scale-100
                 before:content-[''] before:inset-0 before:absolute before:bg-white dark:before:bg-black before:opacity-30`}
                  style={{
                    backgroundColor: color,
                  }}
                ></span>
                {category.name}
              </Link>
            );
          })}
        </div>
      </FullPageSectionWrapper>
    </>
  );
}

export default Categories;

export async function getStaticProps() {
  const data = await getAllCategories();
  return {
    props: {
      categories: data,
    },
  };
}
