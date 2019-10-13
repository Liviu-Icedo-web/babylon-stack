import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

const CountryDetails = ({ result }) => {
    return (
        <View style={styles.container} > 
            <Text style={styles.name} >{result.country }</Text>
            <Text>Capital: {result.capital} </Text>
            <Text>Currency Name : {result.currency_name}</Text>
            <Text>Currency Code : {result.currency_code}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginLeft: 15
    },
    image: {
        width: 250,
        height: 120,
        borderRadius: 4,
        marginBottom: 5
    },
    name: {
        fontWeight: 'bold',
    }
});

export default CountryDetails;