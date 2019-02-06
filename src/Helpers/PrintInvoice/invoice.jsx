import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';
const { Header, Footer, Content } = Layout;
import { Tabs, Icon, Layout, Button } from 'antd';
export default class Invoice extends React.Component {
    render() {

        const columns = [
            {
                title: 'Item', dataIndex: 'name', key: 'name', width: '40%',
                render: text => <h3>{text}</h3>
            },
            {
                title: 'Quantity', dataIndex: 'quantity', key: 'quantity', width: '15%',
                render: text => <h3>{text}</h3>
            },
            {
                title: 'MRP (1 item)', dataIndex: 'mrp', key: 'mrp', width: '15%',
                render: text => <h3>₹ {text}</h3>
            },
            {
                title: 'Total', key: 'total', dataIndex: 'total', width: '20%',
                render: text => <h3>₹ {text}</h3>
            },
        ]// This the column schema

        return (
            <div className="demo-infinite-container">
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
                                <div className='inBold'> Billed To  </div>
                                <div> Neeraj Kumar Mishra</div>
                                <div> MG Chowk, Dhaka</div>
                                <div> 8340289040</div>
                            </div>
                            <div style = {{width: 'auto', float: 'right', marginRight: '18px'}}>
                                Current Date
                            </div>
                        </Header>
                        <Content>

                        </Content>
                        <Footer style ={{padding: 10, marginTop: 10}}>
                            <h3>Total Bill</h3>
                        </Footer>
                    </Layout>
                </InfiniteScroll>
            </div>

            // <div>
            //     <InfiniteScroll
            //         initialLoad={false}
            //         pageStart={0}
            //         useWindow={false}
            //     >
            //         <div id="container">
            //             <section id="memo">
            //                 <div class="logo" >
            //                     <img
            //                         style={{ height: '40px', width: 'auto' }}
            //                         src="../../../assets/logo.png"></img>
            //                 </div>
            //                 <div class="company-info">
            //                     <div> Zoya Steel and Furniture.  </div>
            //                     <div> Address</div>
            //                     <div>Bihar, Zip code</div>
            //                     <div>Phone Number</div>
            //                     <div>emailId</div>
            //                 </div>
            //                 <div class="payment-info">
            //                     <div>GST Number</div>
            //                 </div>
            //                 <div>
            //                     <span>Date: </span>
            //                     <span>issue_date</span>
            //                 </div>
            //             </section>
            //             <div class="memo-line"></div>
            //             <div class="memo-line"></div>
            //             <section id="payment-info">
            //                 <span>bill_to_label</span>
            //                 <div>
            //                     <span> Person Name </span>
            //                 </div>

            //                 <div>
            //                     <span> Person Address </span>
            //                 </div>

            //                 <div>
            //                     <span> Person Phone Number </span>
            //                 </div>
            //             </section>

            //             <div class="clearfix"></div>

            //             <section id="items">

            //                 <table cellpadding="0" cellspacing="0">

            //                     <tr>
            //                         <th>  </th>
            //                         <th> Item </th>
            //                         <th> Quantity </th>
            //                         <th> Price </th>
            //                         <th> Tax </th>
            //                         <th> Something </th>
            //                         <th> Total</th>
            //                     </tr>

            //                     <tr data-iterate="item">
            //                         <td> 0</td>
            //                         <td>
            //                             <span class="show-mobile"> 0 </span> <span> 0 </span>
            //                         </td>
            //                         <td><span class="show-mobile"> 0 </span> <span> 0 </span></td>
            //                         <td><span class="show-mobile"> 0 </span> <span> 0 </span></td>
            //                         <td><span class="show-mobile"> 0 </span> <span> 0 </span></td>
            //                         <td><span class="show-mobile"> 0 </span> <span> 0 </span></td>
            //                         <td><span class="show-mobile"> 0 </span> <span> 0 </span></td>
            //                     </tr>

            //                 </table>

            //             </section>

            //             <section id="sums">

            //                 <table cellpadding="0" cellspacing="0">
            //                     <tr>
            //                         <th> amount_subtotal_label </th>
            //                         <td> amount_subtotal </td>
            //                     </tr>

            //                     <tr data-iterate="tax">
            //                         <th> tax_name </th>
            //                         <td> tax_value </td>
            //                     </tr>

            //                     <tr class="amount-total">
            //                         <th> amount_total_label </th>
            //                         <td> amount_total </td>
            //                     </tr>
            //                     <tr data-hide-on-quote="true">
            //                         <th> amount_paid_label </th>
            //                         <td> amount_paid </td>
            //                     </tr>

            //                     <tr data-hide-on-quote="true">
            //                         <th> amount_due_label </th>
            //                         <td> amount_due </td>
            //                     </tr>

            //                 </table>

            //             </section>

            //             <div class="clearfix"></div>

            //             <section id="terms">

            //                 <span> terms_label </span>
            //                 <div> terms </div>

            //             </section>
            //         </div>
            //     </InfiniteScroll>
            // </div>
        )
    }
}
