import React from 'react';
import { Input, Form, Icon } from 'antd';

class UpdateQuantity extends React.Component {

    constructor(props) {
        super(props)
        this.checkForNumber = this.checkForNumber.bind(this);
    }

    checkForNumber(rule, value, callback) {
        const form = this.props.form;
        if (isNaN(value)) {
            callback('It should be a number.');
        } else {
            callback();
        }
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form layout="vertical">
                <Form.Item>
                    {getFieldDecorator('quantity', {
                        rules: [{
                            required: true, message: 'Please enter the Quantity.',
                        }, {
                            validator: this.checkForNumber,
                        }],
                    })(
                        <Input
                            prefix={<Icon type="edit" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Quantity" />
                    )}
                </Form.Item>
            </Form>
        )
    }

}

export default Form.create()(UpdateQuantity);
