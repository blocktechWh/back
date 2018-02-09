import React from 'react';
import { Table, Modal,Button , message,Popconfirm,Select,Input,DatePicker,TreeSelect  } from 'antd';
import {fontUsers} from '../../../../axios';
const RangePicker = DatePicker.RangePicker;
const TreeNode = TreeSelect.TreeNode;
export default class BagList extends React.Component {
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
        edtingUserData:{},
        value: undefined,
    }

   onChange = (value) => {
    console.log(arguments);
    this.setState({ value });
  }
	
    fetchData(offset,pageSize){
        this.setState({ loading: true });
        let pageParms=this.state.pageParms;
        fontUsers(offset,pageSize,pageParms).then( res => {
            let list = [];
            const pagination = { ...this.state.pagination };
          
            if(res.code === '000' && res.data &&  res.data.list){
                res.data.list.map((item,index)=>{
                    return item.key = index;
                });
                list = res.data.list;
                console.log(list);
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

    onDateChange(dates, dateStrings) {
        console.log('From: ', dates[0], ', to: ', dates[1]);
        console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
        this.state.pageParms.startTime=dateStrings[0];
        this.state.pageParms.endTime=dateStrings[1];
    }

    render() {
        let that=this;
        const columns = [{
            title: '发送者',
            dataIndex: 'sendName',         
            render: text => <a>{text}</a>,
            sorter: true
        },  {
            title: '接收者',
            dataIndex: 'receiveName',
            sorter: true,
        },{
                title: '发送金额',
                dataIndex: 'giftAmount',
                sorter: true,
                className:'ssr'
            },
            {
            title: '时间',
            dataIndex: 'createTimeString',
            sorter: true,
        }];

        const { data } = this.state;

        return (
            <div>
                <div className="module-search">
                    <div className="module-search-right" >
                        <Button type="primary"  icon="search"  onClick={this.search.bind(this,{})}>查询</Button>
                        <RangePicker showTime format="YYYY-MM-DD HH:mm:ss" onChange={this.onDateChange.bind(this)} />
                        <Input placeholder="发送者名称"   onChange={this.handleSelectChange.bind(that,"senderName")} />
                        <Input placeholder="接受者名称"  onChange={this.handleSelectChange.bind(that,"receiveName")} />
                          <TreeSelect
			        		showSearch
					        style={{ width: 300 }}
					        value={this.state.value}
					        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
					        placeholder="Please select"
					        allowClear
					        multiple
					        treeDefaultExpandAll
					        onChange={this.onChange}
				     		 >
					        <TreeNode value="parent 1" title="parent 1" key="0-1">
					          <TreeNode value="parent 1-0" title="parent 1-0" key="0-1-1">
					            <TreeNode value="leaf1" title="my leaf" key="random" />
					            <TreeNode value="leaf2" title="your leaf" key="random1" />
					          </TreeNode>
					          <TreeNode value="parent 1-1" title="parent 1-1" key="random2">
					       <TreeNode value="sss" title={<b style={{ color: '#08c' }}>sss</b>} key="random3" />
					          </TreeNode>
					        </TreeNode>
					      </TreeSelect>
                    </div>
                </div>

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

