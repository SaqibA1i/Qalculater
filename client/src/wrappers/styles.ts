import styled from "styled-components";
import { Box } from "../styles/Box";
import { VBox } from "../styles/VBox";

export const StyledVBox = styled(VBox)`
    gap: 1rem;
    align-items: stretch;
`;

export const StyledHr = styled.hr`
    ${({ theme }) => `
        background: ${theme.accent};
        border: 2px solid ${theme.accent};
        width: 100%;
        margin: 20px;
    `}
`;

export const ErrorMessage = styled(Box)`
    margin-top: 20px;
    text-align: center;
    ${({ theme }) => `
        color: ${theme.error}
    `}
`;
