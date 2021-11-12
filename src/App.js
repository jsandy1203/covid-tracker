import {
  FormControl,
  MenuItem,
  Select,
  Card,
  CardContent,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "./App.css";
import { sortData, prettyPrintStat } from "./uitls.js";
import InfoBox from "./components/InfoBox/InfoBox";
import Map from "./components/Map/Map";
import Table from "./components/Table/Table";
import LineGraph from "./components/LineGraph/LineGraph";
import "leaflet/dist/leaflet.css";

function App() {
  const [countries, setCountries] = useState(["India", "USA", "UK"]);
  const [country, setCountry] = useState("Worldwide");
  const [countryInfo, setCountryInfo] = useState([]);
  const [tableData, setTabledata] = useState([]);
  const [casesType, setCasesType] = useState("cases");
  const [mapCenter, setMapCenter] = useState({ lat: 17.385, lng: 78.4867 });
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCoutries, setMapCountries] = useState([]);

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((res) => res.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

  // useEffect(()=> {
  //   setMapCenter([countryInfo.la, countryInfo.long])
  // });

  //useEffect runs a piece of code based on a given condition
  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((res) => res.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));
          setTabledata(sortData(data));
          setCountries(countries);
          setMapCountries(data);
          setMapZoom(6);
        });
    };
    getCountriesData();
  }, []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    const url =
      countryCode === "Worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    await fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setCountry(countryCode);
        setCountryInfo(data);
        const {
          countryInfo: { lat, long },
        } = data;
        setMapCenter({ lat, lng: long });
      });
  };
  return (
    <div className="app">
      <div className="app_left">
        <div className="app_header">
          <h1>Lets build a covid19 trackerApp</h1>
          <FormControl>
            <Select
              className="app_dropdown"
              variant="outlined"
              value={country}
              onChange={onCountryChange}
            >
              <MenuItem value="Worldwide">Worldwide</MenuItem>
              {/* Loop through all coutries and show dropdown of countries */}
              {countries.map((country, index) => (
                <MenuItem key={index} value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        {/* Header */}
        {/* Title and select dropdown */}

        <div className="app_stats">
          <InfoBox
            active={casesType === "cases"}
            onClick={(e) => setCasesType("cases")}
            title="Coronavirus Cases"
            cases={prettyPrintStat(countryInfo.todayCases)}
            total={countryInfo.cases}
          />
          <InfoBox
            active={casesType === "recovered"}
            onClick={(e) => setCasesType("recovered")}
            title="Recovered"
            cases={prettyPrintStat(countryInfo.todayRecovered)}
            total={countryInfo.recovered}
          />
          <InfoBox
            active={casesType === "deaths"}
            onClick={(e) => setCasesType("deaths")}
            title="Deaths"
            cases={prettyPrintStat(countryInfo.todayDeaths)}
            total={countryInfo.deaths}
          />
          {/* Infobox title="covid cases"*/}
          {/* Infobox titile="recoveries"*/}
          {/* Infobox title="deaths"*/}
        </div>
        {/* Map */}
        <Map
          center={mapCenter}
          zoom={mapZoom}
          countries={mapCoutries}
          casesType={casesType}
        />
      </div>
      <Card className="app_right">
        <CardContent>
          <h3>Live Cases by Country</h3>
          {/* Table */}
          <Table countries={tableData} />
          <h3 className="line-graph">Worldwide new {casesType}</h3>
          {/* Graph */}
          <LineGraph className="app_graph" casesType={casesType} />
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
