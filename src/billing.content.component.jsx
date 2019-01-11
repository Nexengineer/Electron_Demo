import React from 'react';
import { Button, Table, Popconfirm, Modal, message, Row, Col } from 'antd';
import AddItemsForm from './form.model.component';
import dataSource from './Helpers/constant'
import InfiniteScroll from 'react-infinite-scroller';
import PrintForm from './print.form.modal.component';

class BillingContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalOpenAdd: false,
            modalOpenPrint: false,
            showPrintAndReset: true,
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
        const name = this.form.state.name;
        const address = this.form.state.address;
        const phone = this.form.state.phone;
        if (name != '' && address != ''&& phone != ''){
            this.setState({
                modalOpenPrint: false
            })
        }

        console.log(this.form)
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
                if (arrTempdata[i].quantity > 1) {
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
        let showPrint = tempSum > 0 ? false : true;
        this.setState({
            totalAmount: tempSum,
            showPrintAndReset: showPrint
        })
        console.log(arrData)
        console.log(this.state.itemsAdded)
    }

    handleAdd(event, record) {
        // A New record is created 
        const obj = {
            name : record.brand + " " +record.name,
            quantity: 1,
            total: Number(record.mrp),
            id: record.hash, 
            actualPriceTotal: Number(record.actual_price),
            mrp: Number(record.mrp)
        }

        // Here it is checked if the data is present or not
        let temp = -1;
        let tempArr = this.state.itemsAdded;
        for (let i = 0; i < tempArr.length; i++) {
            if (tempArr[i].id == record.hash) {
                temp = i;
                break;
            }
        }

        // If Not avaliable the new object is pushed
        if (temp == -1) {
            tempArr.push(obj);
        } else {
            // Other wise the quantity is increased
            this.handleIncQuatity(null, tempArr[temp]);
        }

        // Few lines are not effective now  
        this.setState({
            currentID: temp,
            modalOpenAdd: false
        })

        //The total Value is calculated
        this.calculateTotal(tempArr)

    }// Callback handler for the Add Button.

    handleCancel() {
        this.setState({
            modalOpenAdd: false,
            modalOpenPrint: false
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
                title: 'Item', dataIndex: 'name', key: 'name', width: '40%',
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
                        disabled= {this.state.showPrintAndReset}
                        onClick={this.handleReset}
                        style={{ marginLeft: '10px' }}>
                        Reset
                    </Button>
                    <Button
                        type='danger'
                        icon='printer'
                        disabled = {this.state.showPrintAndReset}
                        onClick={() => this.setState({ modalOpenPrint: true, })}
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
                <Modal
                    title='Additional Details'
                    visible={this.state.modalOpenPrint}
                    okText="OK"
                    onCancel={this.handleCancel}
                    onOk={this.handlePrint}>
                    <PrintForm
                        ref={form => (this.form = form)}
                        handlePrint={this.handlePrint} />
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