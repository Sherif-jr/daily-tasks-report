import { RouterProvider } from "react-router-dom";
import router from "@/router";
import { ThemeProvider } from "./components/ThemeProvider";
import { ToastContainer } from "react-toastify";
  import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
      <ToastContainer theme="dark" />
    </ThemeProvider>
  );
}

export default App;
