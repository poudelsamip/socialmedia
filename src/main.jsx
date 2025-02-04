import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { SpeedInsights } from "@vercel/speed-insights/react";
import App from "./App.jsx";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/Signup.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Contents from "./components/Contents.jsx";
import AuthProvider from "./store/authProvider.jsx";
import CreatePost from "./components/CreatePost.jsx";
import Profile from "./components/Profile.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Contents /> },
      { path: "/createpost", element: <CreatePost /> },
      { path: "/profile", element: <Profile /> },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <SignUp /> },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SpeedInsights />
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
