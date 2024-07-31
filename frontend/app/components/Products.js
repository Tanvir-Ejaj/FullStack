// import React from "react";
// import ProductCard from "../components/ProductCard";

// // to fetch data from nextJS
// async function getData() {
//   const res = await fetch("http://localhost:8000/api/v1/product/viewproduct");

//   if (!res.ok) {
//     throw new Error("Failed to fetch data");
//   }
//   return res.json();
// }

// const Products = async () => {
//   const data = await getData();
//   return (
//     <ProductCard data={data} />
//   )
// };

// export default Products;

// Workable code
import React from "react";
import ProductCard from "./ProductCard";

async function getData() {
  const res = await fetch("http://localhost:8000/api/v1/product/viewproduct", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const Products = async () => {
  const data = await getData();

  return <ProductCard data={data} />;
};

export default Products;
