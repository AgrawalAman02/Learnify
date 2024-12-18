import { Children, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import appStore from "./store/appStore.jsx";
import { Toaster } from "./components/ui/sonner.jsx";
import { ThemeProvider } from "./components/themeProvider.jsx";
import { useGetUserQuery } from "./apis/profileApi.jsx";
import LoaderSpinner from "./pages/LoaderSpinner.jsx";

const Custom = ({ children }) => {
  const { isLoading } = useGetUserQuery();
  return <>{isLoading ? <LoaderSpinner/> : <>{children}</>}</>;
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Provider store={appStore}>
        <Custom>
          <App />
          <Toaster />
        </Custom>
      </Provider>
    </ThemeProvider>
  </StrictMode>
);
