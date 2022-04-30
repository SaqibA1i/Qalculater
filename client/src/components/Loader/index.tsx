import { useContext } from "react";
import { useSelector } from "react-redux";
import { SpinnerInfinity } from "spinners-react";
import styled, { ThemeContext } from "styled-components";
import { getLoadingSelector } from "../../redux/loading/selectors";
import { HBox } from "../../styles/HBox";

type Props = {
  isOpen: boolean;
};
const StyledHBox = styled(HBox)<Props>`
  position: fixed;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(1.5px);

  ${({ isOpen, theme }) => `
    z-index: ${isOpen ? 200 : -1};
    background: ${theme.backdrop};
    opacity: ${isOpen ? 1 : 0};
  `};
`;
const Loader = () => {
  const theme = useContext(ThemeContext);
  const isLoading = useSelector(getLoadingSelector);

  return (
    <StyledHBox isOpen={isLoading}>
      <SpinnerInfinity
        size={100}
        color={theme.error}
        secondaryColor={theme.light}
      />
    </StyledHBox>
  );
};

export default Loader;
