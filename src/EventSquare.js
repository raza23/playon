import React from "react";
import styled from "styled-components";

function EventSquare(props) {
  const HeadlineText = styled.p`
    position: absolute;
    height: 4px;
    left: 5%;
    // right: 18%;
    top: 0px;

    font-family: "Poppins", sans-serif;

    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 15px;
    /* or 81% */

    // text-align: center;
    mix-blend-mode: normal;
    opacity: 0.8;

    color: #ffffff;
  `;

  const SubHeadlineText = styled.p`
    position: absolute;
    height: 64px;
    // left: 5%;
    // right: 18%;
    top: 30px;
    padding: 10px;

    font-family: "Poppins", sans-serif;

    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 13px;
    /* or 81% */

    // text-align: center;

    color: #ffffff;
  `;

  const TimeText = styled.p`
    position: absolute;
    height: 0px;
    left: 5%;
    // right: 18%;
    top: 100px;

    font-family: "Poppins", sans-serif;

    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 15px;
    /* or 81% */

    // text-align: center;
    mix-blend-mode: normal;
    // opacity: 0.8;

    color: #ffffff;
  `;

  const KeyText = styled.p`
    position: absolute;
    height: 0px;
    left: 5%;
    // right: 18%;
    top: 120px;

    font-family: "Poppins", sans-serif;

    font-style: normal;
    font-weight: normal;
    font-size: 10px;
    line-height: 15px;
    /* or 81% */

    // text-align: center;
    mix-blend-mode: normal;
    opacity: 0.5;

    color: #ffffff;
  `;

  return (
    <div>
      <HeadlineText>{props.headline}</HeadlineText>
      <SubHeadlineText>{props.subheadline}</SubHeadlineText>
      <TimeText>
        {props.eventdate} at {props.eventtime}
      </TimeText>
      <KeyText>{props.eventkey}</KeyText>
    </div>
  );
}

export default EventSquare;
