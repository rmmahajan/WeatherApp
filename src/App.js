import React from 'react';
import './App.css';
import xhr from 'xhr';
import Plot from 'Plot';

const API_KEY = "82f40c24bce69950c7aa3d09e07b391b";

class App extends React.Component {
  state = {
      location: '',
      data: {}
  };
  
  fetchData = (evt) => {
    evt.preventDefault();
    
    if (!API_KEY) {
      console.log('Enter your API_KEY and the enter location');
      return;
    }
    
    let location = encodeURIComponent(this.state.location);
    let urlPrefix = '/cors/http://api.openweathermap.org/data/2.5/forecast?q=';
    let urlSuffix = '&APPID=' + API_KEY + '&units=metric';
    let url = urlPrefix + location + urlSuffix;
    
    xhr({
      url: url
    }, (err, data) => {
      if (err) {
        console.log('Error:', err);
        return;
      }
      
      this.setState({
        data: JSON.parse(data.body)
      });
    });
  };

  changeLocation = (evt) => {
    this.setState({
      location: evt.target.value
    });
  };

  render() {
    let currentTemp = 'Specify a location';
    if (this.state.data.list) {
      currentTemp = this.state.data.list[0].main.temp;
    }
    return (
      <div>
        <h1>Weather</h1>
        <form onSubmit={this.fetchData}>
          <label>I want to know the weather for
            <input
              placeholder={"City, Country"}
              type="text"
              value={this.state.location}
              onChange={this.changeLocation}
            />
          </label>
        </form>
        <p className="temp-wrapper">
          <span className="temp">{ currentTemp }</span>
          <span className="temp-symbol">°C</span>
        </p>
      </div>
    );
  }
}

export default App;