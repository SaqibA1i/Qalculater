import styled from "styled-components";
import { Box } from "../../../styles/Box";
import { HBox } from "../../../styles/HBox";
import { VBox } from "../../../styles/VBox";

export const StyledPill = styled(HBox)`
    margin-right: 30px;
`


export const BackWrapper = styled(HBox)`
    border-radius: 15px;
    box-shadow: 5px 5px 15px 5px rgb(0 0 0 / 13%);
    &:hover {
        cursor: pointer;
    };
    ${({ theme }) => `
        background: ${theme.accentGradient};
        color: ${theme.text};

    `}
`
export const StyledVBox = styled(VBox)`
    padding: 15px;
    width: max-content; 
    border-radius: 15px;
    gap: 0.5rem;
    align-items: flex-start;
    ${({ theme }) => `
        background: ${theme.accent};
    `}
`
