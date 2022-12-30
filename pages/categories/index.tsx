import React from "react";
import { FullPageSectionWrapper } from "../../components";
import { getAllCategories } from "../../services/index";

// type CategoriesType = {
//   categories:
// }

function Categories({ categories }: { categories: string[] }) {
  return (
    <FullPageSectionWrapper>
      <p>Categories</p>
    </FullPageSectionWrapper>
  );
}

export default Categories;

export async function getStaticProps() {
  const json = await getAllCategories();
  const data = await json.json();

  return {
    props: {
      categories: data,
    },
  };
}
