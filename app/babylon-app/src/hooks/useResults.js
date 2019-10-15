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

    useEffect(() => {
        getAllCountries();
        getAllWage();
    },[]);

    return [getAllCountries,getAllWage,results, errorMessage ,wage];//returnamos estas variables para SearchScreen
};