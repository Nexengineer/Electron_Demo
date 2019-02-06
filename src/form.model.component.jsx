import React from 'react';
import { Input, Form, Icon, Table, Button } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';
import Database from "./Helpers/dbhelper";
import _ from 'lodash';

class AddItemForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
        }
        this.icons = {
            edit: <Icon type="edit" style={{ color: 'rgba(0,0,0,.25)' }} />,
        };
        this.onChangeInputValue = this.onChangeInputValue.bind(this);
    }

    componentDidMount() {
        let dbHandlerTemp = new Database('stock')
        dbHandlerTemp.find({}).then((docs) => {
            console.log(docs)
            this.setState({
                data: docs
            })
        });
    }
    componentWillMount (){
        let dbHandlerTemp = new Database('stock')
        dbHandlerTemp.find({}).then((docs) => {
            console.log(docs)
            this.setState({
                data: docs
            })
        });
    }

    onChangeInputValue(textValue) {
        console.log(textValue.target.value)
        let searchedArr;
        let searchString = textValue.target.value;
        if (searchString !== '') {
            var results = _.filter(this.state.data, function (obj) {
                return obj.item.toLowerCase().indexOf(searchString.toLowerCase()) > -1;
            });
            console.log(results);
            searchedArr = results;
        } else {
            searchedArr = dataSource;
        }
        this.setState({
            data: searchedArr
        })
    }

    render() {
        // Columns Structure 
        const columns = [
            {
                title: 'Item', dataIndex: 'name', key: 'name', width: '50%',
                render: text => <h3>{text}</h3>
            },
            {
                title: 'MRP (1 item)', dataIndex: 'mrp', key: 'mrp', width: '25%',
                render: text => <h3>₹ {text}</h3>
            },
            {
                title: 'Action', key: 'action', width: '25%', render: (r) => {
                    return (
                        <Button
                            type='primary'
                            icon="plus"
                            onClick={e => this.props.handleAdd(e, r)}> Add </Button>
                    );
                }
            }
        ]

        return (
            <div>
                <Form layout="vertical">
                    <Form.Item>
                        <Input
                            prefix={this.icons.edit}
                            placeholder='Items Name'
                            onChange={value => this.onChangeInputValue(value)} />
                    </Form.Item>
                </Form>
                <div className="demo-infinite-container">
                    <InfiniteScroll
                        initialLoad={false}
                        pageStart={0}
                        useWindow={false}
                    >
                        <Table
                            columns={columns}
                            dataSource={this.state.data}
                            pagination={false}
                            scroll={{ y: true }}
                            bordered
                            size="middle"
                            style={{ backgroundColor: 'white' }} />
                    </InfiniteScroll>
                </div>
            </div>
        )
    }
}

export default AddItemForm;