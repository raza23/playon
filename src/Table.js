import React, { useState, useEffect, useRef } from "react";
import { Table } from "reactstrap";

var moment = require("moment"); // require
moment().format();
// changing to function
function EventsTable(props) {
  const [classification, setClassification] = useState("GHSA");
  const [texasEvents, setTexasEvents] = useState(props.tsa);
  const startRef = useRef("");
  const endRef = useRef("");
  console.log(startRef.current.value);
  const [startDate, setStartDate] = useState("04");
  const [endDate, setEndDate] = useState();

  // console.log(props);
  // console.log(classification);
  console.log("texas", texasEvents);

  const changeClass = e => {
    setClassification(e.target.value);
  };

  const filterStartDate = e => {
    setStartDate(e.target.value);
  };

  const filterEndDate = e => {
    setEndDate(e.target.value);
  };

  // const filterEvents = () => {
  //   // debugger;
  //   // const res = await fetch(
  //   //   `https://challenge.nfhsnetwork.com/v2/search/events/upcoming?state_association_key=542bc38f95&card=true&size=50&start=0&from=2021-${startRef.current.value}T00:00:00.000Z&to=2021-${endRef.current.value}T00:00:00.000Z`
  //   // );
  //   // const data = await res.json();
  //   // debugger;
  //   // setTexasEvents(data.items);
  //   debugger;
  //   fetch(
  //     `https://challenge.nfhsnetwork.com/v2/search/events/upcoming?state_association_key=542bc38f95&card=true&size=50&start=0&from=2021-${startRef.current.value}T00:00:00.000Z&to=2021-${endRef.current.value}T00:00:00.000Z`
  //   )
  //     .then(res => res.json())
  //     .then(data => setTexasEvents(data));
  // };
  console.log(startDate);
  const texasFilterEvents = props.tsa.filter(event =>
    event.date.includes(startDate)
  );

  const georgiaFilterEvents = props.ghsa.filter(event =>
    event.date.includes(startDate)
  );
  console.log(texasEvents);

  useEffect(() => {
    console.log("classification");
    // filterEvents();
  });

  const txsaEvents = texasFilterEvents.map(event => {
    // console.log(moment(event.date, "YYYY-MM"));
    const event_time_date = moment(new Date(event.date));
    let time = event_time_date.add(4, "hours").format("h:mma");
    let date = event_time_date.format("LL");
    // console.log(time.format("h:mma"));
    // console.log(time.format("LL"));

    // var date_test = new Date(event.date.replace(/-T/g, "/")).toString();
    // console.log(date_test);
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

  const ghsaEvents = georgiaFilterEvents.map(event => {
    // console.log(event);
    var date_test = new Date(event.date.replace(/-T/g, "/"));
    const event_time_date = moment(new Date(event.date));
    let time = event_time_date.format("h:mma");
    let date = event_time_date.format("LL");
    // console.log(date_test);
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
            {/* <option> Choose Classification</option> */}
            <option value="FHSA"> GHSA </option>
            <option value="TXSA"> TXSA </option>
          </select>
        </label>
        <form>
          <label>
            Choose Date{"   "}
            <input
              onChange={e => filterStartDate(e)}
              ref={startRef}
              placeholder="MM-DD"
              type="text"
              name="start"
            />
          </label>
          {/* <label>
            End Date{"   "}
            <input
              onChange={e => filterEndDate(e)}
              ref={endRef}
              placeholder="MM-DD"
              type="text"
              name="end"
            />
            
          </label> */}
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
