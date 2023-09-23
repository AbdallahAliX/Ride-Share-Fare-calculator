import React from "react";

export default function Calculator() {
    return(
        <div className="container">
            <div className="input-grid">
                <input className="duration" type="number" placeholder="Enter Fare Duration in minuits" />
                <input className="distance" type="number" placeholder="Enter Distance in miles" /> 
                <button className="calculate-button js-calculate">Calculate</button>
            </div>
           
        </div>
    )
}