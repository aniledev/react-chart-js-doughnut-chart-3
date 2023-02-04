import React, { MouseEvent } from "react";
import { Chart as ChartJS } from "chart.js";

declare module "react-chartjs-2" {
  export function getDatasetAtEvent(chart: ChartJS, event?: any): any;

  export function getElementAtEvents(chart: ChartJS, event?: any): any;

  export interface DoughnutProps {
    onClick?: (
      event: React.MouseEvent<HTMLCanvasElement | HTMLDivElement, MouseEvent>
    ) => void;
    options?: object | undefined;
    children: Element;
  }
  export default class Doughnut extends React.Component<DoughnutProps> {}
}
