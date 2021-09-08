import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { PrincipalScreen } from '../components/project4/PrincipalScreen';
import { AuthRouter } from './AuthRouter';
import { NavBar } from '../components/ui/NavBar';
import { ProductsScreen } from '../components/project4/ProductsScreen';

export const AppRouter = () => {
    return (
        <Router>
            <div>
                <NavBar />
                    <div className="content">
                        <Switch>
                            <Route path="/auth" component={AuthRouter} />
                            <Route exact path="/" component={PrincipalScreen} />
                            <Route exact path="/products" component={ProductsScreen} />
                            <Redirect to="/auth/login"/>
                        </Switch>
                    </div>
                
            </div>
        </Router>
    );
};
