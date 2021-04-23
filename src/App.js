import Table from "./Table.js";
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./App.css";

const GHSA_URL =
  "https://challenge.nfhsnetwork.com/v2/search/events/upcoming?state_association_key=18bad24aaa&card=true&size=50&start=0";

const TSA_URL =
  "https://challenge.nfhsnetwork.com/v2/search/events/upcoming?state_association_key=542bc38f95&card=true&size=50&start=0";

function App() {
  const [GHSAEvents, setGHSAEvents] = useState([]);
  const [TSAEvents, setTSAEvents] = useState([]);

  useEffect(() => {
    //* makes the fetch
    getFHSAevents();
    getTSAevents();
  }, []);

  const getFHSAevents = () => {
    fetch(GHSA_URL)
      .then(res => res.json())
      .then(data => setGHSAEvents(data.items));
  };

  const getTSAevents = () => {
    fetch(TSA_URL)
      .then(res => res.json())
      .then(data => setTSAEvents(data.items));
  };

  console.log(GHSAEvents);
  console.log(TSAEvents);

  return (
    <div className="App">
      <Table ghsa={GHSAEvents} tsa={TSAEvents} />
    </div>
  );
}

export default App;
