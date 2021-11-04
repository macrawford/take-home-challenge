import axios from 'axios';
import React, { useEffect, useState } from 'react';

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
        <div>
            <div>
                {properties.map((property, index) => {
                    return (
                        <div key={index}>
                            <div>property_id: {property.property_id}</div>
                            <div>name: {property.name}</div>
                            <div>email: {property.email}</div>
                            <div>bedrooms: {property.bedrooms}</div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default App;