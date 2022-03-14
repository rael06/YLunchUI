import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import classes from "./App.module.scss";
import CustomerApp from "./CustomerApp";
import Footer from "./Footer";
import Header from "./Header";
import Login from "./Login";
import NotFoundPage from "./NotFoundPage";
import RestaurantApp from "./RestaurantApp";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className={classes.wrapper}>
        <BrowserRouter>
          <Header />
          <div className={classes.content}>
            <Routes>
              <Route path="/customer/*" element={<CustomerApp />} />
              <Route
                path="/restaurant-administration/*"
                element={<RestaurantApp />}
              />
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Navigate to="/customer" />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </div>
    </QueryClientProvider>
  );
}
