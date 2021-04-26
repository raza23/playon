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
  const [texasEvents, setTexasEvents] = useState([props.tsa]);
  const [georgiaEvents, setGeorgiaEvents] = useState([props.ghsa]);
  const [filter, setFilter] = useState(false);

  const startRef = useRef("");

  const [startDate, setStartDate] = useState("04-01");
  const [endDate, setEndDate] = useState("04-30");

  //! STYLED COMPONENTS

  const Event = styled.div`
    position: relative;
    width: 200px;
    height: 160px;
    display: inline-block;
    padding: 1px;
    border: 1px solid white;

    background: #001c34;
    box-shadow: 0px 1px 20px rgba(0, 0, 0, 0.1);
    border-radius: 2px;
  `;

  const Column = styled.div`
    position: relative;

    float: left;
    width: 18.33%;
    padding: 4px 0px 4px 25px;

    // border: 1px solid blue;
    left: 00px;
    top: 1px;
  `;

  // !

  console.log("texas", texasEvents);
  console.log("georgia", georgiaEvents);

  const changeClass = e => {
    setClassification(e.target.value);
  };

  const filterStartDate = e => {
    setStartDate(e.target.value);
  };

  const filterEndDate = e => {
    setEndDate(e.target.value);
  };

  const filterTexasEvents = () => {
    fetch(
      `https://challenge.nfhsnetwork.com/v2/search/events/upcoming?state_association_key=542bc38f95&card=true&size=50&start=0&from=2021-${startDate}T00:00:00.000Z&to=2021-${endDate}T23:59:00.000Z`
    )
      .then(res => {
        return res.json();
      })
      .then(data => setTexasEvents(data.items))
      .catch(err => {
        console.log(err);
      });
  };

  const filterGeorgiaEvents = () => {
    fetch(
      `https://challenge.nfhsnetwork.com/v2/search/events/upcoming?state_association_key=18bad24aaa&card=true&size=50&start=0&from=2021-${startDate}T00:00:00.000Z&to=2021-${endDate}T23:59:00.000Z`
    )
      .then(res => {
        return res.json();
      })
      .then(data => setGeorgiaEvents(data.items))
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    console.log("classification");
    filterTexasEvents();
    filterGeorgiaEvents();
  }, [startDate, endDate]);

  const txsaEvents = texasEvents.map(event => {
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

  const ghsaEvents = georgiaEvents.map(event => {
    // console.log(event);
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
              Start Date{"   "}
              <input
                onBlur={e => filterStartDate(e)}
                ref={startRef}
                placeholder="MM-DD"
                type="text"
                name="start"
              />
            </label>
            <label>
              End Date{"   "}
              <input
                onBlur={e => filterEndDate(e)}
                ref={startRef}
                placeholder="MM-DD"
                type="text"
                name="start"
              />
            </label>
            {/* <button onClick={filterEvents}>Submit</button> */}
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
