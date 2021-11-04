const { default: axios } = require('axios');
const express = require('express');
const xml2js = require('xml2js');
const parser = new xml2js.Parser();

const app = express();

const PORT = 3000 || process.env.PORT;

app.use(express.static('public'));

app.get('/api/housingData', (req, res) => {
    var properties = [];
    axios.get('https://s3.amazonaws.com/abodo-misc/sample_abodo_feed.xml')
    .then(({data}) => {
        // var parseString = require('xml2js').parseString;
        parser.parseString(data, function (err, result) {
            // console.log('result: ', result.PhysicalProperty);
            // console.log('result down to property: ', result.PhysicalProperty.Property);
            // console.log('result down to property ID: ', result.PhysicalProperty.Property[0].PropertyID[0].Email[0]);
            // console.log('result down to address: ', result.PhysicalProperty.Property[0].PropertyID[0].Address[0].City);
            console.log('result down to bedrooms: ', result.PhysicalProperty.Property[0].ILS_Unit[0].Units[0].Unit[0].UnitBedrooms[0]);

            var propertyList = result.PhysicalProperty.Property;
            propertyList.map((property) => {
                if (property.PropertyID[0].Address[0].City[0] === 'Madison' && property.PropertyID[0].Address[0].State[0] === 'WI') {
                    var info = {
                        property_id: property.PropertyID[0].Identification[0]['$'].IDValue,
                        name: property.PropertyID[0].MarketingName[0],
                        email: property.PropertyID[0].Email[0],
                        bedrooms: property.ILS_Unit[0].Units[0].Unit[0].UnitBedrooms[0]
                    };
                    properties.push(info)
                }
                // var indProperty = {};
                // dataToSend.push(property[0].PropertyID[0].Address[0].City[0])
            })
            // console.log('dataToSend: ', dataToSend)
            res.send(properties)
        });
        // iterate over result.PhysicalProperty.Property (array of all the properties)
            // for each property

        // console.log('response: ', response)
        // res.send(response)
        // data wrangling etc.
        // eventually send the data back in a nice format
    })
    .catch(err => {
        res.sendStatus(404)
    })
})

app.listen(PORT, () => {
    console.log(`App running on localhost:${PORT}`)
});