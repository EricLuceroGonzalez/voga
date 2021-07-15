import React, { useEffect, useState } from "react";
import GenderChart from "./GenderChart";
import BarChart from "./BarChart";
import moment from "moment";
import LineChart from "./LineChart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCheck, faUserClock } from "@fortawesome/free-solid-svg-icons";
import "./Charts.css";
import TimeClock from "./TimeClock";

const ChartsComponent = (props) => {
  const [genderN, setGenderN] = useState({ genre: "" });
  const [countries, setCountries] = useState([]);
  const [viewports, setViewports] = useState([]);
  const [days, setDays] = useState([]);
  const [hoursOfDay, setHoursOfDay] = useState([]);
  const [timeSerie, setTimeSerie] = useState([]);
  const [totalN, setTotalN] = useState("");
  const [userDevice, setUserDevice] = useState([]);
  const [lastOne, setLastOne] = useState("");
  useEffect(() => {
    if (props.data) {
      setTotalN(props.data.length);
      let genders;
      let thisCountry = [];
      let allViewports;
      let weekDays;
      let hoursAday;
      let timeline;
      let userSystem;
      genders = props.data.map((item) => {
        return item.gender;
      });

      props.data.map((item) => {
        if (!item.country) {
          thisCountry.push("Undefined");
        } else {
          thisCountry.push(item.country);
        }

        // return item.country;
      });
      allViewports = props.data.map((item) => {
        return (
          item.device.windowPixels[0].toString() +
          "x" +
          item.device.windowPixels[1].toString()
        );
      });
      userSystem = props.data.map((item) => {
        return item.device.oSystem;
      });
      weekDays = props.data.map((item) => {
        return moment(item.creationDate).format("dddd");
      });
      hoursAday = props.data.map((item) => {
        return moment(item.creationDate).format("LT").split(":")[0];
      });

      timeline = props.data.map((item) => {
        return moment(item.creationDate).format("l").split(":")[0];
      });

      setGenderN((prevState) => ({
        ...prevState,
        genre: {
          hombres: countFreq(genders, "male"),
          mujeres: countFreq(genders, "female"),
        },
      }));
      setCountries(foo(thisCountry));
      setViewports(foo(allViewports));
      setDays(foo(weekDays));
      setHoursOfDay(foo(hoursAday));
      setTimeSerie(foo(timeline));
      setUserDevice(foo(userSystem));
    }
    if (props.data[props.data.length - 1]) {
      setLastOne(props.data[props.data.length - 1].creationDate);
    }
  }, [props.data]);

  const foo = (arr) => {
    var a = [],
      b = [],
      prev;

    arr.sort();
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] !== prev) {
        a.push(arr[i]);
        b.push(1);
      } else {
        b[b.length - 1]++;
      }

      prev = arr[i];
    }
    // console.log(a);
    // console.log(b);

    return [a, b];
  };

  const countFreq = (a, variable) => {
    const aCount = new Map(
      [...new Set(a)].map((x) => [x, a.filter((y) => y === x).length])
    );
    return aCount.get(variable);
  };
  // TODO:Add show/collapse charts and data
  // TODO: Date selector
  // TODO: Sort data and percentage and other calcs
  return (
    <div className="col-12 col-md-12 col-lg-12 ml-auto mr-auto">
      <div className="d-flex flex-column flex-md-row col-12 col-md-12 chart-box mb-5 ml-auto mr-auto">
        <div className="col-12 col-md-4 totalN">
          <div className="mr-auto ml-auto userCheck">
            <FontAwesomeIcon icon={faUserCheck} /> {totalN}
            <div>
              <FontAwesomeIcon icon={faUserClock} />{" "}
              {lastOne ? moment(lastOne).startOf("").fromNow() : ""}
              <TimeClock />
            </div>
          </div>
        </div>
        {genderN ? <GenderChart data={genderN.genre} /> : ""}
      </div>
      <div className="col-12 col-md-12 col-xl-12 mr-auto ml-auto">
        <div className="d-flex flex-column flex-lg-row col-12">
          <div className="chart-box col-12 col-lg-6">
            {timeSerie ? (
              <LineChart
                chartTitle={"Trafico"}
                yLabel={"Visitas"}
                data={timeSerie}
              />
            ) : (
              ""
            )}
          </div>
          <div className="chart-box col-12 col-lg-6">
            {countries ? (
              <BarChart
                chartTitle={"Países"}
                yLabel={"Visitas"}
                data={countries}
              />
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="d-flex flex-column flex-lg-row col-12">
          <div className="chart-box col-12 col-lg-6">
            {hoursOfDay ? (
              <BarChart
                chartTitle={"Hora del dia (0 - 24)"}
                yLabel={"Visitas"}
                data={hoursOfDay}
              />
            ) : (
              ""
            )}{" "}
          </div>
          <div className="chart-box col-12 col-lg-6">
            {days ? (
              <BarChart chartTitle={"Dias"} yLabel={"Visitas"} data={days} />
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="d-flex flex-column flex-lg-row col-12">
          <div className="chart-box col-12 col-lg-6">
            {userDevice ? (
              <BarChart
                chartTitle={"Dispositivo"}
                yLabel={"Acumulados"}
                data={userDevice}
              />
            ) : (
              ""
            )}
          </div>
          <div className="chart-box col-12 col-lg-6">
            {viewports ? (
              <BarChart
                chartTitle={"Pantalla"}
                yLabel={"Visitas"}
                data={viewports}
              />
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartsComponent;
