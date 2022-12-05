import styled, { keyframes } from "styled-components";

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const Spiner = styled.div`
  animation: ${rotate360} 1s linear infinite;
  transform: translateZ(0);
  border-top: 1px solid grey;
  border-right: 1px solid grey;
  border-bottom: 1px solid grey;
  border-left: 1px solid black;
  background: transparent;
  width: 12px;
  height: 12px;
  border-radius: 50%;
`;
