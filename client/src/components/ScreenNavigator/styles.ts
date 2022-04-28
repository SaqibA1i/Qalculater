import styled from "styled-components";
import { Box } from "../../styles/Box";

export const ScreenNav = styled(Box)`
    font-family: Nunito;

    ${({ theme }) =>
        `
        background: ${theme.main};
        min-height: 100vh;

        `
    }
`
