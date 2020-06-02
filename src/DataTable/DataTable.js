import React, { useState, useEffect, useRef } from 'react';
import './DataTable.css';
import SearchBar from '../SearchBar/Search';
import {fetchAllCountryName, fetchCovidData} from './helper.js'

function Header({isData, prevCountry, currCountry}){
    if(!isData){
        return <h3 id="header">No data for the {prevCountry}. Showing previous data.</h3>
    }
    else{
        return <h3 id="header">Showing data for {currCountry}</h3>
    }
}


function CovidDataTable({title, value}){
    return(
            <div className="dataCard"> 
                <h4>{title}:</h4>
                <p>{value}</p>
            </div>
    )
}
const defaultData = {
    "Country": "Switzerland",
    "CountryCode": "CH",
    "Lat": "46.82",
    "Lon": "8.23",
    "Confirmed": 20505,
    "Deaths": 666,
    "Recovered": 6415,
    "Active": 13424,
    "Date": "2020-04-04T00:00:00Z",
    "LocationID": "628d4f12-6ebe-4fa9-b046-77ff0b894a4e"
};
const dataFileldName = [ "Confirmed", "Deaths", "Recovered", "Active"]
function DataTable(){
    const [listOfCountry, setlistOfCountry] = useState([]);
    const [currCountry, setCurrCountry] = useState('Switzerland');
    const [selectValueData, setSelectValueData] = useState(defaultData);
    const [isData, setIsData] = useState(true);
    
    const prevCountryRef = useRef();
    useEffect(()=>{
        prevCountryRef.current = currCountry;
    })
    const prevCountry = prevCountryRef.current;
    // State to select
    useEffect(() => {
        async function getCountries() {
            try {
                const result  = await fetchAllCountryName()
                setlistOfCountry(result)
            } catch(e) {
              console.log(e)                  
            }
        }
        if (!listOfCountry.length) {
            getCountries()
        }
    });
    async function handleDropdownChange(val){
        if(val.length===0 || !listOfCountry.includes(val)){
            return ''
        }
        setCurrCountry(val);
        const data = await fetchCovidData(val)
        let len = data.length;
        if(len > 0){
            setIsData(true)
            setSelectValueData(data[len-1])
        }
        else{
            setIsData(false)
            setCurrCountry(prevCountry)
        }
    }
    return (
        <div>
            <Header isData = {isData} currCountry = {currCountry} prevCountry = {prevCountry} />
            <SearchBar list={listOfCountry} click={handleDropdownChange}  />
            <div id="mainWrapper">
                {Object.keys(selectValueData).map((key)=>{
                    if(dataFileldName.includes(key)){
                        return <CovidDataTable key={key} title={key} value={selectValueData[key]}/>
                    }
                    else{
                        return ""
                    }
                })}
            </div>
        </div>
            
    );
}
export default DataTable;