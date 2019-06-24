import React from 'react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import { LocaleProvider, Spin } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import { HashRouter as Router, Route } from 'react-router-dom';
import reducer from './redux/reducers/index';
import moment from 'moment';
import 'moment/locale/zh-cn';
import './App.css';

moment.locale('zh-cn');

const Login = React.lazy(() => import('./component/auth/Login'));
const LazyLoginComponent: React.FC = () => <React.Suspense fallback={<Spin />}><Login /></React.Suspense>;

const Main = React.lazy(() => import('./component/main'));
const LazyMainComponent: React.FC = () => <React.Suspense fallback={<Spin />}><Main /></React.Suspense>;

const initialState = {
    loaded: new Set<string>(),
    loading: new Set<String>(),
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
    },
    token: null
};

const store = createStore(reducer, initialState as any, applyMiddleware(thunk, logger));

const App: React.FC = () => (<Provider store={store}><LocaleProvider locale={zh_CN}>
    <Router>
        <Route path="/" exact={true} component={ LazyMainComponent } />
        <Route path="/login" component={ LazyLoginComponent  } />
        <Route component={LazyMainComponent} />
    </Router>
</LocaleProvider></Provider>);

export default App;
