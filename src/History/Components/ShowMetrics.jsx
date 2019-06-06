import React from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { Input, Icon } from 'antd';
import Database from '../../Helpers/dbhelper';

const labels = ['Jan', 'Feb', 'Mar', 'April', 'May', 'Jun', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

class ShowMetrics extends React.Component {

    constructor() {
        super();

        // This is to save state
        this.state = {
            backUpData: [],
            chartsData: [],
            fullData: {}
        };

        this.icons = {
            edit: <Icon type="edit" style={{ color: 'rgba(0,0,0,.25)' }} />,
        };

        // Binding function to enable this
        this.onGettingData = this.onGettingData.bind(this);
    }

    componentWillMount() {
        console.log('componentDidMount');
        // Retrieving every thing from DB
        new Database('stock_sold').find({}).then((docs) => {
            this.onGettingData(docs);
        });
    }

    componentDidMount(){
        console.log('componentDidMount');
    }

    onGettingData(docs) {
        for (let i = 0; i < docs.length; i += 1) {
            const doc = docs[i];
            
            const soldDateArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            for (let j = 0; j < doc.soldDates.length; j += 1) {
                soldDateArray[Number(doc.soldDates[j].date.getMonth()) - 1] += doc.soldDates[j].quantity;
            }
           
            const color = '#' + ( Math.random() * 0xFFFFFF << 0).toString(16);
            const dataSetObj = {
                label: doc.name,
                backgroundColor: color,
                borderColor: color,
                borderWidth: 1,
                hoverBackgroundColor: color,
                hoverBorderColor: color,
                data: soldDateArray
            };

            const temp = this.state.backUpData;
            temp.push(dataSetObj);
            this.setState({
                backUpData: temp,
            });
        }

        const tempFullData = this.state.fullData;
        tempFullData.labels = labels;
        tempFullData.datasets = this.state.backUpData;
        this.setState({
            fullData: tempFullData
        });

        console.log(this.state.backUpData);
    }

    render() {
        return (
            <div className='container'>
                <h2>Indepth Anlaysis</h2>
                        <Bar
                            data = {this.state.fullData}
                            width = {100}    
                            options={{
                                maintainAspectRatio: false
                            }}
                        />
            </div>
        );
    }
}

export default ShowMetrics