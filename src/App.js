import React, { Component } from 'react';
import './App.css';

const API_KEY = "883e79e49fdf6a3421620c7268552355";

class App extends Component {

  state = {
    location: ""
  };

  fetchData = (event) =>{

    event.preventDefault();
    console.log(this.state.location);

  };

  changeLocation = (event) =>{

    this.setState({
      location: event.target.value
    });
  };

  render()
  {

    

    return (
      <div>
        <h1>Weather App</h1>
        <form onSubmit={this.fetchData}>
          <label>To know weather , Please enter the info</label>
          <input type="text" placeholder={"City, Country"} onChange={this.changeLocation} value={this.state.location}></input>
        </form>
      </div>
    );
  }
}

export default App;
