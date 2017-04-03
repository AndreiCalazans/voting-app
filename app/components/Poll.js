import React from 'react';
import axios from 'axios';
import {browserHistory} from 'react-router';


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
  handleAddOption: function() {
    this.refs.optionForm.classList.remove('hide');
  },
  addOption: function(e) {
    e.preventDefault();
    // create a ajax call to add to current data;
    // you need to send the quesiton
    let newOption = {
      value: this.refs.new.value,
      vote:0
    };
    axios.post('update/options' , {question: this.props.params.question , newOption: newOption.value}).then(() =>{
      this.setState({
        options: [
          ...this.state.options,
          newOption
        ]
      });
      console.log('ok');
      this.refs.optionForm.classList.add('hide');
    }, ()=> { console.log('error');
  })
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
              <input onClick={that.handleShowResults} className="poll-btn btn waves-effect waves-light" type='button'  value='Results' name="action"/>
              <input onClick={that.handleAddOption} className="poll-btn btn waves-effect waves-light" type="button" value='add Option' name="action"/>
          </div>
        )
      }
    };
    let currentUrl = this.props.location.pathname;
// https://twitter.com/intent/tweet?hashtags=demo&original_referer=https%3A%2F%2Fdev.twitter.com%2Fweb%2Ftweet-button&ref_src=twsrc%5Etfw&related=twitterapi%2Ctwitter&text=Hello%20world&tw_p=tweetbutton&url=https%3A%2F%2Fexample.com%2Ffoo&via=twitterdev
    let currentUrlToTweet =`https://twitter.com/intent/tweet?hashtags=poll&original_referer=https%3A%2F%2Fdev.twitter.com%2Fweb%2Ftweet-button&ref_src=twsrc%5Etfw&related=twitterapi%2Ctwitter&text=Hello%20check%20my%20poll&tw_p=tweetbutton&url=https%3A%2F%2Fexample.com%2F${'polls'}&via=Andrei_Calazans`;
    return (
      <div className='row'>
        <div className="col m10 offset-m1">
          <div>
            <h1 className='center-align'>{this.props.params.question}?</h1>
          </div>
          <div>
            <form >

              {renderOptions()}


            </form>
            <form className='hide' ref='optionForm' onSubmit={this.addOption}>
              <div className='z-depth-3 options'>
                <label  htmlFor='newOption'>New Option</label>
                <p id='addOptionContainer'>
                  <input ref='new'   name="newOption" type="text" />
                  <button type='submit' id='checkMark'>
                    <i  className="fa fa-check" aria-hidden="true"></i>
                  </button>
                </p>
              </div>
            </form>
            {renderBtn()}

            <div className="fb-share-button" data-href="http://localhost:3000/polls" data-layout="button" data-size="small" data-mobile-iframe="true"><a className="fb-xfbml-parse-ignore" target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Flocalhost%3A3000%2Fpolls&amp;src=sdkpreparse">Share</a></div>

            <a className='twitter-share-button' target = '_blank' href={currentUrlToTweet}>
              <i className="fa fa-twitter" aria-hidden="true"></i>
              Tweet
            </a>

          </div>
        </div>

      </div>
    )
  }
});


export default Poll;
