import { useSelector } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { getSlide } from "../redux/carousel/selectors";
import { THEME } from "../redux/carousel/types";

import ReduxWrapper from "../redux/reduxStore";
import { theme } from "../styles/Styles";

type Props = {
  children: JSX.Element[];
};

const ThemeWrappers = ({ children }: Props) => {
  const { theme: currTheme = THEME.LIGHT } = useSelector(getSlide);

  return (
    <ThemeProvider theme={theme[currTheme]}>
      <BrowserRouter>
        <>{children}</>
      </BrowserRouter>
    </ThemeProvider>
  );
};
const Wrappers = ({ children }: Props) => {
  return (
    <ReduxWrapper>
      <ThemeWrappers>{children}</ThemeWrappers>
    </ReduxWrapper>
  );
};

export default Wrappers;
