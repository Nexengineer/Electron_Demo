import React from 'react';
import {Button, Table, Popconfirm, Modal, message} from 'antd';
import AddItemsForm from './form.model.component';

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

    }

    handleAdd(){
        console.log('add item pressed');
    }

    handleCancel(){
        this.setState({
            modalOpenAdd: false
        })
    }

    render(){
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
            </div>
        )
    }
}

export default BillingContent;