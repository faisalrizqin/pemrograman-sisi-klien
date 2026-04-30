import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Layout
import AdminLayout from "./Pages/Admin/AdminLayout";

// Pages
import Mahasiswa from "./Pages/Admin/Mahasiswa/Mahasiswa";
import MahasiswaDetail from "./Pages/Admin/Mahasiswa/MahasiswaDetail";
// import Login from "@/Pages/Auth/Login/Login";

const router = createBrowserRouter([
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        path: "mahasiswa",
        children: [
          { index: true, element: <Mahasiswa /> },
          { path: ":nim", element: <MahasiswaDetail /> },
        ],
      },
    ],
  },


]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;