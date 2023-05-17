import styled from "styled-components";
import { Box } from "../../styles/Box";
import { HBox } from "../../styles/HBox";
import { VBox } from "../../styles/VBox";

export const Portfolio = styled.img`
    border-radius: 50%;
    max-width: 100px;
    height: 100px;
`
export const StyledHBox = styled(HBox)`
    justify-content: space-between;
    width: -webkit-fill-available;
    max-width: 500px;
    border-radius: 10px;
    padding: 20px;
    font-weight: 900;
    font-size: 1.5rem;
`
export const StyledVBox = styled(VBox)`
    max-height: 90vh;
    overflow-y: scroll;
    gap: 1rem;
    padding: 0 3rem;
    padding-bottom: 100px;
`
export const StyledHr = styled.hr`
    width: -webkit-fill-available;
    max-width: 600px;
    ${({ theme }) => `
        border: 1px solid ${theme.text};
        background: ${theme.text};
    `}
`;
