import React, { useState } from "react";
import { Table } from "reactstrap";

// changing to function
function EventsTable(props) {
  const [classification, setClassification] = useState("GHSA");

  console.log(props);
  console.log(classification);

  const changeClass = e => {
    setClassification(e.target.value);
  };

  const txsaEvents = props.tsa.map(event => {
    // console.log(event);
    return (
      <tr>
        <td>{event.key}</td>
        <td>{event.headline}</td>
        <td>{event.subheadline}</td>
        <td>{event.date}</td>
      </tr>
    );
  });

  const ghsaEvents = props.ghsa.map(event => {
    // console.log(event);
    return (
      <tr>
        <td>{event.key}</td>
        <td>{event.headline}</td>
        <td>{event.subheadline}</td>
        <td>{event.date}</td>
      </tr>
    );
  });

  return (
    <div>
      {" "}
      <select id="ClassList" onChange={e => changeClass(e)}>
        <option> Choose Classification</option>
        <option value="FHSA"> GHSA </option>
        <option value="TXSA"> TXSA </option>
      </select>
      <div className="Events-Table">
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
