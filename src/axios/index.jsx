//import axios from 'axios';
// import qs from 'qs';
//
//const Host = 'http://111.231.146.57:9997';
//axios.defaults.headers.common['Content-type'] = 'application/json; charset=UTF-8';
//axios.defaults.headers.common['Authorization'] = localStorage.getItem("token")||'';
//axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
//
//axios.interceptors.response.use(function(response){
//	return response.data;
//},function(error){
//	return Promise.reject(error);
//})
//export const login = (username, password) => axios.post(Host + '/system/user/login',{username:username,password:password});
//
//
//export const logout = () => axios.get(Host + '/system/user/loginOut');
//
//export const deletesUser = (ids) => axios.get(Host + '/system/user/deletes?ids='+ids);
//
//export const users = (offset, pageSize,obj) => axios.get(Host + '/system/user/page/'+offset+'/'+pageSize+"?"+qs.stringify(obj));
//export const usersName = (offset, pageSize,orderIdentity,isDesc) => axios.get(Host + '/system/user/page/'+offset+'/'+pageSize,orderIdentity?{queryOrder:[{orderIdentity,isDesc}]}:{});
//
//export const fontUsersName = (offset, pageSize,orderIdentity,isDesc) => axios.post(Host + '/admin/user/page/'+offset+'/'+pageSize,orderIdentity?{queryOrder:[{orderIdentity,isDesc}]}:{});
//
//export const fontUsers = (offset, pageSize,obj) => axios.post(Host + '/admin/gift/page/'+offset+'/'+pageSize,obj);
//
//export const changePwd = (obj) => axios.get(Host + '/system/user/changePwd?'+qs.stringify(obj));
//
//export const addUsers = (obj) => axios.post(Host + '/system/user/addOrUpdate',obj);
//
//export const updateStatus = (obj) => axios.post(Host + '/system/user/updateStatus',obj);
//
//export const menu = () => axios.get(Host + '/system/resouces/getAuthMenus');
//
//export const getResource = (resoucesId) => axios.get(Host + '/system/resouces/getResourceByPid/'+resoucesId);
//export const getAllVotes = (offset, pageSize) => axios.get(Host + '/admin/vote/page/'+offset+'/'+pageSize);
//张迅
import axios from 'axios';
 import qs from 'qs';

const Host = 'http://111.231.146.57:9997';
//const Host = 'http://127.0.0.1:8080';

axios.defaults.headers.common['Content-type'] = 'application/json; charset=UTF-8';
axios.defaults.headers.common['Authorization'] = localStorage.getItem("token")||'';
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

axios.interceptors.response.use(function(response){
	return response.data;
},function(error){
	return Promise.reject(error);
})

// export const login = (username, password) => axios.post(Host + '/system/user/login?'+qs.stringify({ "username": username, "password": password}));
export const login = (username, password) => axios.post(Host + '/system/user/login',{username:username,password:password});


export const logout = () => axios.get(Host + '/system/user/loginOut');

export const deletesUser = (ids) => axios.get(Host + '/system/user/deletes?ids='+ids);

export const users = (offset, pageSize,obj) => axios.get(Host + '/system/user/page/'+offset+'/'+pageSize+"?"+qs.stringify(obj));
export const usersName = (offset, pageSize,orderIdentity,isDesc) => axios.get(Host + '/system/user/page/'+offset+'/'+pageSize,orderIdentity?{queryOrder:[{orderIdentity,isDesc}]}:{});
export const fontUsersName = (offset, pageSize,orderIdentity,isDesc) => axios.post(Host + '/admin/user/page/'+offset+'/'+pageSize,orderIdentity?{queryOrder:[{orderIdentity,isDesc}]}:{});

export const fontUsers = (offset, pageSize,obj) => axios.post(Host + '/admin/gift/page/'+offset+'/'+pageSize,obj);

export const changePwd = (obj) => axios.get(Host + '/system/user/changePwd?'+qs.stringify(obj));

export const addUsers = (obj) => axios.post(Host + '/system/user/addOrUpdate',obj);

export const updateStatus = (obj) => axios.post(Host + '/system/user/updateStatus',obj);

export const menu = () => axios.get(Host + '/system/resouces/getAuthMenus');

export const getResource = (resoucesId) => axios.get(Host + '/system/resouces/getResourceByPid/'+resoucesId);
export const getAllVotes = (offset, pageSize) => axios.get(Host + '/admin/vote/page/'+offset+'/'+pageSize);

export const getAllRoles = (offset, pageSize) => axios.get(Host + '/system/role/page/'+offset+'/'+pageSize);

export const getAllAccounts = (offset, pageSize,obj) => axios.post(Host + '/admin/mebAccount/page/'+offset+'/'+pageSize,obj);

export const getWalletLogList = (offset, pageSize,obj) => axios.post(Host + '/admin/walletLog/page/'+offset+'/'+pageSize,obj);

export const getEntryList = (offset, pageSize,obj) => axios.post(Host + '/admin/walletTakeLog/page/'+offset+'/'+pageSize,obj);

export const getExistList = (offset, pageSize,obj) => axios.post(Host + '/admin/walletTakeLog/page/'+offset+'/'+pageSize,obj);