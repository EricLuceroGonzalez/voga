import React, { useState, useEffect } from "react";
import moment from "moment";
import "moment/locale/es";
import "./TimeClock.css";

const TimeClock = () => {
  const [time, setTime] = useState();
  const [actualDate, setActualDate] = useState();

  useEffect(() => {
    moment.locale("es");
    const theInterval = setInterval(() => {
      // setTime(moment().format("dddd, MMMM DD YYYY, h:mm:ss a"));
      setTime(moment().format("LTS"));
    }, 1000);
    setActualDate(moment().format("dddd")+ ", " + moment().format("ll"));

    return () => {
      clearInterval(theInterval);
    };
  }, []);

  return (
    <div className="time-text">
      <div>{actualDate}</div>
      <div>{time}</div>
    </div>
  );
};

export default TimeClock;
