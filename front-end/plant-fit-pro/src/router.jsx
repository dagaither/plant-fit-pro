import { createBrowserRouter } from "react-router-dom"
import App from './App';
import HomePage from './pages/HomePage'
import Recipes from "./pages/Recipes";
import Workouts from "./pages/Workouts";
import MyWorkouts from "./pages/MyWorkouts";
import ErrorPage from './pages/ErrorPage'
import RecipeDetails from "./pages/RecipeDetailsPage";
import Favorites from './pages/Favorites'
import SignUp from './pages/SignUp'
import Login from "./pages/Login"

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                index: true,
                element: <HomePage />,
            },
            {
                path: "workouts/",
                element: <Workouts />,
            },
            {
                path: "myworkouts/",
                element: <MyWorkouts />,
            },
            {
                path: "recipes/",
                element: <Recipes />,
            },
            {
                path: "recipes/:id/",
                element: <RecipeDetails />,
            },
            {
                path: "favorites/",
                element: <Favorites />,
            },
            {
                path: "signup/",
                element: <SignUp />,
            },
            {
                path: "login/",
                element: <Login />,
            }
        ],
        errorElement: <ErrorPage />,
    }
]);

export default router;