import React from 'react';
import {Input, Form, Icon} from 'antd';

class AddModelStock extends React.Component {
    constructor(props) {
        super(props)

        this.state = {

        }

        this.icons = {
            mrp: <Icon type="tag" style={{ color: 'rgba(0,0,0,.25)' }} />,
            name: <Icon type="form" style={{ color: 'rgba(0,0,0,.25)' }} />,
            brand: <Icon type="form" style={{ color: 'rgba(0,0,0,.25)' }} />,
            actual_price: <Icon type="tag" style={{ color: 'rgba(0,0,0,.25)' }} />,
            quantity: <Icon type="edit" style={{ color: 'rgba(0,0,0,.25)' }} />,
            billNo: <Icon type="read" style={{ color: 'rgba(0,0,0,.25)' }} />,
        };

        this.confirmField = this.confirmField.bind(this);
        this.checkForNumber = this.checkForNumber.bind(this);
    }
    checkForNumber(rule, value, callback) {
        const form = this.props.form;
        if (isNaN(value)){
            callback('It should be a number.');
        } else {
            callback();
        }
    }

    confirmField(rule, value, callback){
        const form = this.props.form;
        if (value) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    }

    render(){
        const { getFieldDecorator } = this.props.form;
        return(
            <Form layout="vertical">
                <Form.Item>
                    {getFieldDecorator('name',{
                        rules:[{
                            required: true, message: 'Please enter the name.',
                        },{
                            validator: this.checkConfirm,
                        }],
                    })(
                        <Input prefix={this.icons.name} placeholder="Item Name" />
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('brand',{
                        rules:[{
                            required: true, message: 'Please enter the brand name.',
                        },{
                            validator: this.checkConfirm,
                        }],
                    })(
                        <Input prefix={this.icons.brand} placeholder="Brand Name" />
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('mrp',{
                        rules:[{
                            required: true, message: 'Please enter the MRP.',
                        },{
                            validator: this.checkForNumber,
                        }],
                    })(
                        <Input prefix={this.icons.mrp} placeholder="MRP" />
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('actual_price',{
                        rules:[{
                            required: true, message: 'Please enter the Actual Price.',
                        },{
                            validator: this.checkForNumber,
                        }],
                    })(
                        <Input prefix={this.icons.actual_price} placeholder="Actual Price" />
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('quantity',{
                        rules:[{
                            required: true, message: 'Please enter the Quantity.',
                        },{
                            validator: this.checkForNumber,
                        }],
                    })(
                        <Input prefix={this.icons.quantity} placeholder="Quantity" />
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('billNo',{
                        rules:[{
                            required: true, message: 'Please enter the Bill No.',
                        },{
                            validator: this.checkForNumber,
                        }],
                    })(
                        <Input prefix={this.icons.billNo} placeholder="Bill Number" />
                    )}
                </Form.Item>
            </Form>
        )
    }
}

export default Form.create()(AddModelStock);