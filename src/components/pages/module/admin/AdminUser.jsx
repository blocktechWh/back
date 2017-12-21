import React from 'react';
import { Table, Modal,Button , message,Popconfirm,Select,Input,DatePicker,Switch } from 'antd';
import { users,addUsers ,updateStatus,deletesUser} from '../../../../axios';
import  FormWithModal  from './AdminUserEditModal';
import { formatTime } from '../../../../utils/FormatUtils.js';
const RangePicker = DatePicker.RangePicker;
export default class AdminUser extends React.Component {
    state = {
        data: [],
        pagination: {
	       	showTotal:total => `共 ${total} 条`,
	      	showSizeChanger: true,
		    showQuickJumper:true,	
		 	total:50,
		    onShowSizeChange: (current, pageSize) => {},
		    defaultPageSize:false,   	
        },
        loading: false,
        pageParms: {},
        edtingUserData:{}
    }

    fetchData(offset,pageSize,sortField,sortOrder){
        this.setState({ loading: true });
        let pageParms=this.state.pageParms;
        users(offset,pageSize,sortField,sortOrder).then( res => {
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
//      this.fetchData(pagination.current,pagination.pageSize);
          this.fetchData(pagination.current,pagination.pageSize,sorter.field,sorter.order == "ascend"?true : false);
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
        let isAdd=edtingUserData.id?false:true;
        edtingUserData.password="";
        debugger
        this.form.setFieldsValue(edtingUserData);
        this.setState({
            visible: true,
            isAdd:isAdd,
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
                    loading: false,
                    
                   
                    
                  
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
      onDateChange(dates, dateStrings) {
        console.log('From: ', dates[0], ', to: ', dates[1]);
        console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
        this.state.pageParms.startTime=dateStrings[0];
        this.state.pageParms.endTime=dateStrings[1];
    }



    render() { 
        let that=this;
     
//      const btnStyle1={
//      	background:'#cd2525',
//      	border:'none',
//     		
//      }
//    const btnStyle2={       	
//      	background:'#1d90e3',
//      	border:'none',      		
//      }
        const columns = [{
            title: '编号',
            dataIndex: 'id',
            render: text => <a>{text}</a>,
             sorter: true,
        },  {
            title: '姓名',
            dataIndex: 'username',
            sorter: true,
        },
            {
                title: '昵称',
                dataIndex: 'nickname',
                sorter: true,
            },
            {
            title: '手机号',
            dataIndex: 'phone',
            sorter: true,
        }, {
                title: '邮件',
                dataIndex: 'email',
                sorter: true,
            },
            {
            title: '注册时间',
            dataIndex: 'createtimeString',
            render:time=>formatTime(new Date(time)),
            sorter: true,
            className:'ssr',
        },{
            title: '最后状态时间',
            dataIndex: 'updatetimeString',
             render:time=>formatTime(new Date(time)),
            sorter: true,
           
        },{
            title: '操作',
            key: 'operation',
            render(userData, item) {
                let edit = <Button type="primary" onClick={function(){that.handleCollect(userData)}}>编辑</Button>;
                let deleteUserDiv =
                    <Popconfirm placement="topRight" title="确认要删除吗？" onConfirm={function(){that.deleteUser(userData)}} okText="确认" cancelText="取消">
                        <Button type="primary" style={{background:'#d1d1d1',border:'none'}}>删除</Button>
                    </Popconfirm>;
              
                return <div> {edit} {userData.id!==1?deleteUserDiv:null}</div>
            }
        },{
            title: '操作2',
            key: 'operation1',
            render(userData, item) {
             
//
//              let statusBut = <Button type="primary" style={(userData.status==="y"?btnStyle2:btnStyle1)} onClick={function(){that.chageStatus(userData)}} >{(userData.status==="y"?"启用":"禁用")}</Button>;
                 let statusBut =  <Switch checkedChildren="开"  unCheckedChildren="关"  onChange={function(){that.chageStatus(userData)}} checked={(userData.status==="y"?'':'checked')}  />
                return <div> {statusBut} </div> 
            },
              filters: [{
			    text: '启用',	
			    value: 'y',
			  }, {
				    text: '禁用',
				    value: 'n',
			  }],
  				filterMultiple: false,

       		 }];

        const { data } = this.state;

        return (
            <div>
                <div className="module-search">
                    <div className="module-search-right">
                                  <Button type="primary" onClick={this.handleCollect.bind(this,{})}>新增</Button>
                                  <Button type="primary"  icon="search"  onClick={this.search.bind(this,{})}>查询</Button>
              
                        <Input placeholder="用户名"  onChange={this.handleSelectChange.bind(that,"username")}/>
                        <Input placeholder="手机号"  onChange={this.handleSelectChange.bind(that,"phone")}/>
                        <Select defaultValue=""      onChange={this.handleSelectChange.bind(that,"status")}>
                            <Option value="">全部</Option>
                            <Option value="y">启用</Option>
                            <Option value="n">禁用</Option>
                        </Select>
                          <RangePicker showTime format="YYYY-MM-DD HH:mm:ss" onChange={this.onDateChange.bind(this)}/>

                    </div>
                 
                </div>

		         <FormWithModal  visible={this.state.visible} ref={this.saveFormRef}  isAdd={this.state.isAdd} handleCancel={this.handleCancel}
		 		handleCreate={this.handleOk.bind(this)} />
					<div>
                    <Table
                        ref="table"
                        columns={columns}
                        dataSource={data}
//                      bordered
                        loading={this.state.loading}
                        pagination={this.state.pagination}
                        onChange={this.handleTableChange.bind(this)}/>
                </div>
            </div>
        )
    }
}

