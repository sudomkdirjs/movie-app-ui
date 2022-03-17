import Home from "./pages/Home";
import MovieDetail from "./pages/MovieDetail";
import MovieForm from "./pages/MovieForm";

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
  },
  {
    path: "/movie/form",
    exact: false,
    component: <MovieForm />,
    title: "MovieDetail"
  }
];
