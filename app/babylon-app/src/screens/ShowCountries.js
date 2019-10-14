import React, { useState } from 'react';
import { View, Text, StyleSheet , ScrollView } from 'react-native';
import useResults from '../hooks/useResults';
import CountriesList from '../components/CountriesList';
import Utils from '../utils/utils';



const ShowCountries = () => {
    const [ term, setTerm ] = useState('');//State for lo que esribimos en el searchbar
    const [getAllCountries, getAllWage, results, errorMessage,wage] = useResults();//Aqui llamamos las variables que vienen desde archivo UseResults
    
    var mergeDate = Utils(results,wage);
    console.log('Ilieee',mergeDate)

    return (       
        
        <>
            
            {errorMessage ? <Text>{errorMessage}</Text> : null}
            <ScrollView>
                <CountriesList results={mergeDate} title="Countries" />
            </ScrollView>
        </> //es lo mismo que si utilizariamos view con style flex :1 
       
    );
};

const styles = StyleSheet.create({});

export default ShowCountries;
