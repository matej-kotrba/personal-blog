import React from "react";
import { getAllCategories } from "../../services";
import { Filter, FullPageSectionWrapper } from "../../components";
import Head from "next/head";

function Articles({ allCategories }: { allCategories: { name: string }[] }) {
  return (
    <>
      <Head>
        <title>Sealblog - Articles</title>
      </Head>
      <FullPageSectionWrapper>
        <Filter categories={allCategories.map((item) => item.name)} />
      </FullPageSectionWrapper>
    </>
  );
}

export async function getStaticProps() {
  const categoriesPromise = getAllCategories();

  const [categories] = await Promise.all([categoriesPromise]);

  return {
    props: { allCategories: categories },
  };
}

export default Articles;
