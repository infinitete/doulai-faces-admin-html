import React from 'react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import { Spin } from 'antd';
import { HashRouter as Router, Route } from 'react-router-dom';
import reducer from './redux/reducers/index';
import './App.css';

const Login = React.lazy(() => import('./component/auth/Login'));
const LazyLoginComponent: React.FC = () => <React.Suspense fallback={<Spin />}><Login /></React.Suspense>;

const Main = React.lazy(() => import('./component/main'));
const LazyMainComponent: React.FC = () => <React.Suspense fallback={<Spin />}><Main /></React.Suspense>;

const initialState = {
    loaded: new Set<string>(),
    loading: [],
    apps: {
        page: 1,
        size: 15,
        total: 0,
        elements: []
    },
    faces: {
        loaded: false,
        page: 1,
        size: 15,
        total: 0,
        elements: []
    }
};

const store = createStore(reducer, initialState as any, applyMiddleware(thunk, logger));

const App: React.FC = () => (<Provider store={store}><div className="App">
    <Router>
        <Route path="/" exact={true} component={ LazyMainComponent } />
        <Route path="/login" component={ LazyLoginComponent  } />
        <Route component={LazyMainComponent} />
    </Router>
</div></Provider>);

export default App;
