import React from "react";
import { getAllCategories } from "../../services";
import { Filter, FullPageSectionWrapper } from "../../components";

function Articles({ allCategories }: { allCategories: { name: string }[] }) {
  return (
    <FullPageSectionWrapper>
      <Filter categories={allCategories.map((item) => item.name)} />
    </FullPageSectionWrapper>
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
