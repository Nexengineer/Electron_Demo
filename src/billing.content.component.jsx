import React from 'react';
import { Button, Table, Popconfirm, Modal, message, Row, Col } from 'antd';
import AddItemsForm from './form.model.component';
import dataSource from './Helpers/constant'
import InfiniteScroll from 'react-infinite-scroller';

class BillingContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalOpenAdd: false,
            modalOpenPrint: false,
            itemsAdded: [],
            totalAmount: 0.0,
            currentID: 0
        };
        this.handleAdd = this.handleAdd.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleIncQuatity = this.handleIncQuatity.bind(this);
        this.handleDescQuantity = this.handleDescQuantity.bind(this);
        this.handlePrint = this.handlePrint.bind(this);
        this.handleReset = this.handleReset.bind(this);
    }// constructor  for this class.

    componentDidMount() {
        // this.setState({
        //     itemsAdded: dataSource
        // })
    }

    // Func to handle Print
    handlePrint(){
        console.log("Printing will be done here");
        this.setState({
            currentID: 0,
            itemsAdded: []
        })
    }

    handleReset(){
        console.log("Reset will be hadled here");
        this.setState({
            currentID: 0,
            itemsAdded: []
        })
    }

    // This code chunck is handling the increase and decrese in quantity
    handleIncQuatity(event, record) {
        let arrTempdata = this.state.itemsAdded;
        for (let i = 0; i < arrTempdata.length; i++) {
            if (arrTempdata[i].id == record.id) {
                arrTempdata[i].quantity = arrTempdata[i].quantity + 1;
                arrTempdata[i].total = arrTempdata[i].mrp * arrTempdata[i].quantity;
                break;
            }
        }
        this.calculateTotal(arrTempdata);
    }

    handleDescQuantity(event, record) {
        let arrTempdata = this.state.itemsAdded;
        for (let i = 0; i < arrTempdata.length; i++) {
            if (arrTempdata[i].id == record.id) {
                if (arrTempdata[i].quantity > 0) {
                    arrTempdata[i].quantity = arrTempdata[i].quantity - 1;
                    arrTempdata[i].total = arrTempdata[i].total - arrTempdata[i].mrp;
                    break;
                }
            }
        }
        this.calculateTotal(arrTempdata);
    }

    // This method will calculate the total sum
    calculateTotal(arrData) {
        console.log(arrData)
        console.log(this.state.itemsAdded)

        this.setState({
            itemsAdded: arrData
        })
        let tempSum = 0.0
        for (let i = 0; i < arrData.length; i++) {
            tempSum = tempSum + arrData[i].total

        }
        this.setState({
            totalAmount: tempSum
        })
        console.log(arrData)
        console.log(this.state.itemsAdded)
    }

    handleAdd(event, record) {
        console.log('add item pressed');
        console.log(event, record)
        let temp = this.state.currentID;
        let tempArr = this.state.itemsAdded;
        temp = temp + 1;
        record.quantity = 1;
        record.total = record.mrp;
        record.id = temp;
        tempArr.push(record);
        this.setState({
            currentID: temp,
            modalOpenAdd: false
        })
        this.calculateTotal(tempArr)

    }// Callback handler for the Add Button.

    handleCancel() {
        this.setState({
            modalOpenAdd: false
        })
    }// Callback handler for  the cancel Button.

    render() {
        const onDeleteRow = (event, record) => {
            console.log(record);
            event.stopPropagation();
            let arrTemp = this.state.itemsAdded.filter(w => w.id !== record.id)
            this.calculateTotal(arrTemp);
        } // This is when delete is pressed 

        const columns = [
            {
                title: 'Item', dataIndex: 'item', key: 'item', width: '40%',
                render: text => <h3>{text}</h3>
            },
            {
                title: 'Quantity', dataIndex: 'quantity', key: 'quantity', width: '15%',
                render: (text, r) => {
                    return (
                        <Row gutter={8}>
                            <Col span={8}>
                                <Button type="danger"
                                    shape="circle"
                                    icon="minus"
                                    id={text}
                                    onClick={e => this.handleDescQuantity(e, r)}
                                />
                            </Col>
                            <Col span={8}>
                                <h3>{text}</h3>
                            </Col>
                            <Col span={8}>
                                <Button type="primary"
                                    shape="circle"
                                    icon="plus"
                                    onClick={e => this.handleIncQuatity(e, r)}
                                />
                            </Col>
                        </Row>
                    )
                }
            },
            {
                title: 'MRP (1 item)', dataIndex: 'mrp', key: 'mrp', width: '15%',
                render: text => <h3>₹ {text}</h3>
            },
            {
                title: 'Total', key: 'total', dataIndex: 'total', width: '20%',
                render: text => <h3>₹ {text}</h3>
            },
            {
                title: 'Action', key: 'action', width: '10%', render: (r) => {
                    return (
                        <div style={{ justifyContent: 'center', alignContent: 'center' }}>
                            <Popconfirm title="Sure to delete?"
                                onConfirm={e => onDeleteRow(e, r)}>
                                <Button type='danger'> Delete</Button>
                            </Popconfirm>
                        </div>
                    );
                }
            },
        ]// This the column schema

        return (
            <div className='Billing'>
                <div style={{ marginBottom: '12px' }}>
                    <Button
                        type='primary'
                        icon='plus-circle-o'
                        onClick={() => this.setState({ modalOpenAdd: true, })}>
                        Add Item
                    </Button>
                    <Button
                        type='danger'
                        icon='reload'
                        onClick={this.handleReset}
                        style={{ marginLeft: '10px' }}>
                        Reset
                    </Button>
                    <Button
                        type='danger'
                        icon='printer'
                        onClick={this.handlePrint}
                        style={{ position: "absolute", right: '10px' }}>
                        Print
                    </Button>
                </div>
                <Modal
                    title='Add Item'
                    visible={this.state.modalOpenAdd}
                    okText="OK"
                    onCancel={this.handleCancel}
                    onOk={this.handleCancel}>
                    <AddItemsForm
                        ref={form => (this.form = form)}
                        handleAdd={this.handleAdd} />
                </Modal>
                <div className="demo-infinite-table-container">
                    <InfiniteScroll
                        initialLoad={false}
                        pageStart={0}
                        useWindow={false}
                    >
                        <Table
                            columns={columns}
                            dataSource={this.state.itemsAdded}
                            pagination={false}
                            scroll={{ y: true }}
                            bordered
                            size="middle"
                            style={{ backgroundColor: 'white' }} />
                    </InfiniteScroll>
                </div>
                <div style={{ marginTop: '24px', backgroundColor: 'green', padding: 10 }}>
                    <h2 style={{ color: 'white' }}>Total: ₹ {this.state.totalAmount}</h2>
                </div>
            </div>
        )
    }
}

export default BillingContent;