import React from 'react';
import { Table, Modal,Button , message,Popconfirm,Select,Input } from 'antd';
import { users,addUsers ,updateStatus,deletesUser} from '../../../../axios';
import  SystemLogEditModal  from './SystemLogEditModal';

export default class User extends React.Component {
    state = {
        data: [],
        pagination: {},
        loading: false,
        pageParms: {},
        edtingUserData:{}
    }

    fetchData(offset){
        this.setState({ loading: true });
        let pageParms=this.state.pageParms;
        users(offset,10,pageParms).then( res => {
            let list = [];
            const pagination = { ...this.state.pagination };
            if(res.code === '000' && res.data &&  res.data.list){
                res.data.list.map((item,index)=>{
                    return item.key = index;
                });
                list = res.data.list;
                pagination.total = res.data.total;
            }
            this.setState({
                visible: false,
                data: list,
                loading: false,
                pagination
            });
        });
    }

    componentDidMount(){
        this.fetchData(0, 10);
    }

    handleTableChange(pagination, filters, sorter){
        this.setState({ pagination: pagination});
        this.fetchData(pagination.current,pagination.pageSize);
    }

    handleOk = (e) => {
        console.log(e);
        this.setState({ loading: true });
        let filedsValue=this.form.getFieldsValue();
        addUsers({id:this.state.edtingUserData.id,...filedsValue}).then( res => {
            let list = [];
            if(res.code === '000'){
                this.setState({
                    visible: false,
                    loading: false
                });
                this.fetchData(0, 10);
                message.success('保存用户信息成功！');
            }
            else {
                this.setState({
                    loading: false
                });
                message.error(res.msg);
            }
        });
    }

    handleCancel = (e) => {
        this.setState({
            visible: false,
        });
    }

    saveFormRef = (form) => {
        this.form = form;
    }

    handleCollect(edtingUserData) {
        this.form.resetFields();
        this.form.setFieldsValue(edtingUserData);
        this.form. setFieldsValue({isAdd:edtingUserData.id?false:true});
        this.setState({
            visible: true,
            edtingUserData
        });
    }

    deleteUser(edtingUserData) {
        this.setState({ loading: true });
        deletesUser(edtingUserData.id).then( res => {
            let list = [];
            if(res.code === '000'){
                message.success('删除成功！');
                this.setState({
                    loading: false
                });
                this.fetchData(0, 10);
            }
            else {
                message.error(res.msg);
            }
        });
    }

    search(e) {
        this.fetchData(0, 10);
    }


    chageStatus(edtingUserData) {
        let parmaObj={id:edtingUserData.id,status:(edtingUserData.status==="y"?"n":"y")};
        updateStatus(parmaObj).then( res => {
            let list = [];
            if(res.code === '000'){
                message.success('修改状态成功！');
                this.setState({
                    visible: false,
                    loading: false
                });
                this.fetchData(0, 10);
            }
            else {
                message.error(res.msg);
            }
        });
    }
     handleSelectChange(dataField,evt) {
         let value = evt && evt.target ? evt.target.value : evt;
         this.state.pageParms[dataField]= value;
         this.setState({});
    }


    render() {
        let that=this;
        const columns = [{
            title: '编号',
            dataIndex: 'id',
            render: text => <a>{text}</a>,
        },  {
            title: '姓名',
            dataIndex: 'username',
        },
            {
                title: '昵称',
                dataIndex: 'nickname',
            },
            {
            title: '手机号',
            dataIndex: 'phone',
        }, {
                title: '邮件',
                dataIndex: 'email',
            },
            {
            title: '会员状态',
            dataIndex: 'status',
            render: text => text==='y'?<div>正常</div>:<div>禁用</div>,
        },{
            title: '注册时间',
            dataIndex: 'createtimeString'
        },{
            title: '最后状态时间',
            dataIndex: 'updatetimeString'
        },{
            title: '操作',
            key: 'operation',
            render(userData, item) {
                let edit = <a href="javascript:void(0);" onClick={function(){that.handleCollect(userData)}}>编辑</a>;
                let deleteUserDiv =
                    <Popconfirm placement="topRight" title="确认要删除吗？" onConfirm={function(){that.deleteUser(userData)}} okText="确认" cancelText="取消">
                        <a href="javascript:void(0);">删除</a>
                    </Popconfirm>;
                let statusBut = <a href="javascript:void(0);" onClick={function(){that.chageStatus(userData)}}>{(userData.status==="y"?'禁用':"启用")}</a>;
                return <div> {edit} {statusBut} {userData.id!==1?deleteUserDiv:null}</div>
            }
        }];

        const { data } = this.state;

        return (
            <div>
                <div className="module-search">
                    <div className="module-search-right" >
                        <Button type="primary" icon="search"  onClick={this.search.bind(this,{})}>查询</Button>
                        <Input placeholder="用户名"   onChange={this.handleSelectChange.bind(that,"username")}/>
                        <Input placeholder="手机号"  onChange={this.handleSelectChange.bind(that,"phone")}/>
                        <Select defaultValue=""  onChange={this.handleSelectChange.bind(that,"status")}>
                            <Option value="">全部</Option>
                            <Option value="y">启用</Option>
                            <Option value="n">停用</Option>
                        </Select>

                    </div>
                    <div className="module-search-left">
                        <Button type="primary" onClick={this.handleCollect.bind(this,{})}>新增</Button>
                    </div>
                </div>

               <SystemLogEditModal  visible={this.state.visible} ref={this.saveFormRef}  handleCancel={this.handleCancel}
                               handleCreate={this.handleOk.bind(this)} />

                <div className="module-table">
                    <Table
                        ref="table"
                        columns={columns}
                        dataSource={data}
                        bordered
                        loading={this.state.loading}
                        pagination={this.state.pagination}
                        onChange={this.handleTableChange.bind(this)}/>
                </div>
            </div>
        )
    }
}

