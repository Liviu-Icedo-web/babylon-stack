import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import useResults from "../hooks/useResults";
import CountriesList from "../components/CountriesList";
import Utils from "../utils/utils";

const ShowCountries = () => {
  const [term, setTerm] = useState("");
  const [
    getAllCountries,
    getAllWage,
    results,
    errorMessage,
    wage
  ] = useResults();

  var mergeDate = Utils(results, wage);

  return (
    <React.Fragment>
      {errorMessage ? <Text> {errorMessage} </Text> : null}
      <ScrollView>
        <CountriesList results={mergeDate} title="Countries" />
      </ScrollView>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({});

export default ShowCountries;
