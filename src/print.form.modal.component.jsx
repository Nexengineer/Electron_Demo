import React from 'react';
import { Input, Form, Icon } from 'antd';


class PrintForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            address: '',
            phone: ''
        }
        this.icons = {
            user: <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />,
            address: <Icon type="edit" style={{ color: 'rgba(0,0,0,.25)' }} />,
            phone: <Icon type="mobile" style={{ color: 'rgba(0,0,0,.25)' }} />,
        };
    }

    render() {
        return (
            <Form layout="vertical">
                <Form.Item>
                    <Input
                        prefix={this.icons.user}
                        placeholder='Person Name'
                        onChange={value => { this.setState({ name: value.target.value }) }} />
                </Form.Item>
                <Form.Item>
                    <Input
                        prefix={this.icons.address}
                        placeholder='Address'
                        onChange={value => { this.setState({ address: value.target.value }) }} />
                </Form.Item>
                <Form.Item>
                    <Input
                        prefix={this.icons.phone}
                        placeholder='Phone Number'
                        onChange={value => { this.setState({ phone: value.target.value }) }} />
                </Form.Item>
            </Form>
        )
    }
}

export default PrintForm;