import styled from "styled-components";
import { HBox } from "../../../styles/HBox";
import { Text } from "../../../styles/Text";

export const StyledHBox = styled(HBox)`
  align-items: flex-end;
  justify-content: space-around;
  height: 200px;
`;
type Props = {
    average: number;
}
export const StyledLine = styled(HBox) <Props>`
  position: absolute;
  left: 0;
  padding: 0 20px;
    /* Tablet */
    ${({ average }) => `
        top:${-2 * average + 385}px;
            @media only screen and (min-width: 600px) {
                top:${-2 * average + 397}px;
          }
        `
    }
 
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
