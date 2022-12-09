import styled, { keyframes } from "styled-components";

interface ISpiner {
  width?: string;
  height?: string;
}

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const Spiner = styled.div<ISpiner>`
  animation: ${rotate360} 1s linear infinite;
  transform: translateZ(0);
  border-top: 1px solid grey;
  border-right: 1px solid grey;
  border-bottom: 1px solid grey;
  border-left: 1px solid black;
  background: transparent;
  width: ${(props) => props.width || "12px"};
  height: ${(props) => props.height || "12px"};
  border-radius: 50%;
`;
