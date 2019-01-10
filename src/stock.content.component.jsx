import React from 'react';
import { Button, Table, Modal, Input, Icon, message } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';
import _ from 'lodash';
import { sha256 } from 'js-sha256'

import Stock from './Helpers/StockDummy';
import AddModelStock from './StockModal/add.stock.model.component';
import UpdateQuantity from './StockModal/update.quantity.stock.modal.component';
import UpdateMRP from './StockModal/update.mrp.stock.modal.component';
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
            arrIntialStocks: [],
            selectedItem: null
        }

        this.icons = {
            edit: <Icon type="edit" style={{ color: 'rgba(0,0,0,.25)' }} />,
        };

        this.onChangeSearchStr = this.onChangeSearchStr.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleAddStock = this.handleAddStock.bind(this);
        this.handleIncreseQuantity = this.handleIncreseQuantity.bind(this);
        this.handleChangeMRP = this.handleChangeMRP.bind(this);
        this.refreshComponent = this.refreshComponent.bind(this);
    }

    componentWillMount() {
        let dbHandlerTemp = new Database('stock')
        dbHandlerTemp.find({}).then((docs) => {
            console.log(docs)
            this.setState({
                arrStocks: docs,
                dbHandler: dbHandlerTemp,
                arrIntialStocks:docs
            })
        });

    }
    refreshComponent(){
        this.state.dbHandler.find({}).then((docs) => {
            console.log(docs)
            this.setState({
                arrStocks: docs,
                arrIntialStocks:docs
            })
        });
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
            searchedArr = this.state.arrIntialStocks;
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
                var results = _.filter(this.state.arrStocks, function (obj) {
                    return obj.hash.indexOf(hash) > -1
                });
                if(results.length<=0) {
                    this.state.dbHandler.insert(obj).then(() => {
                        message.success(Messages.Messages.Stock.Created);
                        this.form.resetFields();
                        this.setState({
                            modalIsOpenNewStock: false
                        })
                        this.refreshComponent()
                    }, (e) => {
                        message.error(Messages.Messages.Stock.Failed);
                    });
                } else {
                    message.error(Messages.Messages.Stock.Error);
                }
            }
        }
        );
    }

    handleChangeMRP(){
        this.form.validateFields((err, values) => {
            console.log(values);
            if (isFinite(values.mrp)){
                this.state.dbHandler.updateMrp(this.state.selectedItem.hash,values.mrp)
                .then(()=>{
                    message.success(Messages.Messages.Update.Success);
                    this.form.resetFields();
                    this.setState({
                        modalChangeMRP: false,
                        selectedItem: null
                    })
                    this.refreshComponent()
                },(e) => {
                    message.error(Messages.Messages.Update.Failure);
                })
            }
        });
    }

    handleIncreseQuantity(){
        this.form.validateFields((err, values) => {
            let tempQuantity = Number(this.state.selectedItem.quantity) + Number(values.quantity)
            if (isFinite(values.quantity)){
                this.state.dbHandler.updateQuantity(this.state.selectedItem.hash , tempQuantity)
                .then(() => {
                    message.success(Messages.Messages.Update.Success);
                    this.form.resetFields();
                    this.setState({
                        modalIsOpenAddQuantity: false,
                        selectedItem: null
                    })
                    this.refreshComponent()
                }, (e) => {
                    message.error(Messages.Messages.Update.Failure);
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

        const openIncreaseQuantityModal = (event, record) => {
            this.setState({
                selectedItem: record,
                modalIsOpenAddQuantity: true,
            });
        };

        const openChangeMRPModal = (event, record) => {
            this.setState({
                selectedItem: record,
                modalChangeMRP: true,
            });
        }

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
                                icon="plus"
                                onClick={e => openIncreaseQuantityModal(e, r)}>
                                Edit Quantity
                            </Button>
                            <h1></h1>
                            <Button
                                type='dashed'
                                icon="tags"
                                onClick={e => openChangeMRPModal(e, r)}>
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
                <Modal
                    title='Add quantity'
                    visible={this.state.modalIsOpenAddQuantity}
                    okText="Add"
                    onCancel={this.handleCancel}
                    onOk={this.handleIncreseQuantity}>
                    <UpdateQuantity
                        ref={form => (this.form = form)}
                        handleIncreseQuantity={this.handleIncreseQuantity} />
                </Modal>
                {/*------------------------*/}

                {/* Add Model for Edit MRP */}
                <Modal
                    title='Change MRP'
                    visible={this.state.modalChangeMRP}
                    okText="Change"
                    onCancel={this.handleCancel}
                    onOk={this.handleChangeMRP}>
                    <UpdateMRP
                        ref={form => (this.form = form)}
                        handleChangeMRP={this.handleChangeMRP} />
                </Modal>
                {/*------------------------*/}

            </div>
        )
    }
}


export default StockContent;