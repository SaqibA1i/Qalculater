import styled from "styled-components";
import { HBox } from "../../../styles/HBox";
import { Text } from "../../../styles/Text";

export const StyledHBox = styled(HBox)`
  align-items: end;
  justify-content: space-around;
  height: 200px;
`;
export const StyledLine = styled(HBox)`
  position: absolute;
  left: 0;
  padding: 0 20px;
  
`;
export const StyledHr = styled.hr`
  background: transparent;
  border: 0;
  height: 0;
  margin-left: 20px;
  width: calc(100vw - 116px);

  ${({ theme }) => `
    border-top: 2px dashed red;
  `}
`;
export const HoveringText = styled(Text)`
  position: relative;
  font-size: 0.8rem;
  top: -25px;
`;
