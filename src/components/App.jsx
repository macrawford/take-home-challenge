import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../../public/styles.css';

function App() {
    const [properties, setProperties] = React.useState([]);
    useEffect(() => {
        getData()
    }, []);
    const getData = () => {
        axios.get('/api/housingData')
        .then(({data}) => {
            setProperties(data)
        })
        .catch((err) => {
            console.log('err: ', err)
        })
    }
    return (
        <div style={{fontFamily: "Avenir Next", paddingLeft: 30}}>
            <div style={{fontSize: 30, marginBottom: 15}}>Properties in Madison, WI</div>
            {properties.map((property, index) => {
                return (
                    <div key={index} style={{marginBottom: 12}}>
                        <div>Property ID: {property.property_id}</div>
                        <div>Name: {property.name}</div>
                        <div>Email: {property.email}</div>
                        <div>Bedrooms: {property.bedrooms}</div>
                    </div>
                )
            })}
        </div>
    )
}

export default App;