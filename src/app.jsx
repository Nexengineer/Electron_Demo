
import React from 'react';
import { Tabs, Icon, Layout, Button } from 'antd';
const { Header, Footer, Content } = Layout;
import BillingContent from './billing.content.component';
import StockContent from './stock.content.component';

export default class App extends React.Component {
    render() {
        return (
            <Layout>
            <Header className="Header">
                <img style={{ marginTop: '10px', height: '40px', width: 'auto', float: 'left', marginRight: '18px' }}
                     src="../assets/logo.png"
                     alt="Bitcoin Logo" />
                <h3>Generic Billing System</h3>
            </Header>
            <Content>
                <div className="App">
                    <Tabs defaultActiveKey="2" style={{ padding: '16px' }}>
                        <Tabs.TabPane tab={<span><Icon type="shopping-cart" />Billing</span>} key="1">
                            <BillingContent />
                        </Tabs.TabPane>
                        <Tabs.TabPane tab={<span><Icon type="database" />Stocks</span>} key="2">
                            <StockContent />
                        </Tabs.TabPane>
                        <Tabs.TabPane tab={<span><Icon type="copy" />History</span>} key="3">
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