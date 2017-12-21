import React, { Component } from 'react';
import { Layout } from 'antd';
const { Content, Footer } = Layout;

class App extends Component {
    state = {
        showFooter: true
    }

    render() {
        const { showFooter } = this.state;
        const children = React.cloneElement(this.props.children,{
            hideFooter: ()=>{ this.setState({showFooter:false}) },
            showFooter: ()=>{ this.setState({showFooter:true}) }
        });
        return (
            <Layout>
                <Content style={{ overflow: 'initial', background: '#ececec' }}>
                    {children}
                </Content>
                { 
                    showFooter?
                    <Footer style={{ textAlign: 'center' }}>
                     
                    </Footer>: ''
                }
            </Layout>
        );
    }
}

export default App;
