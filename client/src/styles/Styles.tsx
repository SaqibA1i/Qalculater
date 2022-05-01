import { Plus } from "react-bootstrap-icons";
import styled from "styled-components";
import { THEME } from "../redux/carousel/types";
import { Box } from "./Box";
import { HBox } from "./HBox";

const themeUnaware = {
  boxShadow: "5px 5px 15px 5px rgb(0 0 0 / 13%)",
  backdrop: "#00000061",
  light: "aliceblue",
  error: "#ff5544",
};

export const theme = {
  [THEME.DARK]: {
    main: "rgb(27, 28, 34)",
    accent: "#25262c",
    accentGradient: "linear-gradient(#dfbd00, #c49703)",
    buttonAccent: "linear-gradient(#dfbd00, #c49703)",
    text: "aliceblue",
    textAccent: "#dfbd00",
    emptyBar: "#2e2f33",
    ...themeUnaware,
  },
  [THEME.LIGHT]: {
    main: "aliceblue",
    accent: "white",
    accentGradient: "linear-gradient(#2c77ff,rgba(44,118,255,.761))",
    buttonAccent: "#c3d7d8",
    text: "#25262c",
    textAccent: "rgba(44,118,255,.761)",
    emptyBar: "rgba(70,70,70,.151)",
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
  <StyledAddButton
    onClick={onClick}
    borderRadius={borderRadius}
    height="fit-content"
  >
    <Plus size={50} />
  </StyledAddButton>
);

type Props = {
  hidden?: boolean;
  theme: any;
};

export const StyledSlider = styled(HBox)<Props>`
  overflow-x: auto;
  max-width: 100vw;
  padding: 15px 20px;
  justify-content: start;
  gap: 1.3rem;
  align-items: stretch;
  z-index: 10;

  ${({ theme, hidden = false }) => `
    opacity: ${hidden ? 0 : 1};
    visibility: ${hidden ? "hidden" : "visible"};
    margin-top: ${hidden ? "-117px" : "0"};
  `}
`;
