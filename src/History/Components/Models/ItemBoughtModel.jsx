import React from 'react';
import { Table } from 'antd';

export default class ItemBoughtModel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.itemsAdded,
        };
    }

    render() {
        const columns = [
            {
                title: 'Item', dataIndex: 'name', key: 'name', width: '25%',
                render: text => <h3>{text}</h3>
            },
            {
                title: 'Quantity', dataIndex: 'quantity', key: 'quantity', width: '25%',
                render: text => <h3>₹ {text}</h3>
            },
            {
                title: 'MRP', dataIndex: 'mrp', key: 'mrp', width: '25%',
                render: text => <h3>₹ {text}</h3>
            },
            {
                title: 'Total', dataIndex: 'total', key: 'total', width: '25%',
                render: text => <h3>₹ {text}</h3>
            }
        ];
        return (
            <div className="demo-infinite-container">
                <Table
                    columns={columns}
                    dataSource={this.state.data}
                    pagination={false}
                    scroll={{ y: true }}
                    bordered
                    size="middle"
                    style={{ backgroundColor: 'white' }} />
            </div>      
        );
    }
}