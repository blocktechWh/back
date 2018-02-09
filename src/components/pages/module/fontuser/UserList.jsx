import React from 'react';
import { Table, Modal,Button , message,Popconfirm,Select,Input ,Pagination} from 'antd';
import { fontUsersName,addUsers ,updateStatus,deletesUser} from '../../../../axios';
import  FormWithModal  from './UserEditModal.jsx';
import { formatTime } from '../../../../utils/FormatUtils.js';
export default class User extends React.Component {
 
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
        fontUsersName(offset,pageSize,sortField,sortOrder).then( res => {
            let list = [];
          
            let totals=res.data.total;	
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
		console.log(sorter)
		
        this.setState({ pagination: pagination});
//      this.fetchData(0,10,sorter.field,sorter.order == "ascend"?true : false);
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
                this.fetchData(0,10);
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
		console.log(this)
        const columns = [{
            title: '姓名',
            dataIndex: 'name',
			sorter:true,
        },

            {
            title: '手机号',
            dataIndex: 'phone',
            sorter:true,
        },  {
                title: '性别',
                dataIndex: 'sex',
                render: text => text===1?<div>男</div>:<div>女</div>,
                sorter:true,
           },
        ,
        {
            title: '注册时间',
            dataIndex: 'createTime',
			render:time=>formatTime(new Date(time)),
			sorter:true,
			sorter:true,
        },{
            title: '最后状态时间',
            dataIndex: 'updateTimeString',
            sorter:true,
        }

        ];

        const { data } = this.state;

  

		
        return (
            <div>
                <div className="module-search">
                    <div className="module-search-right" >
                      <Button type="primary" onClick={this.handleCollect.bind(this,{})}>新增</Button>
                        <Button type="primary"   icon="search"  onClick={this.search.bind(this,{})}>查询</Button>
                        <Input placeholder="用户名"   onChange={this.handleSelectChange.bind(that,"name")}/>
                        <Input placeholder="手机号"  onChange={this.handleSelectChange.bind(that,"phone")}/>
                        <Select defaultValue=""  onChange={this.handleSelectChange.bind(that,"status")}>
                            <Option value="">全部</Option>
                            <Option value="y">启用</Option>
                            <Option value="n">停用</Option>
                        </Select>

                    </div>
                
                </div>

               <FormWithModal  visible={this.state.visible} ref={this.saveFormRef}  handleCancel={this.handleCancel}
                               handleCreate={this.handleOk.bind(this)} />

                <div className="module-table">                
                    <Table
                        ref="table"
                        columns={columns}
                        dataSource={data}
                        bordered
                        loading={this.state.loading}
                        pagination={this.state.pagination}
                        onChange={this.handleTableChange.bind(this)} 
                      
				      />
				
 					
                </div>
            </div>
        )
    }

}


