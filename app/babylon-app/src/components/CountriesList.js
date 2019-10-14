import React from 'react';
import {View, Text, StyleSheet, FlatList , TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';
import ResultsDetail from './CountryDetails';


const CountriesList = ({ title, results, navigation }) => {
    if (!results.length) {
        return null
    }
    return (        
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <FlatList
                showsHorizontalScrollIndicator={false}
                data={results}
                keyExtractor={results => results.country_id.toString()}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity onPress={() => navigation.navigate('ResultsShow',{ id: item.id})}>
                             <ResultsDetail result={item}/>
                        </TouchableOpacity>
                       
                    )
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 10
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 15,
        marginBottom: 5
    }
});

export default withNavigation(CountriesList);