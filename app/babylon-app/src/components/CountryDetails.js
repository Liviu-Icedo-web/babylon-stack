import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

const CountryDetails = ({ result }) => {
    return (
        <View style={[styles.container, styles.shadow]} > 
            <Text style={styles.name} >{result.country }</Text>
            <Text>Capital: {result.capital} </Text>
            <Text>Currency Name : {result.currency_name}</Text>
            <Text>Currency Code : {result.currency_code}</Text>
            <Text>Local Wage : {result.LocalAmount}</Text>
            <Text>USD Wage: {result.USD}</Text>
            <Text>Year data collect : {result.Year}</Text>
            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginLeft: 15
    },
    shadow: {
        borderRadius: 10,
        shadowColor: '#444',
        shadowOffset: { width: 5, height: 5 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 1,
        marginLeft: 5,
        marginRight: 5,
        backgroundColor: 'white',
        marginTop: 10,
        paddingBottom: 10,
        paddingTop: 10,
        paddingLeft:10,
        borderWidth: 0.5,
        borderColor: '#d7d7d9'
      } 
});

export default CountryDetails;