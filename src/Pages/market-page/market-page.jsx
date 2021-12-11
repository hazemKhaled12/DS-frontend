import React, { useEffect } from "react";
import { useStores } from "../../hooks/useStores";
import { ProductCard } from "../../Components/product-card";
import { Typography } from "@material-ui/core";
import { CircularProgress } from "@mui/material";
import { ApiCallStates } from "../../mobx-store/types";
import "./market-page.css";
import { observer } from "mobx-react";
export const MarketPage = observer(() => {
  const { authStore } = useStores();
  const {
    getUserData,
    user,
    getUserState,
    products,
    getAllProducts,
    getProductsState
  } = authStore;

  useEffect(() => {
    const getData = () => {
      getAllProducts();
      console.log("I am trying to get Data");
    };
    getData();
  }, []);

  if (getProductsState === ApiCallStates.LOADING) {
    return <CircularProgress />;
  }

  // const products = [
  //   { title: "Item 1", disc: "this is item 1 disc", price: "15" },
  //   { title: "Item 1", disc: "this is item 1 disc", price: "15" },
  //   { title: "Item 1", disc: "this is item 1 disc", price: "15" },
  //   { title: "Item 1", disc: "this is item 1 disc", price: "15" },
  //   { title: "Item 1", disc: "this is item 1 disc", price: "15" },
  //   { title: "Item 1", disc: "this is item 1 disc", price: "15" },
  //   { title: "Item 1", disc: "this is item 1 disc", price: "15" },
  //   { title: "Item 1", disc: "this is item 1 disc", price: "15" },
  //   { title: "Item 1", disc: "this is item 1 disc", price: "15" },
  //   { title: "Item 1", disc: "this is item 1 disc", price: "15" },
  //   { title: "Item 1", disc: "this is item 1 disc", price: "15" },
  //   { title: "Item 1", disc: "this is item 1 disc", price: "15" }
  // ];
  if (!products) {
    return (
      <div
        // variant="outlined"
        style={{ marginBottom: "16px" }}
        // onClick={() => history.push("/admin/create-new")}
      >
        No Products found
      </div>
    );
  }

  return (
    <div className="products-container">
      <h1 className="products-title">Our Products</h1>
      <div className="products-wrapper">
        {products.map(product => {
          return (
            <ProductCard
              title={product.name}
              price={product.price}
              disc={product.description}
              id={product.id}
            />
          );
        })}
      </div>
    </div>
  );
  // else return "no permission";
});
