import React, { useState, useEffect } from "react";
import { Table } from "reactstrap";
// import Moment from "react-moment";
var filter_texas =
  "https://challenge.nfhsnetwork.com/v2/search/events/upcoming?state_association_key=542bc38f95&card=true&size=50&start=0&from=2021-04-26T00:00:00.000Z&to=2021-04-27T21:00:00.000Z";
var moment = require("moment"); // require
moment().format();
// changing to function
function EventsTable(props) {
  const [classification, setClassification] = useState("GHSA");
  const [startTime, setStartTime] = useState("");

  // console.log(props);
  // console.log(classification);
  console.log(startTime);

  const changeClass = e => {
    setClassification(e.target.value);
  };

  const filterStartTime = e => {
    setStartTime(e.target.value);
  };

  useEffect(() => {
    console.log("classification");
  }, [classification]);

  const txsaEvents = props.tsa.map(event => {
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

  const ghsaEvents = props.ghsa.map(event => {
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
        <select className="ClassList" onChange={e => changeClass(e)}>
          <option> Choose Classification</option>
          <option value="FHSA"> GHSA </option>
          <option value="TXSA"> TXSA </option>
        </select>
        <form>
          <label>
            Start Date{"   "}
            <input
              onChange={e => filterStartTime(e)}
              type="text"
              name="start"
            />
          </label>
          <label>
            End Date{"   "}
            <input type="text" name="end" />
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
