import React, { Component } from 'react';
import { Layout, Menu, Icon,Popconfirm, message,Button  } from 'antd';
import { Link } from 'react-router';
import { changePwd} from '../axios';
import PersoalInfo from './forms/PersoalInfo';
const { Item, SubMenu} = Menu
const { Content, Sider, Footer, Header } = Layout;

import { menu ,logout} from '../axios';
class Nav extends Component {
    state = {
        menu: [],
        visible:false,
        resourceId: -1,
        edtingUserData:{oldPassword:"",newPassword:""},
        selectedKeys: []
    }

    componentDidMount(){
        menu().then((res)=>{
			console.log(res)
            let data = res.data;
            let selectedKeys;
            if(data)
            {
                data.map((item)=>{
                    if(item.name){
                        item.icon = item.icon;
                        item.route = item.url;
                    }
                    if(item.route===this.props.location.pathname){
                        item.route = '';
                        selectedKeys = [item.id.toString()];
                    }
                    return item;
                });
                window._menu_=data;
                this.setState({ 'menu':data, 'selectedKeys':selectedKeys });
            }

        });
        this.props.hideFooter();
    }
    
    handleMenuClick(e){
        this.setState({ 'selectedKeys': e.key});
        var item= this.getArrayItemById(window._menu_,e.key);
        if(item){
            this.props.router.push(item.url);
        }
    }

    handleLoginOut(e){
        this.setState({
            loading: true
        });
        logout().then( res => {
            if(res.code === '000'){
                this.props.router.push('/');
                this.setState({
                    loading: false
                });
            }
            else {
                alert("handleLoginOut err！");
                this.setState({
                    loading: false
                });
            }
        })
    }

    getArrayItemById(myArray,id){
        let array=[];
        for (let value of myArray) {
             array.push(value);
             if(value.children) {
                 array= array.concat(value.children);
            }
        }
        for (let value of array) {
            if(value && value.id==id){
                return value;
            }
        }
        return null;
    }

    changePassword(e){
        this.form.resetFields();
        let edtingUserData=this.state.edtingUserData;
        this.form.setFieldsValue(edtingUserData);
        this.setState({
            visible: true,
            edtingUserData
        });
    }

    saveFormRef = (form) => {
        this.form = form;
    }
    handleCancel = (e) => {
        this.setState({
            visible: false,
        });
    }

    handleOk = (e) => {
        this.setState({ loading: true });
        let that=this;
        let filedsValue=this.form.getFieldsValue();
        changePwd(filedsValue) .then( res => {
                if(res.code === '000'){
                    this.setState({
                        visible: false
                    });
                    message.success('修改密码成功！');
                }
              else{
                    message.error(res.msg);
                }
            this.setState({ loading: false });
            });

    }



    render() {
        const { menu, resourceId, selectedKeys } = this.state;
        const menuRender = (mapData)=>{
            return mapData.map((item)=>{
                if(item.valid!=='1'){ return false; }
                if(item.children && item.children.length){
                    return (<SubMenu key={item.id} data={item} title={<span><Icon type={item.icon}/><span>{item.name}</span></span>}>
                        { menuRender(item.children) }
                        </SubMenu>);
                }else{
                    return (<Item key={item.id}><Link to={item.route}><Icon type={item.icon}/>{item.name}</Link></Item>);
                }
            });
        }
        const menus = menuRender(menu);
        const childrenWithResourceId = React.Children.map(this.props.children,(child)=>{
            return  React.cloneElement(child, {
                'resourceId': resourceId
            })
        });
        return (
            <Layout> 
                <Header style={{ background:'#1f90e6' }}>
                    <span style={{ color:'#fff' }}>您好，Admin</span>
                    <div style={{float:'right',width:80}}>
                        <PersoalInfo  visible={this.state.visible} ref={this.saveFormRef} handleCancel={this.handleCancel}
                                      handleCreate={this.handleOk.bind(this)}/>
                        <Button  style={{ marginLeft:-66,marginTop:19,width:65,paddingLeft:10}} type="dashed" onClick={this.changePassword.bind(this)}>修改密码</Button>
                        <Popconfirm placement="topRight" title="确认要退出系统吗？" onConfirm={this.handleLoginOut.bind(this)} okText="确认" cancelText="取消">
                            <Button  style={{marginTop:19,width:65,marginLeft:10}} type="dashed">退出</Button>
                        </Popconfirm>
                    </div>
                </Header>
                <Layout>
                    <Sider width={200}>
                        <Menu theme="dark" mode="inline" style={{ height: '100%' }} selectedKeys={selectedKeys}
                              defaultOpenKeys={[1,2,11]} onClick={this.handleMenuClick.bind(this)}>
                             { menus } 
                        </Menu>
                    </Sider>
                    <Content style={{ background: '#fff',overflow:'hidden' }}>
                        <Content style={{ height:'100%', paddingBottom:66, marginBottom:-66 }}>
                             { childrenWithResourceId } 
                        </Content>
                        <Footer style={{ textAlign: 'center',  bottom:'0', width:'100%' }}>
                           
                        </Footer>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

export default Nav;