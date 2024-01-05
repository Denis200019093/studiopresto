import ProductList from "./components/ProductList";
import Categories from "./components/Categories";

export default function Home() {
  return (
    <main className="flex flex-wrap lg:flex-nowrap gap-6">
      <div className=" basis-full lg:basis-2/12">
        <Categories />
      </div>
      <div className=" basis-full lg:basis-10/12">
        <ProductList />
      </div>
    </main>
  );
}
