import React, { Component } from 'react';
import './App.css';

const API_HOST = 'http://api.openweathermap.org/data/2.5/weather?id=';
const API_KEY = "PUT YOUR KEY HERE";

// ID's pulled from city.list.json.gz on http://bulk.openweathermap.org/sample/
const locations = {
	waterloo: 6176823,
	toronto: 6087824
}

class App extends Component {

	constructor(props) {
		super(props);
		this.state = { 
			location: locations.waterloo,
			loading: false,
			temperature: ""
		};
	}

	componentDidMount() {
		this.udpateWeather(this.state.location);
	}

	toggleLocation = () => {
		const { location } = this.state;

		if (location === locations.waterloo)
			this.udpateWeather( locations.toronto );

		else if (location === locations.toronto)
			this.udpateWeather( locations.waterloo );
	}

	udpateWeather = ( location ) => {
		this.setState({ location, loading: true });

		fetch(`${API_HOST}${location}&APPID=${API_KEY}&units=metric`)
			.then(response => response.json())
				.then(responseJSON => {
					this.setState({
						temperature: `${responseJSON.main.temp}°C`,
						loading: false
					})})
					.catch(err => {
						this.setState({
							temperature: "Could not connect.",
							loading: false
						});
					});
	}

	render() {
		const { location, temperature, loading } = this.state;

		return (
			<div className="App">

				<div className="header">
					<img src="http://hddfhm.com/images/animated-clipart-weather-15.png" alt="cloud" className="logo"/>
					<h1>Weather</h1>
				</div>

				<p>{location === locations.waterloo ? "WATERLOO" : "TORONTO"}</p>

				<div className="tempContainer">
					<input 
						type="image" 
						src="https://www.materialui.co/materialIcons/navigation/refresh_grey_192x192.png"
						className="refresh"
						onClick={() => this.udpateWeather(location)}
						alt="refresh"/>

					<p>{temperature}</p>
				</div>

				{!loading ? <div className="loading"/> :
					<img 
						src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/35771931234507.564a1d2403b3a.gif"
						alt="loading"
						className="loading"/>
				}

				<button className="btn" onClick={this.toggleLocation}>
					{location === locations.waterloo ? "Toronto" : "Waterloo"}
				</button>

			</div>
		);
	}
}

export default App;
