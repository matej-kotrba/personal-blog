import React from "react";
import { getAllCategories } from "../../services";
import { Filter } from "../../components";

function Articles({ allCategories }: { allCategories: { name: string }[] }) {
  return (
    <section className="col-span-6 p-6 bg-white rounded-md dark:bg-slate-800">
      <Filter categories={allCategories.map((item) => item.name)} />
    </section>
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
