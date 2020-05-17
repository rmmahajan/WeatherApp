import React from 'react';
import './App.css';
import xhr from 'xhr';

import Plot from './Plot.js';

const API_KEY = "883e79e49fdf6a3421620c7268552355";

class App extends React.Component {
  state = {
      location: '',
      data: {},
      dates: [],
      temps: []
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
      var body = JSON.parse(data.body);
      var list = body.list;
      var dates = [];
      var temps = [];
      for (var i = 0; i < list.length; i++) {
        dates.push(list[i].dt_txt);
        temps.push(list[i].main.temp);
      }

      this.setState({
        data: body,
        dates: dates,
        temps: temps
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
        <h2>Forecast</h2>
        <Plot
      		xData={this.state.dates}
          yData={this.state.temps}
          type="scatter"
        />
      </div>
    );
  }
}

export default App;