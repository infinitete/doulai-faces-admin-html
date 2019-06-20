import * as React from 'react';
import { Link } from 'react-router-dom';

//
// 登录后的程序入口
// 在此处作布局
//
const MainComponent: React.FC = () => {
    return <div><Link to="/login">登录</Link></div>
}

export default MainComponent;
