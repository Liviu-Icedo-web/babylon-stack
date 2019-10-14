import { useEffect, useState } from 'react';
import babylonApi from '../api/babylonApi';
import Utils from '../utils/utils';

export default () => {
    const [ results, setResults ] = useState([]);//State for API
    const [ wage, setWage ] = useState([]);//State for error en la api    
    const [ errorMessage, setErrorMessage ] = useState('');//State for error en la api


    const getAllCountries = async () => {                
        try {
        const response = await babylonApi.get('/countries');
            
        setResults(response.data);
        } catch (err) {
            console.log(err);
            setErrorMessage('Something went wrong with Countries')
        }
    };


    const getAllWage = async () =>{
        try {
            const response = await babylonApi.get('/wage');
            setWage(response.data)             
        } catch (err) {
            console.log(err);
            setErrorMessage('Something went wrong with Countries')
        }
    }

    const mergeData = ()=>{
        /*let json1 = [
            {
                "Id": "5d7f6b2b57d5104f58e53d3d",
                "languages": [
                "nl-BE",
                "fr-BE",
                "de-BE"
                ],
                "country": "Belgium",
                "country_id": 2802361,
                "capital": "Brussels",
                "currency_name": "Euro",
                "currency_symbol": "€",
                "currency_code": "EUR",
                "iso": "BE"
            },
            {
                "Id": "5d7f6b2b57d5104f58e53d3e",
                "languages": [
                "fr-BF"
                ],
                "country": "Burkina Faso",
                "country_id": 2361809,
                "capital": "Ouagadougou",
                "currency_name": "Franc",
                "currency_symbol": "Fr",
                "currency_code": "XOF",
                "iso": "BF"
                },
        ];
        
        let json2 = [
            {
                "Id": "5da4571941d2c39dc30e731c",
                "Country": "Burkina Faso",
                "Year": "2018",
                "LocalAmount": "34,664.0",
                "USD": "58.07 "
                },
                {
                    "Id": "5da4571941d2c39dc30e731b",
                    "Country": "Belgium",
                    "Year": "2019",
                    "LocalAmount": "1,593.8",
                    "USD": "1,824.9 "
                    }    
        ];
        
        let result = json1.map(obj => {
            let data = json2.find(item => item.Country === obj.country);
            return {...obj, ...data}
        });*/
        
        
    }

    useEffect(() => {
        getAllCountries();
        getAllWage();        

       
    },[]);

    return [getAllCountries,getAllWage,results, errorMessage ,wage];//returnamos estas variables para SearchScreen
};