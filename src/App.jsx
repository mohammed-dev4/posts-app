import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import { ToastContainer } from "react-toastify";
import AuthRoute from "./routes/AuthRoute";
import ProtectedRoute from "./routes/ProtectedRoute";

export default function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          ),
        },
        {
          path: "/profile",
          element: (
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          ),
        },
        {
          path: "/login",
          element: (
            <AuthRoute>
              <Login />
            </AuthRoute>
          ),
        },
        {
          path: "/register",
          element: (
            <AuthRoute>
              <Register />
            </AuthRoute>
          ),
        },
        {
          path: "*",
          element: <NotFound />,
        },
      ],
    },
  ]);

  return (
    <>
      <ToastContainer position="top-center" autoClose={3000} />
      <RouterProvider router={routes} />
    </>
  );
}
