import React from 'react';
import { Table, Modal,Button , message,Popconfirm,Select,Input,DatePicker } from 'antd';
import {fontUsers} from '../../../../axios';
const RangePicker = DatePicker.RangePicker;
export default class BagList extends React.Component {
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
        fontUsers(offset,10,pageParms).then( res => {
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
        },  {
            title: '接收者',
            dataIndex: 'receiveName',
        },{
                title: '发送金额',
                dataIndex: 'giftAmount',
            },
            {
            title: '时间',
            dataIndex: 'createTimeString'
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

