import type { ChartData, ChartOptions } from "chart.js";

// export interface DoughnutProps {
//   options: ChartOptions<"doughnut">;
//   data: ChartData<"doughnut">;
// }

export interface Theme {
  borderColor: string;
  innerRing: string;
  outerRing: string;
  innerRingActive: string;
  hiddenRing: string;
  innerRingBorderColor: string;
}

export interface ContainerProps {
  onClick?: any;
  className?: string;
  children?: React.ReactNode;
}
