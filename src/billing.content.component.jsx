import React from 'react';
import {Button, Table, Popconfirm, Modal, message, Row, Col} from 'antd';
import AddItemsForm from './form.model.component';
import dataSource from './Helpers/constant'
class BillingContent extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            modalOpenAdd: false,
            modalOpenPrint: false,
            itemsAdded: [],
            totalAmount: 0.0
        };
        this.handleAdd = this.handleAdd.bind(this);
        this.handleCancel = this.handleCancel.bind(this);

    }// constructor  for this class.

    componentDidMount() {
        this.setState({
            itemsAdded: dataSource
        })
    }

    handleAdd(){
        console.log('add item pressed');
    }// Callback handler for the Add Button.

    handleCancel(){
        this.setState({
            modalOpenAdd: false
        })
    }// Callback handler for  the cancel Button.

    render(){
        const onDeleteRow = (event, record) => {
            console.log(record);
            event.stopPropagation();
           // record.erase();
        } // This is when delete is pressed 

        const columns = [
            {title: 'Item', dataIndex: 'item', key: 'item', width: '20%',
                render: text => <h3>{text}</h3>},
            {title: 'Quantity', dataIndex: 'quantity', key: 'quantity',width: '20%', 
                render: (text) => {
                    return(
                        <Row gutter={8}>
                            <Col span={8}>
                                <Button type="danger"
                                    shape="circle"
                                    icon="minus"
                                />
                            </Col>
                            <Col span={8}>
                                <h3>{text}</h3>
                            </Col>
                            <Col span={8}>
                                <Button type="primary"
                                    shape="circle"
                                    icon="plus"
                                    />
                            </Col>
                        </Row>        
                    )}
            },
            {title: 'MRP (1 item)', dataIndex: 'mrp', key: 'mrp', width: '20%',
                render: text => <h3>₹ {text}</h3>},
            {title: 'Total', key: 'total',dataIndex: 'total', width: '20%',
                render: text => <h3>₹ {text}</h3>},
            {title: 'Action', key: 'action',width: '20%', render: (r) => {
                return (
                        <div style = {{justifyContent: 'center', alignContent:'center'}}>
                        <Popconfirm title="Sure to delete?"
                                    onConfirm={e => onDeleteRow(e, r)}>
                            <Button type= 'danger'> Delete</Button>
                        </Popconfirm>
                        </div>
                    );
                }
            },
        ]// This the column schema

        return(
            <div className='Billing'>
                <div style = {{marginBottom: '12px'}}>
                    <Button
                        type= 'primary'
                        icon= 'plus-circle-o'
                        onClick ={()=>this.setState({ modalOpenAdd: true, })}>
                        Add Item
                    </Button>
                    <Button
                        type= 'danger'
                        icon= 'printer'
                        onClick ={()=>{}}
                        style = {{position: "absolute", right: '10px'}}>
                        Print
                    </Button>               
                </div>
                <Modal
                    title= 'Add Item'
                    visible = {this.state.modalOpenAdd}
                    okText= "Add"
                    onCancel= {this.handleCancel}
                    onOk ={this.handleAdd}>
                    <AddItemsForm
                        ref={form => (this.form = form)}
                        handleAdd = {this.handleAdd}/>
                </Modal>
                <div style ={{scroll: true}}>
                <Table 
                    columns={columns}
                    dataSource={this.state.itemsAdded}
                    pagination={false}
                    scroll={{ y: true}}
                    bordered
                    size="middle"
                    style={{ backgroundColor: 'white'}} />
                </div>
                

                <div style={{ marginTop: '24px', backgroundColor: 'green', padding: 10 }}>
                    <h2 style={{color: 'white'}}>Total: ₹ Not implemented</h2>
                </div>
            </div>
        )
    }
}

export default BillingContent;