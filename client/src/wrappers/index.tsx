import { BrowserRouter } from "react-router-dom";
import ReduxWrapper from "../redux/reduxStore";

type Props = {
  children: JSX.Element[];
};
const Wrappers = ({ children }: Props) => {
  return (
    <ReduxWrapper>
      <BrowserRouter>
        <>{children}</>
      </BrowserRouter>
    </ReduxWrapper>
  );
};

export default Wrappers;
