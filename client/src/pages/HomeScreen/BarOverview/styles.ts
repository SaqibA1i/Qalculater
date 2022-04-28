import styled from "styled-components";
import { HBox } from "../../../styles/HBox";
import { Text } from "../../../styles/Text";

export const StyledHBox = styled(HBox)`
  align-items: end;
  justify-content: space-around;
`;
export const StyledLine = styled(HBox)`
  position: absolute;
  left: 0;
  padding: 0 20px;
`;
export const StyledHr = styled.hr`
  background: transparent;
  border: 0;
  border-top: 2px dashed rgba(51, 51, 51, 0.527);
  height: 0;
  margin-left: 20px;
  width: 90vw;
`;
export const HoveringText = styled(Text)`
  position: relative;
  top: -25px;
`;
