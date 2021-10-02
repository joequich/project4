import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { AuthRouter } from './AuthRouter';
import { NavBar } from '../components/NavBar';
import { HomePage } from '../pages/home/HomePage';
import { ProductsListPage } from '../pages/products/ProductsListPage';
import { ProductsManagePage } from '../pages/products/ProductsManagePage';
import { PrivateRoute } from './PrivateRoute';
import { useAppSelector } from '../hooks/Redux';

export const AppRouter = () => {
    const { logged } = useAppSelector(state => state.auth);
    return (
        <Router>
            <div>
                <NavBar />
                    <div className="content">
                        <Switch>
                            <Route path="/auth" component={AuthRouter} />
                            <Route exact path="/" component={HomePage} />
                            <PrivateRoute exact isAuthenticated={logged} path="/products" component={ProductsListPage} />
                            <PrivateRoute exact isAuthenticated={logged} path="/products/add" component={ProductsManagePage} />
                            <Redirect to="/auth/login"/>
                        </Switch>
                    </div>
            </div>
        </Router>
    );
};
