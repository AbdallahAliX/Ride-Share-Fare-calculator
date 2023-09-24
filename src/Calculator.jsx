import React, { Component } from 'react';


class FareCalculator extends Component {
    constructor() {
        super();
        this.state = {
            startLocation: '',
            endLocation: '',
            estimatedFare: null,
        };
    }

    handleStartLocationChange = (event) => {
        this.setState({ startLocation: event.target.value });
    }

    handleEndLocationChange = (event) => {
        this.setState({ endLocation: event.target.value });
    }

    calculateFare = () => {
        const { startLocation, endLocation } = this.state;

        // Create a DirectionsService instance
        const directionsService = new window.google.maps.DirectionsService();

        // Define the request
        const request = {
            origin: startLocation,
            destination: endLocation,
            travelMode: 'DRIVING', // You can change this to other travel modes like 'WALKING' or 'TRANSIT'
        };

        // Call the DirectionsService to calculate the route
        directionsService.route(request, (response, status) => {
            if (status === 'OK') {
                // Extract distance and duration from the response
                const { distance, duration } = response.routes[0].legs[0];

                // Calculate fare based on distance and duration
                const distanceInMiles = distance.value / 1609.34; // Convert meters to miles
                const durationInMinutes = duration.value / 60; // Convert seconds to minutes
                const BASE_FARE = 5.00; // Base fare amount
                const PER_MILE_RATE = 1.50; // Rate per mile
                const PER_MINUTE_RATE = 0.25; // Rate per minute
                const distanceFare = distanceInMiles * PER_MILE_RATE;
                const durationFare = durationInMinutes * PER_MINUTE_RATE;
                const totalFare = BASE_FARE + distanceFare + durationFare;

                this.setState({ estimatedFare: totalFare.toFixed(2) });
            } else {
                // Handle the error if directions service fails
                console.error(`Error fetching directions: ${status}`);
            }
        });
    }

    render() {
        return (
            <div>
                <div className="container">
                    <img className="calculator-logo" src="../logo4.png" />
                    <img className="calculator-logo" src="../car-logo.png" />
                </div>

                <div className="form-container">
                    <div className="input-grid">
                        <input onChange={this.handleStartLocationChange} className="enter-location" type="text" placeholder="Start Location" />
                        <input onChange={this.handleEndLocationChange} className="enter-location" type="text" placeholder="End Location" />
                        <button onClick={this.calculateFare} className="calculate-button js-calculate">
                            Calculate
                        </button>
                        {this.state.estimatedFare && (
                            <p className='estimated-fare'>Estimated Fare: ${this.state.estimatedFare}</p>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

export default FareCalculator;
