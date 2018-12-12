import React from 'react';
import {Input, Form, Icon} from 'antd';

class AddItemForm extends React.Component {
    constructor(props) {
        super(props)
        this.icons = {
            edit: <Icon type="edit" style={{ color: 'rgba(0,0,0,.25)' }} />,
        };
    }

    render(){
        return(
            <Form layout="vertical">
                <Form.Item>
                    <Input prefix={this.icons.edit} placeholder='Items Name'/>
                </Form.Item>
            </Form>
        )
    }
}

export default AddItemForm;