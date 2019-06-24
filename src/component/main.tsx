import * as React from 'react';
import { connect } from 'react-redux';
import { Icon, Layout, Menu, Spin } from 'antd';
import { Link, HashRouter as Router, Route } from 'react-router-dom';

import FooterComponent from './common/Footer';
const { Suspense } = React;

const Logout = React.lazy(() => import('./auth/Logout'));
const Apps = React.lazy(() => import('./app/Apps'));
const AppCreator = React.lazy(() => import('./app/Creator'));
const Faces = React.lazy(() => import('./face/Faces'));
const ChPass = React.lazy(() => import('./auth/ChangePass'));

const LazyLogoutComponent: React.FC = () => <React.Suspense fallback={<Spin tip="正在退出" />}><Logout /></React.Suspense>;
const AppsComponent: React.FC = () => <Suspense fallback={<Spin tip="正在加载" />}><Apps /></Suspense>
const AppCreatorComponent: React.FC = () => <Suspense fallback={<Spin tip="正在加载" />}><AppCreator /></Suspense>
const FacesComponent: React.FC = () => <Suspense fallback={<Spin tip="正在加载" />}><Faces /></Suspense>
const ChPassComponent: React.FC = () => <Suspense fallback={<Spin tip="正在加载" />}><ChPass /></Suspense>


//
// 登录后的程序入口
// 在此处作布局
//
const MainComponent: React.FC = () => {

    return <Router><Layout style={{ minHeight: '100vh' }}>
        <Layout.Header>
            <Menu theme="dark" mode="horizontal" style={{lineHeight:'64px', textAlign: 'right'}}>
                <Menu.Item key="1"><Link to="/logout"><span><Icon type="logout" />退出</span></Link></Menu.Item>
            </Menu>
        </Layout.Header>
        <Layout>
            <Layout.Sider style={{width:'200px', backgroundColor:'#FFF'}}>
                <Menu mode="inline" style={{minHeight:'100%'}}>
                    <Menu.SubMenu key="apps" title={<span><Icon type="build" />应用管理</span>}>
                        <Menu.Item key="app-list"><Link to="/apps"><span><Icon type="database" />应用列表</span></Link></Menu.Item>
                        <Menu.Item key="app-creator"><Link to="/creator/app"><span><Icon type="database" />添加应用</span></Link></Menu.Item>
                    </Menu.SubMenu>

                    <Menu.SubMenu key="faces" title={<span><Icon type="meh" />注册人脸信息管理</span>}>
                        <Menu.Item key="face-list"><Link to="/faces"><span><Icon type="bars" />注册信息列表</span></Link></Menu.Item>
                    </Menu.SubMenu>

                    <Menu.SubMenu key="admin" title={<span><Icon type="team" />管理员</span>}>
                        <Menu.Item key="pwd"><Link to="/ch/pass"><span><Icon type="lock" />修改密码</span></Link></Menu.Item>
                    </Menu.SubMenu>
                </Menu>
            </Layout.Sider>
            <Layout>
                <Layout.Content style={{padding: '24px', backgroundColor: '#e0e0e0'}}>
                    <Route path="/apps" component={AppsComponent} />
                    <Route path="/faces" component={FacesComponent} />
                    <Route path="/creator/app" component={AppCreatorComponent} />
                    <Route path="/ch/pass" component={ChPassComponent} />
                    <Route path="/logout" component={ LazyLogoutComponent  } />
                </Layout.Content>
            </Layout>
        </Layout>
        <Layout.Footer><FooterComponent /></Layout.Footer>
    </Layout></Router>
}

export default connect()(MainComponent);
