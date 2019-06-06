import React from 'react';
import { Table, Icon } from 'antd';
import Database from '../../Helpers/dbhelper';

class ShowBought extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
        };

        this.icons = {
            profit: <Icon type="up-circle" theme="twoTone" twoToneColor="#52c41a" />,
            loss: <Icon type="down-circle" theme="twoTone" twoToneColor="#FF0000" />,
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
                title: 'Item', dataIndex: 'name', key: 'name', width: '20%',
                render: text => <h3>{text}</h3>
            },
            {
                title: 'Quantity Sold', dataIndex: 'quantity', key: 'quantity', width: '20%',
                render: text => <h3>{text}</h3>
            },
            {
                title: 'Actual Earning', dataIndex: 'actualEarning', key: 'actualEarning', width: '20%',
                render: text => <h3>₹ {text}</h3>
            },
            {
                title: 'Predicated Earning', dataIndex: 'predicatedEarning', key: 'predicatedEarning', width: '20%',
                render: text => <h3>₹ {text}</h3>
            },
            {
                title: 'Earning', key: 'items', width: '20%',
                render: (text, r) => {
                    return (
                        <h1>
                        {r.actualEarning - r.predicatedEarning > 0 ? this.icons.profit : this.icons.loss} ₹ {r.actualEarning - r.predicatedEarning}
                        </h1>
                    );
                }
            },
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
