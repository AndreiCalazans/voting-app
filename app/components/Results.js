import React from 'react';
import axios from 'axios';

import Chart from 'chart.js';


var Results = React.createClass({
  getInitialState: function() {
    return {
      results: null
    }
  },
  componentWillMount:function() {
    axios.get('/poll/'+this.props.question, {}).then((res) => {
      this.setState({results: res.data[0].options});
      var ctx = this.refs.myChart;
      let labels = [];
      let data = [];
      this.state.results.forEach((each) => {
        labels.push(each.value);
        data.push(each.vote);
      });
      var myChart = new Chart(ctx, {
          type: 'bar',
          data: {
              labels: labels,
              datasets: [{
                  label: '# of Votes',
                  data: data,
                  backgroundColor: [
                      'rgba(255, 99, 132, 0.2)',
                      'rgba(54, 162, 235, 0.2)',
                      'rgba(255, 206, 86, 0.2)',
                      'rgba(75, 192, 192, 0.2)',
                      'rgba(153, 102, 255, 0.2)',
                      'rgba(255, 159, 64, 0.2)'
                  ],
                  borderColor: [
                      'rgba(255,99,132,1)',
                      'rgba(54, 162, 235, 1)',
                      'rgba(255, 206, 86, 1)',
                      'rgba(75, 192, 192, 1)',
                      'rgba(153, 102, 255, 1)',
                      'rgba(255, 159, 64, 1)'
                  ],
                  borderWidth: 1
              }]
          },
          options: {
              scales: {
                  yAxes: [{
                      ticks: {
                          beginAtZero:true
                      }
                  }]
              }
          }
      });
    }, (res) => {
      console.log('error', res);
    })
  },
  render() {

    return (
      <div>
    
        <canvas ref='myChart' id="myChart" width="400" height="400"></canvas>

      </div>
    )
  }
});

export default Results;
