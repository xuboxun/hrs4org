import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Switch, Route, Redirect } from 'react-router';

import Loadable from 'react-loadable';
import Loading from '@/components/Loading';

const Index = Loadable({ loader: () => import('@/pages/index'), loading: Loading });
const ConsoleLayout = Loadable({ loader: () => import('@/layouts/ConsoleLayout'), loading: Loading });
const FormLayout = Loadable({ loader: () => import('@/layouts/FormLayout'), loading: Loading });
const Error = Loadable({ loader: () => import('@/pages/error'), loading: Loading });

class App extends React.Component {
    render() {
        return (
            <div>
                <Router>
                    <Switch>
                        <Route exact path="/" component={ Index } />
                        <Route path="/console" component={ ConsoleLayout } />
                        <Route path="/form" component={ FormLayout } />
                        <Route path="/error" component={ Error } />
                        <Redirect to="/error" />
                    </Switch>
                </Router>

            </div>
        );
    }
}

export default App;
