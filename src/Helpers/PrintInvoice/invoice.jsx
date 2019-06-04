import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';
const { Header, Footer, Content } = Layout;
import { Tabs, Icon, Layout, Button } from 'antd';
import Database from '../../Helpers/dbhelper';

export default class Invoice extends React.Component {

    constructor(props) {
        super(props);
        const date = new Date();

        const strDate = String(date.getDate()).padStart(2, '0') + '/' + String(date.getMonth() + 1).padStart(2, '0') + '/' + date.getFullYear();

        this.state = {
            date: strDate,
            item: {},
            showcontent: false
        };

        this.renderTableRows = this.renderTableRows.bind(this);

    }
    componentWillMount() {
        // Retreiving data from db
        new Database('sales').find({}).then((docs) => {
            new Database('sales').findUsingBillNo(docs.length).then((items) => {
                const doc = items[0];
                this.setState({
                    item: doc,
                    showcontent: true
                });
           });
        });
    }

    renderTableRows() {
        const rows = [];
        if (typeof (this.state.item) !== undefined) {
            console.log(this.state.item.itemsBought);
            this.state.item.itemsBought.forEach((obj) => {
                rows.push(
                    <tr>
                        <td>{obj.name}</td>
                        <td>{obj.cgst}</td>
                        <td>{obj.sgst}</td>
                        <td>{obj.mrp}</td>
                        <td>{obj.amountAfterGST}</td>
                        <td>{obj.quantity}</td>
                        <br />
                        <hr />
                    </tr>
                );
            });
        }
        return rows;   
    }


    render() {
        return (
            <div >
                <link rel="stylesheet" type="text/css" href="../../app.css" />
                <InfiniteScroll
                    initialLoad={true}
                    pageStart={0}
                    useWindow={false}>
                    <Layout>
                        <Header className="Header">
                            <img style={{ marginTop: '10px', height: '40px', width: 'auto', float: 'left', marginRight: '18px' }}
                                src="../../../assets/logo.png"
                                alt="Bitcoin Logo" />
                            <div className="company-info">
                                <div class='inBold'> Zoya Steel and Furniture.  </div>
                                <div class='inBold'> Main road, MG Chowk, Dhaka</div>
                                <div class='inBold'>Bihar, 845304</div>
                                <div class='inBold'>+91-9097585570, +91-8709705757, Email ID: xyz@gmail.com</div>
                            </div>
                            <div className="memo-line"></div>
                            <div className="company-info" style = {{marginTop: 5}}>
                                <div className='inBold' style={{padding: 10}}> Billed To  </div>
                                <div style={{paddingLeft: 10}}> {this.state.item.buyersName}</div>
                                <div style={{paddingLeft: 10}}> {this.state.item.buyersAddress}</div>
                                <div style={{paddingLeft: 10}}> {this.state.item.buyersPhoneNumber}</div>
                            </div>
                            <br />
                            <div style = {{width: 'auto', float: 'right', marginRight: '18px'}}>
                                {this.state.date}
                            </div>
                            <br />
                        </Header>
                        <br />
                        <Content>
                            <div>
                                <table className="zui-table">
                                <thead>
                                    <tr>
                                    <th>Name</th>
                                    <th>CGST</th>
                                    <th>SGST</th>
                                    <th>MRP</th>
                                    <th>Total</th>
                                    <th>Quantity</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.showcontent == true ? this.renderTableRows() : '<div></ div>'}
                                </tbody>
                                </table>
                            </div>
                        </Content>
                        <Footer style ={{padding: 10, marginTop: 10}}>
                            <h3>Total Bill: {this.state.item.totalAmount}</h3>
                        </Footer>
                    </Layout>
                </InfiniteScroll>
            </div>
        )
    }
}
