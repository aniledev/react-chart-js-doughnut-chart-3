import { ContainerProps } from "./types";
import styled from "styled-components";

// Create styled container component
export const Container = styled.div<ContainerProps>`
  display: flex;
  margin: auto 0;

  /* 
  Even with using the responsive property in the options object for the chart,
  it was still not being responsive. When the window shrank down, the chart resized, 
  but when the window expanded again, it did not resize. Some simple styling for a fix 
  https://github.com/jtblin/angular-chart.js/issues/614
  */
  && canvas {
    width: 40% !important;
    height: 40% !important;
    margin: 3rem auto;
  }
`;
