import { useEffect, useState } from 'react';
import babylonApi from '../api/babylonApi';

export default () => {
    const [ results, setResults ] = useState([]);//State for API
    const [ errorMessage, setErrorMessage ] = useState('');//State for error en la api

    const getAllCountries = async () => {
        console.log(await babylonApi.get('/users'));
        try {
        const response = await babylonApi.get('/countries');
        console.log(response.data)
        setResults(response.data);
        } catch (err) {
            console.log(err);
            setErrorMessage('Something went wrong')
        }
    };

    useEffect(() => {
        getAllCountries();
    },[]);

    return [getAllCountries, results, errorMessage ];//returnamos estas variables para SearchScreen
};