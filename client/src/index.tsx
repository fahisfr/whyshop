import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { fetchUser } from "./features/user";
import store from "./features/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

store.dispatch(fetchUser());

const queryClient = new QueryClient({});

ReactDOM.render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </Provider>,
  document.getElementById("root")
);

reportWebVitals();
