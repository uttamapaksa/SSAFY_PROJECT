import { styled } from "styled-components";

// export const OvVidoDiv = styled.div`
//   background-color: red;
// `;

export const VedioOuterDiv = styled.div`
  position: relative;
  overflow: hidden;
  aspect-ratio: 3 / 2;
  /* height: 100%; */
  border-radius: 12px;
  &:hover {
    background-color: red;
    opacity: 0.5;
  }
`;

export const Video = styled.video`
  width: 120%;
  height: 120%;
  position: relative;
  left: -10%;
  top: -10%;
`;

export const VedioInnerDiv = styled.div`
  position: absolute;
  left: 2%;
  top: 0;
  color: white;
  font-size: 10px;
  z-index: 5;
`;
export const VedioHoverMenu = styled.div`
  position: absolute;
  width: 40%;
  height: 16%;
  color: white;
  border-radius: 12px;
  background-color: black;
  border-width: 2px;
  border-style: solid;
  border-color: white;
  opacity: 0.8;
  font-size: 20px;
  z-index: 10;
  top:50%;
  left:50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background-color: gray;
    opacity: 0.9;
  }
`;