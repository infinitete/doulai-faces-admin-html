import React from 'react';
import { Spin } from 'antd';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.css';

const Login = React.lazy(() => import('./component/auth/Login'));
const LazyLoginComponent: React.FC = () => <React.Suspense fallback={<Spin />}><Login /></React.Suspense>

const Main = React.lazy(() => import('./component/main'));
const LazyMainComponent: React.FC = () => <React.Suspense fallback={<Spin />}><Main /></React.Suspense>

const App: React.FC = () => {

    return (
        <div className="App">
            <Router>
                <Route path="/login" component={ LazyLoginComponent  } />
                <Route path="/" exact={true} component={ LazyMainComponent } />
            </Router>
        </div>
    );
}

export default App;
