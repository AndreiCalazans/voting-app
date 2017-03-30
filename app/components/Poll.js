import React from 'react';
import axios from 'axios';



import Results from 'Results';
export var Poll = React.createClass({
  getInitialState: function() {
    return {
      options: null,
      showResult: false
    }
  },
  componentWillMount: function() {
    axios.get('/poll/'+this.props.params.question, {}).then((res) => {

      this.setState({options: res.data[0].options});
    }, (res) => {
      console.log('error', res);
    })
  },
  handleVote: function(e) {
    e.preventDefault();
    var inputs = document.getElementsByName('option');
    for (var i = 0 ; i < inputs.length ; i++) {
      if (inputs[i].checked) {
        axios.post('/vote' , {selected: inputs[i].value , question: this.props.params.question}).then((res) => {
          // if it is good render the result component;

            this.setState({
              showResult:true
            });


        }, (res) => {

        })
      }
    }

  },
  handleShowResults: function() {
    this.setState({showResult: true})
  },
  render() {
    var that = this;
    function renderOptions() {
      if(that.state.showResult) {
        return (
          <Results question={that.props.params.question}></Results>
        )
      } else {
        var options = that.state.options;
        if (options) {
          var counter = 0;
          return options.map((option) => {
            counter++
            return (
              <p className='z-depth-3 options' key={counter}>
                <input value={option.value} name="option" type="radio" id={'option'+counter} />
                <label htmlFor={'option'+counter}>{option.value}</label>
              </p>
            )
          })
        } else {
          return <p>Loading...</p>
        }
      }
    };
    function renderBtn() {
      if(!that.state.showResult) {
        return (
          <div className="row input-field poll-btns">
              <input onClick={that.handleVote} className="poll-btn btn waves-effect waves-light" type="submit" value='VOTE' name="action"/>
              <input onClick={that.handleShowResults} className="poll-btn btn waves-effect waves-light " type='buttom'  value='Results' name="action"/>
          </div>
        )
      }
    };
    return (
      <div className='row'>
        <div className="col m10 offset-m1">
          <div>
            <h1 className='center-align'>{this.props.params.question}?</h1>
          </div>
          <div>
            <form>
              {renderOptions()}

              {renderBtn()}

            </form>
          </div>
        </div>

      </div>
    )
  }
});


export default Poll;
