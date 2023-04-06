import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { IProduct } from "../../helper/interfaces";
import store from "../../features/store";
import ProductCart from "../../components/product/Product";
import { BrowserRouter } from "react-router-dom";
interface AppWrapperProps  {
  children: React.ReactNode;
};
import { useAddToCart } from "../../hooks/useCartActions";
const queryClient = new QueryClient({});

function AppWrapper({ children }: AppWrapperProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Provider store={store}>{children}</Provider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
const product = {
  _id: "1",
  name: "Product 1",
  price: 10,
  imageName: "product1.png",
  quantity: 0,
};
describe("ProductCart", () => {
  it("renders product details correctly", () => {
    render(
      <AppWrapper>
        <ProductCart product={product} />
      </AppWrapper>
    );

    const productName = screen.getByText(/Product 1/);
    const productPrice = screen.getByText(/\$10/);
    const addToCartButton = screen.getByText(/Add To Cart/);

    expect(productName).toBeInTheDocument();
    expect(productPrice).toBeInTheDocument();
    expect(addToCartButton).toBeInTheDocument();
  });

  