import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import CustomerApp from "./CustomerApp";
import LoginPage from "./LoginPage";
import NotFoundPage from "./NotFoundPage";
import RestaurantApp from "./RestaurantApp";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="customer" element={<CustomerApp />} />
          <Route path="restaurant-administration" element={<RestaurantApp />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="/" element={<Navigate to="/customer" />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
