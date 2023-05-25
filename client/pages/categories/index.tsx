import CategoryItem, { TCategory } from "@/components/CategoryItem";
import { axiosApi } from "@/libs/fetchData";
import Head from "next/head";
import React from "react";

interface Props {
  categories: TCategory[];
}

export default function Categories({ categories }: Props) {
  return (
    <>
      <Head>
        <title>Categories</title>
        <meta name="description" content="List categories" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="categories-page-title">
          <h1>Categories</h1>
          <p>
            Praesent placerat laoreet ipsum ut fermentum. Ut mollis accumsan
            quam vitae porta. Nullam sit amet nibh id lorem fermentum feugiat
            rutrum egestas.
          </p>
        </div>
        <div className="categories-page-list">
          <p style={{ fontWeight: "bold" }}>Explore our Categories</p>
          <div className="categories-page-list__item">
            {categories &&
              categories.map((category: TCategory, index: number) => {
                return <CategoryItem category={category} key={index} />;
              })}
          </div>
        </div>
      </main>
    </>
  );
}

export async function getServerSideProps() {
  try {
    const response = await axiosApi.get("categories/get-all");
    const categories = response.data.categories;
    return {
      props: {
        categories,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {},
    };
  }
}
