import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";
import { useGetProductsQuery } from "../features/api/apiSlice";
import { toggle, toggleBrand } from "../features/filter/filterSlice";
import { getProducts } from "../features/products/productSlice";

const Home = () => {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.filter);
  // const product = useSelector((state) => state.products);
  // const { isLoading, products } = product;
  const { stock, brands } = filter;
  // // const [products, setProducts] = useState([]);

  // useEffect(() => {
  //   dispatch(getProducts());
  // }, [dispatch]);

  const { data, isLoading, isSuccess, isError, error } = useGetProductsQuery(
    null,
    { refetchOnMountOrArgChange: true }
  );
  console.log(data);

  const products = data?.data;

  console.log(products);

  const activeClass = "text-white  bg-indigo-500 border-white";

  let content;

  if (isLoading) {
    content = <h1>Loading.....</h1>;
  }

  if (isError) {
    content = <h1>Something went wrong</h1>;
  }

  if (products.length) {
    content = products.map((product) => (
      <ProductCard key={product._id} product={product}></ProductCard>
    ));
  }

  if (products.length && (stock || brands.length)) {
    content = products
      .filter((product) => {
        if (stock) {
          return product.status === true;
        }
        return product;
      })
      .filter((product) => {
        if (brands.length) {
          return brands.includes(product.brand);
        }
        return product;
      })
      .map((product) => (
        <ProductCard key={product._id} product={product}></ProductCard>
      ));
  }
  return (
    <div className="max-w-7xl gap-14 mx-auto my-10">
      <div className="mb-10 flex justify-end gap-5">
        <button
          onClick={() => dispatch(toggle())}
          className={`border px-3 py-2 rounded-full font-semibold ${
            stock ? activeClass : null
          } `}
        >
          In Stock
        </button>
        <button
          onClick={() => dispatch(toggleBrand("amd"))}
          className={`border px-3 py-2 rounded-full font-semibold ${
            brands.includes("amd") ? activeClass : null
          }`}
        >
          AMD
        </button>
        <button
          onClick={() => dispatch(toggleBrand("intel"))}
          className={`border px-3 py-2 rounded-full font-semibold ${
            brands.includes("intel") ? activeClass : null
          }`}
        >
          Intel
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 max-w-7xl gap-14 mx-auto my-10">
        {content}
      </div>
    </div>
  );
};

export default Home;
