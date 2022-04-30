import { useContext } from "react";
import { PencilFill, X } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { ThemeContext } from "styled-components";
import { getSelData } from "../../redux/currentSelections/selectors";
import { POPUP_ACTIONS } from "../../redux/popup";
import { getPopupSelector } from "../../redux/popup/selector";
import { Box } from "../../styles/Box";
import { ACTION_TYPE, DATA_TYPE } from "../../utils/constants";
import AssessmentForm from "../Forms/Assessments";
import CourseForm from "../Forms/Courses";
import TermForm from "../Forms/Terms";
import { FullContainer, StyledCancel, StyledHBox, StyledModal } from "./styles";

const PopupModal = () => {
  const dispatch = useDispatch();
  const { isOpen, dataType, actionType } = useSelector(getPopupSelector);
  const theme = useContext(ThemeContext);

  const getFormToRender = (): JSX.Element => {
    switch (dataType) {
      case DATA_TYPE.TERM:
        return <TermForm />;
      case DATA_TYPE.COURSE:
        return <CourseForm />;
      case DATA_TYPE.ASSESSMENT:
        return <AssessmentForm />;
    }
  };
  return (
    <FullContainer isOpen={!!isOpen}>
      <StyledModal>
        <StyledHBox className="popup-header">
          <Box as="h3" borderBottom={`3px solid ${theme.text}`}>
            {actionType} {dataType}
          </Box>
          <StyledCancel>
            <X
              size={30}
              onClick={() => {
                dispatch(POPUP_ACTIONS.close());
              }}
            />
          </StyledCancel>
        </StyledHBox>
        {isOpen && getFormToRender()}
      </StyledModal>
    </FullContainer>
  );
};

export default PopupModal;
