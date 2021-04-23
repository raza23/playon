import React, { Component } from "react";
import { Table } from "reactstrap";

export default class EventsTable extends Component {
  render() {
    console.log(this.props);

    const fhsaEvents = this.props.ghsa.map(event => {
      console.log(event);
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
          <tbody>{fhsaEvents}</tbody>
        </Table>
      </div>
    );
  }
}
