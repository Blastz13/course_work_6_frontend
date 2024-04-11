import './App.css'
import MainPage from './pages/MainPage';
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider
} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import SettingsPage from "./pages/SettingsPage";
import RegisterPage from "./pages/Auth/RegisterPage";
import LoginPage from "./pages/Auth/LoginPage";
import UserPage from "./pages/User/UserPage";
import {useDispatch, useSelector} from "react-redux";
import {getCurUser, selectToken, updateToken} from "./redux/slices/auth";
import {useEffect} from "react";
import RootPage from "./pages/RootPage";
import ErrorPage from "./pages/ErrorPage";
import AuthRootPage from "./pages/Auth/AuthRootPage";
import PageNotFound from "./pages/PageNotFound";
import UsersPage from "./pages/User/UsersPage";
import StoresPage from "./pages/Store/StoresPage";
import CategoriesPage from "./pages/Category/CategoriesPage";
import RolesPage from "./pages/Role/RolesPage";
import StoreArticlesPage from "./pages/Article/StoreArticlesPage";
import StorePage from "./pages/Store/StorePage";
import CategoryPage from "./pages/Category/CategoryPage";
import StoresCreatePage from "./pages/Store/StoresCreatePage";
import CategoryCreatePage from "./pages/Category/CategoryCreatePage";
import RolePage from "./pages/Role/RolePage";
import RoleCreatePage from "./pages/Role/RoleCreatePage";
import {initCurStore} from "./redux/slices/auth";
import StoreArticlePage from "./pages/Article/StoreArticlePage";
import OrderPage from "./pages/Order/OrderPage";
import OrderCreatePage from "./pages/Order/OrderCreatePage";
import OrderArticlePage from "./pages/Order/OrderArticlePage";
import StoreArticleCreatePage from "./pages/Article/StoreArticleCreatePage";
import AdminPages from "./pages/AdminPages";
import OrdersPageGeneral from "./pages/Order/OrdersPageGeneral";
import StatisticPage from "./pages/StatisticPage";


/*const router2 = createBrowserRouter([
    {
        path: "/",
        element: <RootPage/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: "",
                element: <MainPage/>,
            },
            {
                path: "settings",
                element: <SettingsPage/>,
            },
            {
                path: "settings",
                element: <SettingsPage/>,
            },
            {
                path: "settings",
                element: <SettingsPage/>,
            },
        ],
    },
    {
        path: "/auth",
        element: <AuthRootPage/>,
        children: [
            {
                path: "login",
                element: <LoginPage/>
            },
            {
                path: "registration",
                element: <RegisterPage/>
            },
        ]

    }
])*/


function App() {
    const dispatch = useDispatch()
    const token = useSelector(selectToken)
    useEffect(() => {
        dispatch(updateToken())
    }, [dispatch])

    useEffect(() => {
        if (token) {
            dispatch(getCurUser(token))
        }
    }, [dispatch, token])

    useEffect(() => {
        dispatch(initCurStore())
    }, [dispatch])

    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route>
                <Route
                    path=""
                    element={<RootPage/>}
                    errorElement={<ErrorPage/>}
                >
                    <Route
                        path=""
                        element={<MainPage/>}
                    />

                    <Route
                        path="statistic"
                        element={<StatisticPage/>}
                    />

                    <Route path="articles">
                        <Route
                            path=""
                            element={<StoreArticlesPage/>}
                        />
                        <Route
                            path=":id"
                            element={<StoreArticlePage/>}
                            errorElement={<ErrorPage/>}
                        />
                    </Route>

                    <Route path="orders">
                        <Route
                            path=""
                            element={<OrdersPageGeneral/>}
                        />
                        <Route
                            path=":id"
                        >
                            <Route
                                path=""
                                element={<OrderPage/>}
                            />
                            <Route
                                path="articles/:articleId"
                                element={<OrderArticlePage/>}
                            />
                        </Route>
                        <Route
                            path="create"
                            element={<OrderCreatePage/>}
                        />
                    </Route>

                    <Route
                        path="settings"
                        element={<SettingsPage/>}
                    />

                </Route>

                <Route element={<AdminPages/>}>
                    <Route
                        path="articles/create"
                        element={<StoreArticleCreatePage/>}
                    />
                    <Route
                        path="users"
                    >
                        <Route
                            path=""
                            element={<UsersPage/>}
                        />

                        <Route
                            path=":id"
                            element={<UserPage/>}
                        />
                    </Route>
                    <Route path="stores">
                        <Route
                            path=""
                            element={<StoresPage/>}
                        />
                        <Route
                            path=":id"
                            element={<StorePage/>}
                        />
                        <Route
                            path="create"
                            element={<StoresCreatePage/>}
                        />
                    </Route>
                    <Route path="categories">
                        <Route
                            path=""
                            element={<CategoriesPage/>}
                        />
                        <Route
                            path=":id"
                            element={<CategoryPage/>}
                        />
                        <Route
                            path="create"
                            element={<CategoryCreatePage/>}
                        />
                    </Route>
                    <Route path="roles">
                        <Route
                            path=""
                            element={<RolesPage/>}
                        />
                        <Route
                            path=":id"
                            element={<RolePage/>}
                        />
                        <Route
                            path="create"
                            element={<RoleCreatePage/>}
                        />
                    </Route>
                </Route>

                <Route
                    element={<AuthRootPage/>}
                >
                    <Route
                        path="/auth/login"
                        element={<LoginPage/>}
                    />
                    <Route
                        path="/auth/registration"
                        element={<RegisterPage/>}
                    />
                </Route>

                <Route
                    path="*"
                    element={<PageNotFound/>}
                />
            </Route>
        )
    )

    return (
        <RouterProvider router={router}/>
    )
}

export default App;
