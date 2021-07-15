import React, { useEffect, useState } from "react";
// import Chart from "chart.js";
import { Chart, Title, PieController, ArcElement } from "chart.js";
Chart.register(Title, PieController, ArcElement);

// import {Chart} from 'chart.js';

const GenderChart = (props) => {
  const [dataValues, setDataValues] = useState();
  const [dataLabels, setDataLabels] = useState();
  const [canvasRef, setCanvasRef] = useState(React.createRef());
  // const ref = React.createRef();
  // var ctx = document.getElementById('myChart').getContext('2d'); // 2d context

  useEffect(() => {
    setDataLabels(Object.keys(props.data));
    setDataValues(Object.values(props.data));
    return () => {
    };
  }, [props.data]);

  useEffect(() => {

    var colors = ["#080357", "#CE4760", "#FFC15E", "#F5FF90", "#D6FFB7"];
    var mychart = new Chart(canvasRef.current, {
      type: "doughnut",

      options: {
        maintainAspectRatio: false,
        responsive: true,      
        animation: {
          animateScale: true,
          animateRotate: true,
        },
        plugins: {
          legend: {
            display: true,
            position: "top",
          },  
          title: {
            display: true,
            text: "Genero",
          },
          datalabels: {
            display: true,
            color: "red",
          },
          labels: {
            display: true,
          }
        },
      },
      data: {
        labels: dataLabels,
     
        datasets: [
          {
            data: dataValues,
            labels: dataLabels,
            label: "my label",
            backgroundColor: colors,
            hoverBackgroundColor: ["#05b8ff"],
            hoverOffset: 10,
          },
        ],
      },
    });

    return () => {
      // setCanvasRef("");
      mychart.destroy();
    };
  }, [canvasRef,dataValues, dataLabels, props.data]);
  return (
    <React.Fragment>
      <div className="col-6 mr-auto ml-auto">
        <canvas ref={canvasRef} width="250" height="250"></canvas>
      </div>
    </React.Fragment>
  );
};

export default GenderChart;
