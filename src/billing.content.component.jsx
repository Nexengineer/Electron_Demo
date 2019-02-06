import React from 'react';
import { Button, Table, Popconfirm, Modal, message,InputNumber, Row, Col } from 'antd';
import AddItemsForm from './form.model.component';
import dataSource from './Helpers/constant'
import InfiniteScroll from 'react-infinite-scroller';
import PrintForm from './print.form.modal.component';
import jsPDF from 'jspdf';
import { request } from 'https';
import Printer from '../src/Helpers/print';

// Testing Code
const ipc = require('electron').ipcRenderer


class BillingContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalOpenAdd: false,
            modalOpenPrint: false,
            showPrintAndReset: true,
            itemsAdded: [],
            totalAmount: 0.0,
            currentID: 0,

            // This is for handling GST Values
            gstChangeAllowed: false,
            cgstValue: 0,
            sgstValue: 0
        };
        this.handleAdd = this.handleAdd.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleIncQuatity = this.handleIncQuatity.bind(this);
        this.handleDescQuantity = this.handleDescQuantity.bind(this);
        this.handlePrint = this.handlePrint.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.onchangeCGST = this.onchangeCGST.bind(this);
        this.onchangeSGST = this.onchangeSGST.bind(this);
    }// constructor  for this class.

    componentDidMount() {
        // this.setState({
        //     itemsAdded: dataSource
        // })
    }

    // Func to handle Print
    handlePrint() {
        console.log("Printing will be done here");
        const name = this.form.state.name;
        const address = this.form.state.address;
        const phone = this.form.state.phone;
        if (name != '' && address != '' && phone != '') {


        }

        this.setState({
            modalOpenPrint: false
        })
        var doc = new jsPDF();

        doc.setFontSize(40);
        doc.text("Octonyan loves jsPDF", 35, 25);
        // Set the document to automatically print via JS

        Printer.print(doc, "My Name is neeraj")

        console.log(this.form)
    }

    handleReset() {
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
                arrTempdata[i].total = arrTempdata[i].amountAfterGST * arrTempdata[i].quantity;
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
                    arrTempdata[i].total = arrTempdata[i].total - arrTempdata[i].amountAfterGST;
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

        let gstChangeAllowed = arrData.length > 0 ? true : false
        this.setState({
            itemsAdded: arrData,
            gstChangeAllowed: gstChangeAllowed
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
        let mrpWithGstAdded = Number(record.mrp) + (Number(record.mrp) * this.state.cgstValue)/100 +
                            (Number(record.mrp) * this.state.sgstValue)/100 ;

        const obj = {
            name: record.brand + " " + record.name,
            quantity: 1,
            total: mrpWithGstAdded,
            id: record.hash,
            actualPriceTotal: Number(record.actual_price),
            mrp: Number(record.mrp),
            cgst: this.state.cgstValue,
            sgst: this.state.sgstValue,
            amountAfterGST: mrpWithGstAdded
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
    
    onchangeCGST(value){
        console.log(value);
        this.setState({
            cgstValue: value
        })
    }// Value Change in CGST

    onchangeSGST(value){
        console.log(value);
        this.setState({
            sgstValue: value
        })
    }// Value CHange in SGST

    render() {
        const onDeleteRow = (event, record) => {
            console.log(record);
            event.stopPropagation();
            let arrTemp = this.state.itemsAdded.filter(w => w.id !== record.id)
            this.calculateTotal(arrTemp);
        } // This is when delete is pressed 

        const columns = [
            {
                title: 'Item', dataIndex: 'name', key: 'name', width: '20%',
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
                title: 'CGST', key: 'CGST', width: '10%',
                render: text => <h3>{this.state.cgstValue}%</h3>
            },
            {
                title: 'SGST', key: 'SGST', width: '10%',
                render: text => <h3>{this.state.sgstValue}%</h3>
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
            <div className='rows'>
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
                        disabled={this.state.showPrintAndReset}
                        onClick={this.handleReset}
                        style={{ marginLeft: '10px' }}>
                        Reset
                    </Button>
                    <Button
                        type='danger'
                        icon='printer'
                        disabled={this.state.showPrintAndReset}
                        onClick={() => this.setState({ modalOpenPrint: true, })}
                        style={{ position: "absolute", right: '10px' }}>
                        Print
                    </Button>
                    <div className='row'>
                        <h3 className='gstvalue'>CGST</h3>
                        <InputNumber
                            defaultValue={0}
                            min={0}
                            max={50}
                            formatter={value => `${value}%`}
                            parser={value => value.replace('%', '')}
                            disabled={this.state.gstChangeAllowed}
                            onChange={this.onchangeCGST}
                        />
                    </div>
                    <div className='row'>
                        <h3 className='gstvalue'>SGST</h3>
                        <InputNumber
                            defaultValue={0}
                            min={0}
                            max={50}
                            formatter={value => `${value}%`}
                            parser={value => value.replace('%', '')}
                            disabled={this.state.gstChangeAllowed}
                            onChange={this.onchangeSGST}
                        />
                    </div>
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