import React, { useState, useEffect, useRef } from "react";
import { Table } from "reactstrap";

var moment = require("moment"); // require
moment().format();
// changing to function

const GHSA_URL =
  "https://challenge.nfhsnetwork.com/v2/search/events/upcoming?state_association_key=18bad24aaa&card=true&size=50&start=0";

const TSA_URL =
  "https://challenge.nfhsnetwork.com/v2/search/events/upcoming?state_association_key=542bc38f95&card=true&size=50&start=0";

function EventsTable() {
  const [GHSAEvents, setGHSAEvents] = useState([]);
  const [TSAEvents, setTSAEvents] = useState([]);

  //
  const [classification, setClassification] = useState("GHSA");
  // const [texasEvents, setTexasEvents] = useState(props.tsa);
  const startRef = useRef("");
  const endRef = useRef("");
  console.log(startRef.current.value);
  const [startDate, setStartDate] = useState("04-27");
  const [endDate, setEndDate] = useState("04-28");

  // console.log(props);
  // console.log(classification);

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
  // console.log("texas", texasEvents);

  const changeClass = e => {
    setClassification(e.target.value);
  };

  const filterStartDate = e => {
    setStartDate(e.target.value);
  };

  const filterEndDate = e => {
    setEndDate(e.target.value);
  };

  const filterEvents = () => {
    debugger;

    fetch(
      `https://challenge.nfhsnetwork.com/v2/search/events/upcoming?state_association_key=18bad24aaa&card=true&size=50&start=0&from=2021-${startDate}T00:00:00.000Z&to=2021-${endDate}T00:00:00.000Z`
    )
      .then(res => {
        debugger;
        res.json();
      })
      .then(data => setTSAEvents(data))
      .catch(err => {
        debugger;
        console.log(err);
      });
  };
  console.log(startDate);
  // console.log("startref", startRef);
  console.log(TSAEvents);
  // const texasFilterEvents = props.tsa.filter(event =>
  //   event.date.includes(startDate)
  // );

  // const georgiaFilterEvents = props.ghsa.filter(event =>
  //   event.date.includes(startDate)
  // );
  // console.log(texasEvents);

  const txsaEvents = TSAEvents.map(event => {
    const event_time_date = moment(new Date(event.date));
    let time = event_time_date.add(4, "hours").format("h:mma");
    let date = event_time_date.format("LL");

    return (
      <tr key={event.id}>
        <td>{event.key}</td>
        <td>{event.headline}</td>
        <td>{event.subheadline}</td>
        <td>
          {" "}
          {time} on {date}
        </td>
      </tr>
    );
  });

  const ghsaEvents = GHSAEvents.map(event => {
    const event_time_date = moment(new Date(event.date));
    let time = event_time_date.format("h:mma");
    let date = event_time_date.format("LL");

    return (
      <tr key={event.id}>
        <td>{event.key}</td>
        <td>{event.headline}</td>
        <td>{event.subheadline}</td>
        <td>
          {" "}
          {time} on {date}
        </td>
      </tr>
    );
  });

  return (
    <div className="Events-Table">
      {" "}
      <div className="Filters">
        <label>
          Choose Classification {"  "}
          <select className="ClassList" onChange={e => changeClass(e)}>
            <option value="FHSA"> GHSA </option>
            <option value="TXSA"> TXSA </option>
          </select>
        </label>
        <form>
          <label>
            Start Date{"   "}
            <input
              onChange={e => filterStartDate(e)}
              ref={startRef}
              placeholder="MM-YY"
              type="text"
              name="start"
            />
          </label>
          <label>
            End Date{"   "}
            <input
              onChange={e => filterEndDate(e)}
              ref={endRef}
              placeholder="MM-YY"
              type="text"
              name="end"
            />
            <button onClick={filterEvents}>Submit</button>
          </label>
        </form>
      </div>
      <div>
        <Table dark>
          <thead>
            <tr>
              <th>Key</th>

              <th>Headline</th>
              <th>Subheadline</th>
              <th>Start time</th>
            </tr>
          </thead>
          {classification !== "TXSA" ? (
            <tbody>{ghsaEvents}</tbody>
          ) : (
            <tbody>{txsaEvents}</tbody>
          )}
        </Table>
      </div>
    </div>
  );
}

export default EventsTable;
