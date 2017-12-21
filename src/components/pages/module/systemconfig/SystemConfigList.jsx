import React from 'react';
import { Table, Modal,Button , message,Popconfirm,Select,Input } from 'antd';
import { systemConfList,systemConfUpdate ,systemConfDelete} from '../../../../axios';
import  SystemConfigModal  from './SystemConfigModal';

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
        systemConfList(offset,10,pageParms).then( res => {
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
        systemConfUpdate({id:this.state.edtingUserData.id,...filedsValue}).then( res => {
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
        systemConfDelete(edtingUserData.id).then( res => {
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
            title: '名字（key）',
            dataIndex: 'keyName',
        },
            {
                title: '值',
                dataIndex: 'value',
            },
            {
                title: '说明',
                dataIndex: 'remark',
            },{
            title: '操作',
            key: 'operation',
            render(userData, item) {
                let edit = <a href="javascript:void(0);" onClick={function(){that.handleCollect(userData)}}>编辑</a>;
                let deleteUserDiv =
                    <Popconfirm placement="topRight" title="确认要删除吗？" onConfirm={function(){that.deleteUser(userData)}} okText="确认" cancelText="取消">
                        <a href="javascript:void(0);">删除</a>
                    </Popconfirm>;
                return <div> {edit}  {deleteUserDiv}</div>
            }
        }];

        const { data } = this.state;

        return (
            <div>
                <div className="module-search">
                    <div className="module-search-right" >
                        <Button type="primary" icon="search"  onClick={this.search.bind(this,{})}>查询</Button>
                        <Input placeholder="说明"   onChange={this.handleSelectChange.bind(that,"remark")}/>
                        <Input placeholder="名字（key）"   onChange={this.handleSelectChange.bind(that,"keyName")}/>
                    </div>
                    <div className="module-search-left">
                        <Button type="primary" onClick={this.handleCollect.bind(this,{})}>新增</Button>
                    </div>
                </div>

               <SystemConfigModal  visible={this.state.visible} ref={this.saveFormRef}  handleCancel={this.handleCancel}
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

