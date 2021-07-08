import './App.css';
import InfoBox from './InfoBox';

import {useState, useEffect} from 'react'
import {FormControl, Select, MenuItem} from "@material-ui/core"

 

function App() {
 const [countries, setCountries] = useState([])
 const [country, setCountry] = useState("worldwide") 



 const getAllCountries=async()=>{
    const response = await fetch('https://disease.sh/v3/covid-19/countries');
    const data = await response.json();
    const countriesList = data.map((country)=>({
           name : country.country,
          value : country.countryInfo.iso2
    }))
setCountries(countriesList)
     
 }


 useEffect(()=>{
    getAllCountries();
 },[])



 const handleCountryChange = async(event)=>{
  setCountry(event.target.value)
 }

  return (



    
    <div className="app">
    <div className="app_header">

      <h1>Covid Tracker</h1>

      <FormControl className="app_dropdown">
            <Select variant="outlined"  value = {country} onChange={handleCountryChange}>


            <MenuItem value="worldwide">WorldWide</MenuItem>
              {countries.map((country)=>{
                const {name,value}= country;
              return  <MenuItem value={value} key={name}>{name}</MenuItem>
 
              })}


            </Select>
        </FormControl> 
    </div>

              <div className="app_stats">
                    <InfoBox title="Covid Cases" total={200} cases={2200} />
                    <InfoBox title="Recovered" total={2300} cases={2200}/>
                    <InfoBox title="Deaths" total={2040} cases={2200}/>
              </div>



    </div>

  );
}

export default App;
