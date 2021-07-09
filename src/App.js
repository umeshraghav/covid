import './App.css';
import InfoBox from './InfoBox';
import Map from './Map'
import Table from './Table'
import { sortData } from './util';
import {useState, useEffect} from 'react'
import {FormControl, Select, MenuItem, Card, CardContent} from "@material-ui/core"


 

function App() {
 const [countries, setCountries] = useState([])
 const [country, setCountry] = useState("worldwide") 
 const [countryData, setCountryData] =useState({});
 const [tableData, setTableData]= useState([]);


 const getAllCountries=async()=>{
    const response = await fetch('https://disease.sh/v3/covid-19/countries');
    const data = await response.json();
 
    const countriesList = data.map((country)=>({
           name : country.country,
          value : country.countryInfo.iso2
    }))

    setCountries(countriesList)
 
   
    setTableData(sortData(data));

    
     
  
 }


 useEffect(() => {
    fetch('https://disease.sh/v3/covid-19/all').then(response=>response.json()).then(data=>{
      setCountryData(data)
    })
 
 }, [])

 useEffect(()=>{
    getAllCountries();
 },[])



 const handleCountryChange = async(event)=>{
  
  const countryCode= event.target.value;
  setCountry(countryCode)
 
      const url = (countryCode === 'worldwide' ?'https://disease.sh/v3/covid-19/all' : `https://disease.sh/v3/covid-19/countries/${countryCode}` )
try{
  await fetch(url).then(response=>response.json()).then(data=>{
  
    setCountryData(data);
   
  });


}catch(err){
  console.log(err)
}

 }

  

  return (



    
    <div className="app">
   
   <div className="left">
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
                    <InfoBox title="Covid Cases" total={countryData.cases} cases={countryData.todayCases} />
                    <InfoBox title="Recovered" total={countryData.recovered} cases={countryData.todayRecovered}/>
                    <InfoBox title="Deaths" total={countryData.deaths} cases={countryData.todayDeaths}/>
              </div>
<Map />

</div>
<Card className="right">
        <CardContent>
          <h3>Card</h3>
          <Table countries={tableData} /> 
        </CardContent>
</Card>
    </div>

  );
}

export default App;
