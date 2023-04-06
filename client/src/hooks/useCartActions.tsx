import axios from "../helper/axios";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { IChangeProductQuantity, IProduct } from "../helper/interfaces";
import { showErrorMessage } from "../features/popUpMessage";
import { errorHandler } from "../helper/errorHandler";
import {
  addToCart as productAddToCart,
  changeProductQuantity as changeQuantity,
  clearCart,
  removeFromCart,
} from "../features/user";

const useErrorHandler = () => {
  const dispatch = useDispatch();

  const handleError = (error: unknown) => {
   
      const errorMessage = errorHandler(error).message;

      
      dispatch(showErrorMessage(errorMessage));
   
  };

  return { handleError };
};

export function useAddToCart() {
  const dispatch = useDispatch();
  const { handleError } = useErrorHandler();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  

  const addToCart = async (product: IProduct) => {
    setIsLoading(true);

    try {
      await axios.put(`cart/add-to-cart/${product._id}`);
      dispatch(productAddToCart(product));
    } catch (error) {
      
      handleError(error);
    }
    setIsLoading(false);
  };

  return {
    isLoading,
    addToCart,
  };
}

export function useChangeProductQuantity() {
  const dispatch = useDispatch();
  const { handleError } = useErrorHandler();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const changeProductQuantity = async ({
    quantity,
    productId,
    price,
  }: IChangeProductQuantity) => {
    setIsLoading(true);
    try {
      const { data } = await axios.put(`cart/change-quantity`, {
        quantity,
        productId,
      });
      dispatch(changeQuantity({ productId, quantity, price }));
    } catch (error) {
      handleError(error);
    }
    setIsLoading(false);
  };

  return {
    isLoading,
    changeProductQuantity,
  };
}

export function useRemoveProductFromCart() {
  const dispatch = useDispatch();
  const { handleError } = useErrorHandler();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const removeProductFromCart = async (id: string) => {
    setIsLoading(true);
    try {
      const { data } = await axios.put(`cart/remove-product/${id}`);
      dispatch(removeFromCart(id));
    } catch (error) {
      handleError(error);
    }
    setIsLoading(false);
  };

  return {
    isLoading,
    removeProductFromCart,
  };
}

export function useRemoveAllProductsFromCart() {
  const dispatch = useDispatch();
  const { handleError } = useErrorHandler();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const removeAllProductsFromCart = async () => {
    setIsLoading(true);
    try {
      await axios.delete("/cart/remove-all-products");
      dispatch(clearCart());
    } catch (error) {
      handleError(error);
    }
    setIsLoading(false);
  };

  return {
    isLoading,
    removeAllProductsFromCart,
  };
}
