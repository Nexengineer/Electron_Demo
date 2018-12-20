import React from 'react';
import { Button, Table, Modal, Input, Icon, message } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';
import _ from 'lodash';
import {sha256} from 'js-sha256'

import Stock from './Helpers/StockDummy';
import AddModelStock from './StockModal/add.stock.model.component';
import Messages from './Helpers/messages';
import Database from "./Helpers/dbhelper";

const validateFormHashed = (form) => {
    return new Promise((res, rej) => {
        form.validateFields((err, values) => {
            res(values);
        });
    });
};


class StockContent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            arrStocks: [],
            modalIsOpenNewStock: false,
            modalIsOpenAddQuantity: false,
            modalChangeMRP: false,

        }

        this.icons = {
            edit: <Icon type="edit" style={{ color: 'rgba(0,0,0,.25)' }} />,
        };

        this.onChangeSearchStr = this.onChangeSearchStr.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleAddStock = this.handleAddStock.bind(this)
    }

    componentWillMount() {
        let dbHandlerTemp = new Database('stock')
        this.setState({
            arrStocks: Stock,
            dbHandler: dbHandlerTemp
        })
    }

    onChangeSearchStr(textValue) {
        console.log(textValue.target.value)
        let searchedArr;
        let searchString = textValue.target.value;
        if (searchString !== '') {
            var results = _.filter(this.state.arrStocks, function (obj) {
                return obj.name.toLowerCase().indexOf(searchString.toLowerCase()) > -1
                    || obj.brand.toLowerCase().indexOf(searchString.toLowerCase()) > -1;
            });
            console.log(results);
            searchedArr = results;
        } else {
            searchedArr = Stock;
        }
        this.setState({
            arrStocks: searchedArr
        })
    }

    handleAddStock() {
        this.form.validateFields((err, values) => {
            console.log(values)
            // Condition check for hidding the modal
            if (typeof values.name != 'undefined' && typeof values.brand != 'undefined' &&
                typeof values.mrp != 'undefined' && typeof values.actual_price != 'undefined' &&
                typeof values.quantity != 'undefined' && typeof values.billNo != 'undefined' &&
                isFinite(values.mrp) && isFinite(values.actual_price) && isFinite(values.billNo) &&
                isFinite(values.quantity)) {
                // Generating Hash to individually identify element (Using sha256)
                let hash = sha256(values.name.toLowerCase() + values.brand.toLowerCase()); 
                //Creating object to store in db
                const obj = {
                    name: values.name,
                    brand: values.brand,
                    mrp: values.mrp,
                    actual_price: values.actual_price,
                    quantity: values.quantity,
                    date_received: new Date(),
                    hash: hash
                }
                
                this.state.dbHandler.insert(obj).then(() => {
                    message.success(Messages.Messages.Stock.Created);
                    this.form.resetFields();
                    this.setState({
                        modalIsOpenNewStock: false
                    })
                }, (e) => {
                    message.success(Messages.Messages.Wallet.Failed);
                });
            }
        });
    }

    handleCancel() {
        this.setState({
            modalChangeMRP: false,
            modalIsOpenAddQuantity: false,
            modalIsOpenNewStock: false
        })
    }




    render() {
        const column = [
            {
                title: 'Name', dataIndex: 'name', key: 'name', width: '15%',
                render: text => <h3>{text}</h3>
            },
            {
                title: 'Brand', dataIndex: 'brand', key: 'brand', width: '15%',
                render: text => <h3>{text}</h3>
            },
            {
                title: 'MRP', dataIndex: 'mrp', key: 'mrp', width: '15%',
                render: text => <h3>₹ {text}</h3>
            },
            {
                title: 'Actual Price', dataIndex: 'actual_price', key: 'actual_price', width: '15%',
                render: text => <h3>₹ {text}</h3>
            },
            {
                title: 'Quantity', dataIndex: 'quantity', key: 'quantity', width: '15%',
                render: text => <h3> {text}</h3>
            },
            {
                title: 'Edit', key: 'action', width: '25%', render: (r) => {
                    return (
                        <div>
                            <Button
                                type='dashed'
                                icon="plus">
                                Edit Quantity
                            </Button>
                            <h1></h1>
                            <Button
                                type='dashed'
                                icon="tags">
                                Edit MRP
                            </Button>
                        </div>

                    );
                }
            }
        ]
        return (
            <div className='Billing'>
                <div style={{ marginBottom: '12px' }}>
                    <Button
                        type='primary'
                        icon='plus-circle-o'
                        onClick={() => { this.setState({ modalIsOpenNewStock: true }) }}>
                        Add New Item
                    </Button>
                    <div style={{ marginTop: '12px' }}>
                        <Input
                            prefix={this.icons.edit}
                            placeholder='Search item'
                            onChange={value => this.onChangeSearchStr(value)} />
                    </div>
                </div>
                {/* Add Modal for New Item */}
                <Modal
                    title='Add New Item Stock'
                    visible={this.state.modalIsOpenNewStock}
                    okText="Add"
                    onCancel={this.handleCancel}
                    onOk={this.handleAddStock}>
                    <AddModelStock
                        ref={form => (this.form = form)}
                        handleAddStock={this.handleAddStock} />
                </Modal>
                {/*------------------------*/}
                <div className="demo-stock-container">
                    <InfiniteScroll
                        initialLoad={false}
                        pageStart={0}
                        useWindow={false}
                    >
                        <Table
                            columns={column}
                            dataSource={this.state.arrStocks}
                            pagination={false}
                            scroll={{ y: true }}
                            bordered
                            size="middle"
                            style={{ backgroundColor: 'white' }} />
                    </InfiniteScroll>
                </div>
                {/* Add Model for Edit Quantity */}
                {/* Add Model for Edit MRP */}

            </div>
        )
    }
}


export default StockContent;