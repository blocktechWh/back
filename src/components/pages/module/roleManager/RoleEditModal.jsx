// You should fork and save if you had updated this CodePend and want to send it to others.
// Note: antd.locales are only support by `dist/antd`
import React from 'react';
import { Tree } from 'antd';
import { Form, Modal,Input,Select } from 'antd';
const TreeNode = Tree.TreeNode;
import { addUsers,menu } from '../../../../axios';



class RegistrationForm extends React.Component {
    state = {
	data: [],
	treeData:[],  
    autoExpandParent: true, 
    selectedKeys: [],
  }
  

  componentWillReceiveProps(nextProps)
  {
	  this.fetchData(nextProps);
  }
  
  fetchData(nextProps){	    
	    console.log("role edit modal "+nextProps.edtingUserData.id);
        this.setState({ loading: true });
        menu().then( res => {     
            if(res.code === '000' && res.data ){
				
				 this.setState({
					treeData:res.data,
					visible: false,               
					loading: false,				

					});
            }
			
           
        });
    }
	
	
	
  onExpand = (expandedKeys) => {
    console.log('onExpand', arguments);
    // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  }
  onCheck = (checkedKeys) => {
    console.log('onCheck', checkedKeys);
    this.setState({ checkedKeys });
  }
  onSelect = (selectedKeys, info) => {
    console.log('onSelect', info);
    this.setState({ selectedKeys });
  }
   
   handleSubmit = (checkedKeys) => {
        console.log('onCheck', this.state.checkedKeys);
   
    }
	
  renderTreeNodes = (data) => {
    return data.map((item) => {
      if (item.children) {
        return (
          <TreeNode title={item.name} key={item.id} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode {...item} />;
    });
  }
  render() {
	let { visible,handleCancel } = this.props;
    return (
		<Modal
			visible={visible}
			title="分配权限"
			okText="确定"
			onOk={this.handleSubmit}
			onCancel={handleCancel}
		>
			<Tree
				checkable
				defaultExpandAll={true}
				onExpand={this.onExpand}
				
				autoExpandParent={this.state.autoExpandParent}
				onCheck={this.onCheck}
				checkedKeys={this.state.checkedKeys}
				onSelect={this.onSelect}
				
			  >
				{this.renderTreeNodes(this.state.treeData)}
			</Tree>
	  </Modal>
    );
  }
}

export default  Form.create()(RegistrationForm);
