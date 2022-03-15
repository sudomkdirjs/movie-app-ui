import Home from "./pages/Home";
import MovieDetail from "./pages/MovieDetail";

export const routes = [
  {
    path: "/",
    exact: true,
    component: <Home />,
    title: "Home",
    isHeaderElement: true,
  },
  {
    path: "/movies/:id",
    exact: false,
    component: <MovieDetail />,
    title: "MovieDetail",
    isHeaderElement: false,
  }
];
