import React, { useEffect, useState } from "react";
import {
  Chart,
  Title,
  LineController,
  PointElement,
  LineElement,
} from "chart.js";
Chart.register(Title, LineController, PointElement, LineElement);

// import {Chart} from 'chart.js';

const LineChart = (props) => {
  const [dataValues, setDataValues] = useState();
  const [dataLabels, setDataLabels] = useState();
  const [canvasRef, setCanvasRef] = useState(React.createRef());
  // const ref = React.createRef();
  // var ctx = document.getElementById('myChart').getContext('2d'); // 2d context

  useEffect(() => {
    setDataLabels(props.data[0]);
    setDataValues(props.data[1]);
    // setDataLabels(Object.keys(props.data[0]));
    // setDataValues(Object.values(props.data[1]));
    return () => {};
  }, [props.data]);

  useEffect(() => {
    var colors = ["#42C748", "#509453", "#47D64E", "#169C1C", "#679C69"];
    var mychart = new Chart(canvasRef.current, {
      type: "line",
      data: {
        datasets: [
          {
            //   label: 'ho',
            label: 'dataLabels',
            data: dataValues,
            borderColor: colors,
            tension: 0.1,
            hoverBackgroundColor: ["#3E1EA8"],
          },
        ],
        labels: dataLabels,
      },
      options: {
        responsive: true,
        tooltips: {
          callbacks: {
            backgroundColor: "#FFF",
            titleFontSize: 16,
            titleFontColor: "#0066ff",
            bodyFontColor: "#000",
            bodyFontSize: 14,
            displayColors: false,
          },
        },
        // layout:{
        //     padding: {
        //         top: 25,
        //         left: 15,
        //         right: 15,
        //         bottom: 25
        //     }
        //   },
        scales: {
          y: {
            beginAtZero: true,
            display: true,
            title: {
              display: true,
              text: props.yLabel ? props.yLabel : "",
            },
          },
        },
        maintainAspectRatio: false,
        legend: {
          display: true,
        },
        plugins: {
          title: {
            display: true,
            text: props.chartTitle,
          },
        },
      },
    });

    return () => {
      // setDataValues("");
      // setDataLabels("");
      // setCanvasRef("");
      mychart.destroy();
    };
    // }, [dataValues, dataLabels]);
  }, [canvasRef, dataValues, dataLabels, props]);
  return (
    <React.Fragment>
      <div style={{ margin: "4em auto" }}>
        <canvas ref={canvasRef} width="250" height="250"></canvas>
      </div>
    </React.Fragment>
  );
};

export default LineChart;
