import React, { Component } from 'react';
import {Line} from 'react-chartjs-2';
import moment from 'moment';

class Graph extends Component {
  render() {
    let options = {
      legend: {
        display: false
      }
    }

    if (this.props.data) {
      const data = {
        labels: this.props.data.map((point) => moment(point.date).format('MMM YYYY')),
        datasets: [
          {
            data: this.props.data.map((point) => point.value),
            lineTension: 0.1
          }
        ]
      }
      return (
        <Line data={data} options={options}/>
      )
    } else {
      return null
    }
  }
}

export default Graph
