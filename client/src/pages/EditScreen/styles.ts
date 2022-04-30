import styled from "styled-components";
import { HBox } from "../../styles/HBox";
import { VBox } from "../../styles/VBox";

export const StyledVBox = styled(VBox)`
    align-items: start;
    min-width: -webkit-fill-available;
`;

export const StyledContainer = styled(HBox)``;

export const TextBox = styled(HBox)`
    font-size: 1.5rem;
    font-weight: 600;
    padding:5px 20px;
    z-index: 100;
`;
