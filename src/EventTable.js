import React, { useState, useEffect } from "react";
import EventSquare from "./EventSquare";
import { Table } from "reactstrap";

import { DateRange } from "react-date-range";

import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css";

import styled from "styled-components";

var moment = require("moment");
moment().format();
// changing to function
function EventsTable(props) {
  const [classification, setClassification] = useState("Georgia");
  const [texasEvents, setTexasEvents] = useState([props.tsa]);
  const [georgiaEvents, setGeorgiaEvents] = useState([props.ghsa]);

  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection"
    }
  ]);

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

  const filterTexasEvents = () => {
    let startDate = moment(dates[0].startDate).format("MM-DD");
    let endDate = moment(dates[0].endDate).format("MM-DD");

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
    let startDate = moment(dates[0].startDate).format("MM-DD");
    let endDate = moment(dates[0].endDate).format("MM-DD");
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
  }, [dates]);

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

  return (
    <div className="Events-Page">
      <DateRange
        editableDateInputs={true}
        onChange={item => setDates([item.selection])}
        moveRangeOnFirstSelection={false}
        ranges={dates}
      />
      <header>
        <div className="Filters">
          <label>
            Choose State {"  "}
            <select className="ClassList" onChange={e => changeClass(e)}>
              <option value="Georgia"> Georgia </option>
              <option value="Texas"> Texas</option>
            </select>
          </label>
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
