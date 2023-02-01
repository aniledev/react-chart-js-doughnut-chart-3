// https://www.chartjs.org/docs/latest/charts/doughnut.html
// https://react-chartjs-2.js.org/components/doughnut
// https://react-chartjs-2.js.org/docs/working-with-events/#getdatasetatevent

/* For text labels I would use a plugin simliar to https://github.com/emn178/chartjs-plugin-labels or 
https://chartjs-plugin-datalabels.netlify.app/samples/charts/doughnut.html
*/

import React, { useState, useRef } from "react";
import { Chart as ChartJS, ArcElement, Legend } from "chart.js";
import {
  Doughnut,
  getDatasetAtEvent,
  getElementAtEvent
} from "react-chartjs-2";
import { Container } from "./Container";
import { theme } from "./theme";

ChartJS.register(ArcElement, Legend);

const initialOuterRingState: string[] = Array(10).fill(theme.hiddenRing);
const initialInnerRingState: string[] = Array(4).fill(theme.innerRing);

export default function App() {
  const [innerRing, setInnerRing] = useState(initialInnerRingState);
  const [outerRing, setOuterRing] = useState(initialOuterRingState);

  // Use a ref to get the chart instance
  const chartRef = useRef<ChartJS>(null);

  const handleChartUpdate = (
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    // Use a ref to access the chart instance
    const { current: chart } = chartRef;

    // If user does not click on an ArcElement with a data set, early return
    const datasetAtEvent = getDatasetAtEvent(chart, event)[0];
    // console.log(datasetAtEvent);
    if (!datasetAtEvent) {
      setInnerRing(initialInnerRingState);
      setOuterRing(initialOuterRingState);
      return;
    }

    // If user doesn't click on an inner ArcElement, early return
    const { datasetIndex: datasetAtEventIndex } = datasetAtEvent;
    if (datasetAtEventIndex !== 1) return;

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

    // Determines which inner arc element is clicked on
    const { index: innerArcIndex } = getElementAtEvent(chart, event)[0];

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

  // Define chart options
  const options: any = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      }
    },
    animations: false
  };

  // Define data for creating the doughnut chart
  const data = {
    datasets: [
      {
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
        data: Array(4).fill(1),
        backgroundColor: innerRing,
        borderColor: Array(4).fill(theme.borderColor),
        hoverBorderColor: theme.innerRingBorderColor,
        borderWidth: 7
      }
    ]
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
