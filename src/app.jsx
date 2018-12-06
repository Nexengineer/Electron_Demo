
import React from 'react';
import { Tabs, Icon, Layout, Button } from 'antd';
const { Header, Footer, Content } = Layout;

export default class App extends React.Component {
    render() {
        return (
            <Layout>
            <Header className="Header">
                <img style={{ marginTop: '10px', height: '40px', width: 'auto', float: 'left', marginRight: '18px' }}
                     src="../assets/logo.png"
                     alt="Bitcoin Logo" />
                <h3>Zoya Steel and Furniture Billing System</h3>
            </Header>
            <Content>
                <div className="App">
                    <Tabs defaultActiveKey="2" style={{ padding: '16px' }}>
                        <Tabs.TabPane tab={<span><Icon type="line-chart" />Price Charts</span>} key="1">
                            {/* <StatsContent /> */}
                        </Tabs.TabPane>
                        <Tabs.TabPane tab={<span><Icon type="wallet" />Wallets</span>} key="2">
                            {/* <WalletsContent /> */}
                        </Tabs.TabPane>
                        <Tabs.TabPane tab={<span><Icon type="credit-card" />Payments</span>} key="3">
                            {/* <TransactionsContent /> */}
                        </Tabs.TabPane>
                    </Tabs>
                </div>
            </Content>

            <Footer>
                Developed by Neeraj Kumar Mishra
            </Footer>
        </Layout>
        );
    }
}