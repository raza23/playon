import React, { useState, useEffect, useRef } from "react";
import EventSquare from "./EventSquare";
import { Table } from "reactstrap";
// import Table from "react-bootstrap/Table";
import styled from "styled-components";

var moment = require("moment"); // require
moment().format();
// changing to function
function EventsTable(props) {
  const [classification, setClassification] = useState("Georgia");
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

  // STYLED COMPONENTS

  const Event = styled.div`
      position: relative;
      width: 200px;
      height: 160px;
      display: inline-block;
      padding: 5px
      border: 10px solid red;
  

      background: #001C34;
      box-shadow: 0px 1px 20px rgba(0, 0, 0, 0.1);
      border-radius: 6px;
    `;

  const Column = styled.div`
    position: relative;

    float: left;
    width: 10.33%;
    padding: 50px;
    position: relative;
    // border: 10px solid blue;
    left: 00px;
    top: 1px;
  `;

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
      <Column>
        <Event>
          <EventSquare
            eventkey={event.key}
            headline={event.headline}
            subheadline={event.subheadline}
            eventtime={time}
            eventdate={date}
          />
        </Event>
      </Column>
    );

    // return (
    //   <tr key={event.id}>
    //     <td>{event.key}</td>
    //     <td>{event.headline}</td>
    //     <td>{event.subheadline}</td>
    //     <td>
    //       {" "}
    //       {time} on {date}
    //     </td>
    //   </tr>
    // );
  });

  const ghsaEvents = georgiaFilterEvents.map(event => {
    // console.log(event);
    var date_test = new Date(event.date.replace(/-T/g, "/"));
    const event_time_date = moment(new Date(event.date));
    let time = event_time_date.format("h:mma");
    let date = event_time_date.format("LL");
    // console.log(date_test);

    return (
      <Column>
        <Event>
          <EventSquare
            eventkey={event.key}
            headline={event.headline}
            subheadline={event.subheadline}
            eventtime={time}
            eventdate={date}
          />
        </Event>
      </Column>
    );
    // return (
    //   <tr key={event.id}>
    //     <td>{event.key}</td>
    //     <td>{event.headline}</td>
    //     <td>{event.subheadline}</td>
    //     <td>
    //       {" "}
    //       {time} on {date}
    //     </td>
    //   </tr>
    // );
  });

  return (
    <div className="Events-Page">
      {" "}
      <header>
        <div className="Filters">
          <label>
            Choose State {"  "}
            <select className="ClassList" onChange={e => changeClass(e)}>
              {/* <option> Choose Classification</option> */}
              <option value="Georgia"> Georgia </option>
              <option value="Texas"> Texas</option>
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
      </header>
      <div>
        <Table>
          {classification !== "Texas" ? (
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
