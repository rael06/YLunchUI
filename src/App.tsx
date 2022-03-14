import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import classes from "./App.module.scss";
import Content from "./Content";
import Footer from "./Footer";
import Header from "./Header";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className={classes.wrapper}>
        <BrowserRouter>
          <Header />
          <Content />
          <Footer />
        </BrowserRouter>
      </div>
    </QueryClientProvider>
  );
}
