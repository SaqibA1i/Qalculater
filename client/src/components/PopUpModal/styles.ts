import styled from "styled-components";
import { Box } from "../../styles/Box";
import { HBox } from "../../styles/HBox";
import { VBox } from "../../styles/VBox";

type Props = {
    isOpen: boolean;
}
export const FullContainer = styled(HBox) <Props>`
${({ isOpen, theme }) => `
    backdrop-filter: blur(1px);
    height: 100vh;
    position: absolute;
    width: 100vw;
    z-index: ${isOpen ? 100 : -1};
    opacity: ${isOpen ? 1 : 0};
    display: flex;
    background: ${theme.backdrop};
    justify-content: center;
    align-items: baseline;
`}
`

export const StyledModal = styled(Box)`
    ${({ theme }) => `
        background: ${theme.accent};
        max-width: 500px;
        margin: 20px;
        padding: 20px;
        width: inherit;
        margin-top: 90px;
        color: ${theme.text};
        box-shadow: ${theme.boxShadow};
        border-radius: 10px;
    `}
`

export const StyledHBox = styled(HBox)`
    justify-content: space-between;
    margin-bottom: 2rem;
`;

export const StyledCancel = styled(HBox)`
    border-radius: 50%;
    cursor: pointer;
    ${({ theme }) => `
        &:hover {
            color: ${theme.textAccent}
        }
    `}
`;
