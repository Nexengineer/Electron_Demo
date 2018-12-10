import React from 'react';
import {Input, Form, Icon} from 'antd';

class AddItemFrom extends React.Component {
    constructor(props) {
        super(props)
        this.icons = {
            edit: <Icon type="edit" style={{ color: 'rgba(0,0,0,.25)' }} />,
        };
    }
    render(){
        const { getFieldDecorator } = this.props.form;
        return(
            <Form layout="vertical">
                <Form.Item>
                    {getFieldDecorator('name',{
                        rules:[{
                            required: true, message: 'Please Input the name',
                        }]
                    })(
                        <Input prefix={this.icons.edit} placeholder='Items Name'/>
                    )}
                </Form.Item>
            </Form>
        )
    }
}

export default AddItemFrom;