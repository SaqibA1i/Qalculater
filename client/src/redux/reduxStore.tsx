import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { AcademicData, CurrSelection } from "../TS types/Types";
import { carousel } from "./carousel";
import { Carousel } from "./carousel/types";
import { currSel } from "./currentSelections";
import { gradeDataFiltered } from "./grades";
import { GradeFiltered } from "./grades/types";
import { loading } from "./loading";
import { popup } from "./popup";
import { PopupContext } from "./popup/types";
import { userInfo } from "./userInfo";
import { UserInfo } from "./userInfo/types";

type Props = {
  children: JSX.Element;
};
export type AppState = {
  userInfo: UserInfo;
  currSel: CurrSelection;
  carousel: Carousel;
  loading: boolean;
  gradeDataFiltered: GradeFiltered;
  popup: PopupContext;
};

const ReduxWrapper = ({ children }: Props) => {
  const store = configureStore({
    reducer: {
      userInfo: userInfo.reducer,
      currSel: currSel.reducer,
      carousel: carousel.reducer,
      loading: loading.reducer,
      gradeDataFiltered: gradeDataFiltered.reducer,
      popup: popup.reducer,
    },
  });
  return <Provider store={store}>{children}</Provider>;
};

export default ReduxWrapper;
