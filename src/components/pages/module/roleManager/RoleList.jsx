import React from 'react';
import { Table, Modal,Button , message,Popconfirm,Select,Input,DatePicker } from 'antd';
import {getAllRoles} from '../../../../axios';
import  FormWithModal  from './RoleEditModal';

const RangePicker = DatePicker.RangePicker;
export default class RoleList extends React.Component {
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
        getAllRoles(offset,10,pageParms).then( res => {
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

    search(e) {
        this.fetchData(0, 10);
    }

     handleSelectChange(dataField,evt) {
         let value = evt && evt.target ? evt.target.value : evt;
         this.state.pageParms[dataField]= value;
         this.setState({});
    }
	
	handleCollect(edtingUserData) {
		console.log("edtingUserData id "+edtingUserData.id),
        
        this.setState({
            visible: true,
            
            edtingUserData
        });
    }
	
	handleCancel = (e) => {
        this.setState({
            visible: false,
        });
    }
	
	handleOk = (e) => {
        console.log(e);
        this.setState({ loading: true });
        let filedsValue=this.form.getFieldsValue();
        getAllRoles({id:this.state.edtingUserData.id,...filedsValue}).then( res => {
            let list = [];
            if(res.code === '000'){
                this.setState({
                    visible: false,
                    loading: false
                });
                this.fetchData(0, 10);
                message.success('分配权限成功！');
            }
            else {
                this.setState({
                    loading: false
                });
                message.error(res.msg);
            }
        });
    }
    onDateChange(dates, dateStrings) {
        console.log('From: ', dates[0], ', to: ', dates[1]);
        console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
        this.state.pageParms.startTime=dateStrings[0];
        this.state.pageParms.endTime=dateStrings[1];
    }

    render() {
        let that=this;
        const columns = [{
            title: '编号',
            dataIndex: 'id',
            render: text => <a>{text}</a>,
        },  {
            title: '角色名称',
            dataIndex: 'roleName',
        },
            {
            title: '角色描述',
            dataIndex: 'roleDesc'
        },{
            title: '操作',
            key: 'operation',
            render(userData, item) {
                let edit = <Button type="primary" onClick={function(){that.handleCollect(userData)}}>编辑</Button>;
                return <div> {edit} </div>
            }
        },{
            title: '操作2',
            key: 'operation2',
            render(userData, item) {
                let edit = <Button type="primary" onClick={function(){that.handleCollect(userData)}}>分配权限</Button>;
                return <div> {edit} </div>
            }
        }];

        const { data } = this.state;

        return (
            <div>
                <div className="module-search">
                    <div className="module-search-right" >
                        <Button type="primary"  icon="search"  onClick={this.search.bind(this,{})}>查询</Button>
                        <RangePicker showTime format="YYYY-MM-DD HH:mm:ss" onChange={this.onDateChange.bind(this)}/>
                        <Input placeholder="发送者名称"   onChange={this.handleSelectChange.bind(that,"senderName")}/>
                        <Input placeholder="接受者名称"  onChange={this.handleSelectChange.bind(that,"receiveName")}/>
                    </div>
                </div>
				
				<FormWithModal  visible={this.state.visible}  edtingUserData={this.state.edtingUserData} ref={this.saveFormRef}  handleCancel={this.handleCancel}
		 		handleCreate={this.handleOk.bind(this)} />
              

			  <div className="module-table" >
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

