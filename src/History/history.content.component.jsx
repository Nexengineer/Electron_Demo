import React from 'react';
import {Button, Icon } from 'antd';
import ShowSold from "../History/Components/ShowSold"
import ShowMetrics from "../History/Components/ShowMetrics"
import ShowBought from "../History/Components/ShowBought"


class HistoryContent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            // Data Model
            showSold: true, // This is for showwing the sold item
            showBuy: false, // This is for showing the bought item
            showMetrics: false, // This is for showing the graph
        };

        this.icons = {
            sold: <Icon type="container" style={{ color: 'rgba(0,0,0,.25)' }} />,
            buy: <Icon type="database" style={{ color: 'rgba(0,0,0,.25)' }} />,
            metrics: <Icon type="fund" style={{ color: 'rgba(0,0,0,.25)' }} />,
        };

        this.handleMetrics = this.handleMetrics.bind(this);
        this.handleSold = this.handleSold.bind(this);
        this.handleBuy = this.handleBuy.bind(this);
    }

    // Methods for handling the View interaction
    handleBuy() {
        this.setState({
            showBuy: true,
            showSold: false,
            showMetrics: false
        });
    }

    handleSold() {
        this.setState({
            showBuy: false,
            showSold: true,
            showMetrics: false
        });
    }

    handleMetrics() {
        this.setState({
            showBuy: false,
            showSold: false,
            showMetrics: true
        });
    }

    // render Method
    render() {
        let components = null;
        if (this.state.showBuy === true) {
            components = <ShowBought />;
        } else if (this.state.showMetrics === true) {
            components = <ShowMetrics />;
        } else {
            components = <ShowSold />;
        }

        return (
            <div className='rows'>
                <div style={{ marginBottom: '12px' }}>
                    <Button
                        type='primary'
                        icon='container'
                        onClick={this.handleSold}>
                        Show Sold Items
                    </Button>
                    <Button
                        type='primary'
                        icon= 'database'
                        onClick={this.handleBuy}
                        style={{ marginLeft: '10px' }}>
                        Show Bought Items
                    </Button>
                    <Button
                        type='danger'
                        icon= 'fund'
                        onClick={this.handleMetrics}
                        style={{ position: "absolute", right: '10px' }}>
                        Metrics
                    </Button>
                </div>
                <div className="demo-infinite-table-container">
                    {components}
                </div>
            </div>
        );
    }
}

export default HistoryContent;