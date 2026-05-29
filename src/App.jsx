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
import AuthContextProvider from "./context/authContext/AuthContextProvider.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PostDetails from "./pages/PostDetails.jsx";
import PostLikes from "./components/posts/postDetails/PostLikes.jsx";
import PostComments from "./components/posts/postDetails/PostComments.jsx";
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
          path: "/post/:postId",
          element: (
            <ProtectedRoute>
              <PostDetails />
            </ProtectedRoute>
          ),
          children: [
            { path: "likes", element: <PostLikes /> },
            { path: "comments", element: <PostComments /> },
          ],
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

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <ToastContainer position="top-center" autoClose={3000} />
        <RouterProvider router={routes} />
      </AuthContextProvider>
    </QueryClientProvider>
  );
}
