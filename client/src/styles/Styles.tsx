import { Plus } from "react-bootstrap-icons";
import styled from "styled-components";
import { THEME } from "../redux/carousel/types";
import { Box } from "./Box";

const themeUnaware = {
  boxShadow: "5px 5px 15px 5px rgb(0 0 0 / 13%)",
};

export const theme = {
  [THEME.DARK]: {
    main: "rgb(27, 28, 34)",
    accent: "#25262c",
    accentGradient: "linear-gradient(#dfbd00, #c49703)",
    buttonAccent: "linear-gradient(#dfbd00, #c49703)",
    text: "aliceblue",
    textAccent: "#c49703",
    error: "#ff8044",
    ...themeUnaware,
  },
  [THEME.LIGHT]: {
    main: "aliceblue",
    accent: "white",
    accentGradient: "linear-gradient(#2c77ff,rgba(44,118,255,.761))",
    buttonAccent: "#c3d7d8",
    text: "#25262c",
    textAccent: "rgba(44,118,255,.761)",
    error: "#ff8044",
    ...themeUnaware,
  },
};

export type StyleProps = React.CSSProperties;

export const StyledAddButton = styled(Box)`
  ${({ theme }) => `
        background: ${theme.buttonAccent};
        cursor: pointer;
        padding: 10px;
        color: #333;
    `}
`;

export const AddButton = ({
  onClick,
  borderRadius,
}: {
  onClick: () => void;
  borderRadius: string;
}) => (
  <StyledAddButton onClick={onClick} borderRadius={borderRadius}>
    <Plus size={50} />
  </StyledAddButton>
);
