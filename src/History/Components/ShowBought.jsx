import React from 'react';
import { Table } from 'antd';
import Database from '../../Helpers/dbhelper';

class ShowBought extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
        };
    }

    render() {
        new Database('stock_sold').find({}).then((docs) => {
            this.setState({
                data: docs,
            });
        });

        const columns = [
            {
                title: 'Item', dataIndex: 'name', key: 'name', width: '25%',
                render: text => <h3>{text}</h3>
            },
            {
                title: 'Quantity Sold', dataIndex: 'quantity', key: 'quantity', width: '25%',
                render: text => <h3>{text}</h3>
            },
            {
                title: 'Actual Earning', dataIndex: 'actualEarning', key: 'actualEarning', width: '25%',
                render: text => <h3>{text}</h3>
            },
            {
                title: 'Predicated Earning', dataIndex: 'predicatedEarning', key: 'predicatedEarning', width: '25%',
                render: text => <h3>{text}</h3>
            }
        ];

        return (
            <div className="demo-infinite-table-container">
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

export default ShowBought
