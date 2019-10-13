import React, { useState } from 'react';
import { View, Text, StyleSheet , ScrollView } from 'react-native';
import useResults from '../hooks/useResults';
import CountriesList from '../components/CountriesList';


const ShowCountries = () => {
    const [ term, setTerm ] = useState('');//State for lo que esribimos en el searchbar
    const [getAllCountries, results, errorMessage] = useResults();//Aqui llamamos las variables que vienen desde archivo UseResults
   

    return (
        <>
           
            
            {errorMessage ? <Text>{errorMessage}</Text> : null}
            <ScrollView>
                <CountriesList results={results} title="Cost Effective" />
            </ScrollView>
        </> //es lo mismo que si utilizariamos view con style flex :1 
       
    );
};

const styles = StyleSheet.create({});

export default ShowCountries;
