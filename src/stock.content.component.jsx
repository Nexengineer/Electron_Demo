import React from 'react';
import { Button, Table, Modal, Input, Icon } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';

import Stock from './Helpers/StockDummy';

class StockContent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            arrStocks: [],
            modalIsOpenNewStock: false,
            modalIsOpenAddQuantity: false,
        }

        this.icons = {
            edit: <Icon type="edit" style={{ color: 'rgba(0,0,0,.25)' }} />,
        };

        this.onChangeSearchStr = this.onChangeSearchStr.bind(this);

    }

    componentWillMount() {
        this.setState({
            arrStocks: Stock
        })
    }

    onChangeSearchStr(textValue) {
        console.log(textValue.target.value)
    }


    render() {
        const column = [
            {
                title: 'Name', dataIndex: 'name', key: 'name', width: '15%',
                render: text => <h3>{text}</h3>
            },
            {
                title: 'Brand', dataIndex: 'brand', key: 'brand', width: '15%',
                render: text => <h3>{text}</h3>
            },
            {
                title: 'MRP', dataIndex: 'mrp', key: 'mrp', width: '15%',
                render: text => <h3>₹ {text}</h3>
            },
            {
                title: 'Actual Price', dataIndex: 'actual_price', key: 'actual_price', width: '15%',
                render: text => <h3>₹ {text}</h3>
            },
            {
                title: 'Quantity', dataIndex: 'quantity', key: 'quantity', width: '15%',
                render: text => <h3> {text}</h3>
            },
            {
                title: 'Edit', key: 'action', width: '25%', render: (r) => {
                    return (
                        <div>
                            <Button
                                type='dashed'
                                icon="plus">
                                Edit Quantity 
                            </Button>
                            <h1></h1>
                            <Button
                                type='dashed'
                                icon="tags">
                                Edit MRP 
                            </Button>
                        </div>

                    );
                }
            }
        ]
        return (
            <div className='Billing'>
                <div style={{ marginBottom: '12px' }}>
                    <Button
                        type='primary'
                        icon='plus-circle-o'
                        onClick={() => { }}>
                        Add New Item
                    </Button>
                    <div style={{ marginTop: '12px' }}>
                        <Input
                            prefix={this.icons.edit}
                            placeholder='Search item'
                            onChange={value => this.onChangeSearchStr(value)} />
                    </div>
                </div>
                {/* Add Modal for New Item */}
                <div className="demo-stock-container">
                    <InfiniteScroll
                        initialLoad={false}
                        pageStart={0}
                        useWindow={false}
                    >
                        <Table
                            columns={column}
                            dataSource={this.state.arrStocks}
                            pagination={false}
                            scroll={{ y: true }}
                            bordered
                            size="middle"
                            style={{ backgroundColor: 'white' }} />
                    </InfiniteScroll>
                </div>
                {/* Add Model for quantity Increase */}
            </div>
        )
    }
}


export default StockContent;