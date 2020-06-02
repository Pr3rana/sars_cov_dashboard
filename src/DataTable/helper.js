export async function fetchAllCountryName(){
    let result = localStorage.getItem('covidCountryList');
    let list = [];
    if (!result) {
        const requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
        let response = await fetch("https://api.covid19api.com/countries", requestOptions);
        if(!response.ok){
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        else{
            let currResult = await response.text();
            result = JSON.parse(currResult);
            result.forEach(element => {
                list.push(element.Country)
            });
        }   
        localStorage.setItem('covidCountryList', JSON.stringify(list));
    } else {
        list = JSON.parse(result);
    }
    return list;
}

export async function fetchCovidData(currVal){
    let result = null;
    const requestOptions = {
        method: 'GET',
        redirect: 'follow'
    }
    let response = await fetch("https://api.covid19api.com/live/country/"+currVal+"/status/confirmed", requestOptions);
    if(!response.ok){
        throw new Error(`HTTP error! status: ${response.status}`)
        
    }
    else{
        let currResult = await response.text();
        result = JSON.parse(currResult)
    }
    return result;

}
