import styled from "styled-components";
import { Box } from "./Box";

export const Text = styled(Box)`
    font-weight: 500;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-top: 5px;
`
