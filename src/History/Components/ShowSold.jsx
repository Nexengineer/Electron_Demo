import React from 'react';
import {Table, Modal, Button } from 'antd';
import Database from '../../Helpers/dbhelper';
import ItemBoughtModel from '../Components/Models/ItemBoughtModel';

/*
Keywords: 
    billNo, buyersAddress, buyersName, buyersPhoneNumber,sellingDate, totalAmount, itemsBought
    actualPriceTotal, amountAfterGST, cgst, mrp, name, quantity, sgst, total
 */

class ShowSold extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showModel: false,
            dataAvaliable: false,
            data: [],
            selectedArray: []
        };

        this.handleViewItems = this.handleViewItems.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    componentWillMount() {
        new Database('sales').find({}).then((docs) => {
            docs.sort((a, b) => (a.billNo < b.billNo) ? 1 : -1);
            this.setState({
                data: docs,
                dataAvaliable: true,
                showDetailModel: false
            });
        });
    }

    handleViewItems(event, records) {
        console.log(event);
        console.log(records);
        this.setState({
            selectedArray: records.itemsBought,
            showModel: true
        });
    }

    handleCancel() {
        this.setState({
            showModel: false,
        });
    }

    render() {

        const columns = [
            {
                title: 'Bill No', dataIndex: 'billNo', key: 'billNo', width: '10%',
                render: text => <h3>{text}</h3>
            },
            {
                title: 'Buyer\'s Name', dataIndex: 'buyersName', key: 'buyersName', width: '20%',
                render: text => <h3>{text}</h3>
            },
            {
                title: 'Buyer\'s Address', dataIndex: 'buyersAddress', key: 'buyersAddress', width: '30%',
                render: text => <h3>{text}</h3>
            },
            {
                title: 'Buyer\'s Ph.No.', dataIndex: 'buyersPhoneNumber', key: 'buyersPhoneNumber', width: '20%',
                render: text => <h3>{text}</h3>
            },
            {
                title: 'View Items', key: 'items', width: '20%',
                render: (text, r) => {
                    return (
                        <Button type="primary"
                                id={text}
                                style={{width: '100%'}}
                                onClick={e => this.handleViewItems(e, r)}
                        >View</Button>
                    );
                }
            },

        ];

        return (
            <div className="demo-infinite-table-container">
                <Table
                    columns={columns}
                    dataSource={this.state.data}
                    pagination={false}
                    scroll={{ y: true }}
                    bordered
                    size="middle"
                    style={{ backgroundColor: 'white' }} />
                <Modal
                    title='Item Bought'
                    visible={this.state.showModel}
                    okText="OK"
                    onCancel={this.handleCancel}
                    onOk={this.handleCancel}>
                    <ItemBoughtModel
                        ref={form => (this.form = form)}
                        handleAdd={this.handleAdd}
                        itemsAdded={this.state.selectedArray} />
                </Modal>
            </div>
        );
    }
}

export default ShowSold
