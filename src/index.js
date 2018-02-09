//import React from 'react';
//import ReactDOM from 'react-dom';
//import './index.less';
//import { Router, Route, IndexRoute, hashHistory } from 'react-router';
//import App from './App';
//import Nav from './components/Nav';
//import Login from './components/pages/Login';
//import NotFound from './components/pages/NotFound';
//import AdminUser from './components/pages/module/admin/AdminUser';
//import UserList from './components/pages/module/fontuser/UserList';
//import BagList from './components/pages/module/bag/BagList';
//import VoteList from './components/pages/module/vote/VoteList';
//import SystemConfList from './components/pages/module/systemconfig/SystemConfigList';
//张迅
import React from 'react';
import ReactDOM from 'react-dom';
import './index.less';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import App from './App';
import Nav from './components/Nav';
import Login from './components/pages/Login';
import NotFound from './components/pages/NotFound';
import AdminUser from './components/pages/module/admin/AdminUser';
import UserList from './components/pages/module/fontuser/UserList';
import BagList from './components/pages/module/bag/BagList';
import SystemConfList from './components/pages/module/systemconfig/SystemConfigList';
import VoteList from './components/pages/module/vote/VoteList';
import RoleList from './components/pages/module/roleManager/RoleList';
import AccountList from './components/pages/module/accountManager/AccountList';
import WalletLogList from './components/pages/module/walletLogManager/WalletLogList';
import EntryList from './components/pages/module/entryManager/EntryList';
import ExistList from './components/pages/module/existManager/ExistList';

//原代码
//const RouteConfig = 
//  <Router history={hashHistory}>
//      <Route path="/" component={App}>
//          <IndexRoute component={Login} />
//          <Route path="/login" component={Login} footer={true}></Route>
//          <Route path="/404" component={NotFound}></Route>
//          <Route path="/nav" component={Nav}>
//              <Route path="/nav/adminuser" component={AdminUser}></Route>
//              <Route path="/nav/fontuser" component={UserList}></Route>
//              <Route path="/nav/bag" component={BagList}></Route>
//              <Route path="/nav/vote" component={VoteList}></Route>
//              
//              /** 系统配置 **/
//              <Route path="/nav/systemconfig" component={SystemConfList}></Route>
//          </Route>
//      </Route>
//  </Router>;
    // <Route path="/register" component={Register} footer={true}></Route>
//张迅
const RouteConfig = 
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Login} />
            <Route path="/login" component={Login} footer={true}></Route>
            <Route path="/404" component={NotFound}></Route>
            <Route path="/nav" component={Nav}>
                <Route path="/nav/adminuser" component={AdminUser}></Route>
                <Route path="/nav/fontuser" component={UserList}></Route>
                <Route path="/nav/bag" component={BagList}></Route>
                <Route path="/nav/vote" component={VoteList}></Route>
				<Route path="/nav/role" component={RoleList}></Route>
				<Route path="/nav/account" component={AccountList}></Route>
				<Route path="/nav/walletLog" component={WalletLogList}></Route>
				<Route path="/nav/entry" component={EntryList}></Route>
				<Route path="/nav/exist" component={ExistList}></Route>
                /** 系统配置 **/
                <Route path="/nav/systemconfig" component={SystemConfList}></Route>
            </Route>
        </Route>
    </Router>;
    ReactDOM.render(
    RouteConfig,
    document.getElementById('root')
);