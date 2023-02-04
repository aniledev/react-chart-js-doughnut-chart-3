// https://www.chartjs.org/docs/latest/charts/doughnut.html
// https://react-chartjs-2.js.org/components/doughnut
// https://react-chartjs-2.js.org/docs/working-with-events/#getdatasetatevent

import React, { useState, useRef } from "react";
import { Chart as ChartJS, ArcElement, Legend, Tooltip } from "chart.js";
import {
  Doughnut,
  getDatasetAtEvent,
  getElementAtEvent
} from "react-chartjs-2";
import { Container } from "./Container";
import { theme } from "./theme";
// import type { Data } from "./types";
// import { rgbaStringToObject, areArraysIdentical } from "./custom-functions";
// import "chartjs-plugin-labels";

ChartJS.register(ArcElement, Legend, Tooltip);

const initialOuterRingState: string[] = Array(10).fill(theme.hiddenRing);
const initialInnerRingState: string[] = Array(4).fill(theme.innerRing);

export default function App() {
  const [innerRing, setInnerRing] = useState(initialInnerRingState);
  const [outerRing, setOuterRing] = useState(initialOuterRingState);
  // const [innerArc, setInnerArc] = useState<number>(null);

  // Use a ref to get the chart instance
  const chartRef = useRef<ChartJS>(null);

  // Function that gets the indices of outer arcs based on the inner arc
  const getOuterArcIndices = (num: number): number[] => {
    switch (num) {
      case 0:
        return [0, 1];
      case 1:
        return [2, 3];
      case 2:
        return [4, 5, 6];
      case 3:
        return [7, 8, 9];
      default:
        return [];
    }
  };

  const handleChartUpdate = (
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    // Use a ref to access the chart instance
    const { current: chart } = chartRef;

    if (!chart) {
      return;
    }

    // If user does not click on an ArcElement with a data set, early return
    const datasetAtEvent = getDatasetAtEvent(chart, event)[0];
    if (!datasetAtEvent) {
      setInnerRing(initialInnerRingState);
      setOuterRing(initialOuterRingState);
      // setInnerArc(null);
      return;
    }

    // If user doesn't click on an inner ArcElement, early return
    const { datasetIndex: datasetAtEventIndex } = datasetAtEvent;
    if (datasetAtEventIndex !== 1) return;

    // Determines which inner arc element is clicked on
    const { index: innerArcIndex } = getElementAtEvent(chart, event)[0];
    // setInnerArc(innerArcIndex);

    // Get the new state to show/hide the outer arcs
    const updatedOuterRing = [...initialOuterRingState];
    getOuterArcIndices(innerArcIndex).forEach((index) => {
      updatedOuterRing[index] = theme.outerRing;
    });

    const updatedInnerRing = [...initialInnerRingState];
    // Get the new state of the inner ring to display the active color
    updatedInnerRing[innerArcIndex] = theme.innerRingActive;

    setOuterRing(updatedOuterRing);
    setInnerRing(updatedInnerRing);
  };

  // Define data for creating the doughnut chart
  const data = {
    datasets: [
      {
        labels: ["1B", "2B", "3B", "4B", "5B", "6B", "7B", "8B", "9B", "10B"],
        data: [
          50 / 4,
          50 / 4,
          50 / 4,
          50 / 4,
          50 / 6,
          50 / 6,
          50 / 6,
          50 / 6,
          50 / 6,
          50 / 6
        ],
        backgroundColor: outerRing,
        borderColor: Array(10).fill(theme.borderColor),
        hoverBackgroundColor: outerRing,
        hoverBorderColor: theme.hiddenRing,
        borderWidth: 7
      },
      {
        labels: ["1", "2", "3", "4"],
        data: Array(4).fill(1),
        backgroundColor: innerRing,
        borderColor: Array(4).fill(theme.borderColor),
        hoverBorderColor: theme.innerRingBorderColor,
        borderWidth: 7
      }
    ]
  };

  // Define chart options
  const options: any = {
    plugins: {
      legend: {
        display: false
      },
      tooltips: {
        display: false
      }
      // labels: {
      //   display: true,
      //   arc: true,
      //   render: function (args) {
      //     return args.dataset.labels[args.index];
      //   },
      //   fontColor: function (args) {
      //     const arcElementDataSet: number[] = args.dataset.data;
      //     const outerRingDataset: number[] = data.datasets[0].data;
      //     const arcIsOuterRing = areArraysIdentical(
      //       arcElementDataSet,
      //       outerRingDataset
      //     );
      //     const arcIsHidden = !getOuterArcIndices(innerArc).includes(
      //       args.index
      //     );
      //     //Ccheck if the element is one of the ones that is hidden, then return white for the color
      //     if (arcIsOuterRing && arcIsHidden) {
      //       return "white";
      //     }
      //     const rgba = rgbaStringToObject(
      //       args.dataset.backgroundColor[args.index]
      //     );
      //     if ("r" in rgba) {
      //       const threshold = 140;
      //       const intensity = 0.299 * rgba.r + 0.587 * rgba.g + 0.114 * rgba.b;
      //       return intensity > threshold ? "black" : "white";
      //     }
      //   }
      // }
    },
    responsive: true,
    animations: false
  };

  return (
    <Container className="App" onClick={handleChartUpdate}>
      <Doughnut
        ref={chartRef}
        onClick={handleChartUpdate}
        options={options}
        data={data}
      />
    </Container>
  );
}
