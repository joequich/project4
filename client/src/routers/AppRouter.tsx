import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { AuthRouter } from './AuthRouter';
import { NavBar } from '../components/NavBar';
import { HomePage } from '../pages/home/HomePage';
import { ProductsListPage } from '../pages/products/ProductsListPage';
import { ProductsManagePage } from '../pages/products/ProductsManagePage';
import { PrivateRoute } from './PrivateRoute';
import { useAppSelector } from '../hooks/Redux';
import { AlertMessage } from '../components/AlertMessage';

export const AppRouter = () => {
    const { username } = useAppSelector(state => state.auth);
    return (
        <Router>
            <div>
                <NavBar />
                    <div className="content">
                        <AlertMessage />
                        <Switch>
                            <Route path="/auth" component={AuthRouter} />
                            <Route exact path="/" component={HomePage} />
                            <PrivateRoute exact isAuthenticated={!!username} path="/products" component={ProductsListPage} />
                            <PrivateRoute exact isAuthenticated={!!username} path="/products/add" component={ProductsManagePage} />
                            <Redirect to="/auth/login"/>
                        </Switch>
                    </div>
            </div>
        </Router>
    );
};
