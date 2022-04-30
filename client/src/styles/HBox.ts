import styled from "styled-components";
import { Box } from "./Box";

export const HBox = styled(Box)`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: inherit;
`;
