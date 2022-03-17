import Home from "./pages/Home";
import MovieDetail from "./pages/MovieDetail";

export const routes = [
  {
    path: "/",
    exact: true,
    component: <Home />,
    title: "Home"
  },
  {
    path: "/movies/:id",
    exact: false,
    component: <MovieDetail />,
    title: "MovieDetail"
  }
];
