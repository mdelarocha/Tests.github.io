import React from "react";
import ReactDOM from "react-dom";
module.exports = require('./lib/Twitter');
twttr.widgets.load( document.getElementbyId("index.html") );


class UndecissiveButton extends React.Component 
{
  constructor(props) {
    super(props);

    this.changeMe = this.changeMe.bind(this);

    this.state = {
      mad: false
    }
  }

  changeMe() 
  {
    if(this.state.mad) {
      this.setState({mad:false});
    } else {
      this.setState({mad:true});
    }
  }

  render() 
  {
    if(this.state.mad) 
    {
      var color = {backgroundColor:"blue"};
    } else 
    {
      var color = {backgroundColor:"white"};
    }

    return (<button style={color} className = "undecissive-button" onClick={this.changeMe}>Search!</button>);
  }
}

ReactDOM.render(<UndecissiveButton />, document.getElementById("app"));
