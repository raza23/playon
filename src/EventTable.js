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

  // console.log(startRef.current.value);
  const [startDate, setStartDate] = useState("04");

  //! STYLED COMPONENTS

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

  // !

  console.log("texas", texasEvents);

  const changeClass = e => {
    setClassification(e.target.value);
  };

  const filterStartDate = e => {
    setStartDate(e.target.value);
  };

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
    const event_time_date = moment(new Date(event.date));
    let time = event_time_date.add(4, "hours").format("h:mma");
    let date = event_time_date.format("LL");

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
