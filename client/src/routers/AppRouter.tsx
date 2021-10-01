import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { AuthRouter } from './AuthRouter';
import { NavBar } from '../components/NavBar';
import { HomePage } from '../pages/home/HomePage';
import { ProductsListPage } from '../pages/products/ProductsListPage';
import { ProductsManagePage } from '../pages/products/ProductsManagePage';

export const AppRouter = () => {
    return (
        <Router>
            <div>
                <NavBar />
                    <div className="content">
                        <Switch>
                            <Route path="/auth" component={AuthRouter} />
                            <Route exact path="/" component={HomePage} />
                            <Route exact path="/products" component={ProductsListPage} />
                            <Route exact path="/products/add" component={ProductsManagePage} />
                            <Redirect to="/auth/login"/>
                        </Switch>
                    </div>
            </div>
        </Router>
    );
};
