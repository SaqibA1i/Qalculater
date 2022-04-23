import { PencilFill, X } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { getSelData } from "../../redux/currentSelections/selectors";
import { POPUP_ACTIONS } from "../../redux/popup";
import { getPopupSelector } from "../../redux/popup/selector";
import { ACTION_TYPE, DATA_TYPE } from "../../utils/constants";
import AssessmentForm from "../Forms/Assessments";
import CourseForm from "../Forms/Courses";
import TermForm from "../Forms/Terms";

const PopupModal = () => {
  const dispatch = useDispatch();
  const { isOpen, dataType, actionType } = useSelector(getPopupSelector);

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
    <div className={!isOpen ? "hideBlock" : "full-container"}>
      <div className="popup-model">
        <div className="popup-header">
          <h3>
            {actionType} {dataType}
          </h3>
          <X
            size={30}
            color="#333"
            onClick={() => {
              dispatch(POPUP_ACTIONS.close());
            }}
          />
        </div>
        {isOpen && getFormToRender()}
      </div>
    </div>
  );
};

export default PopupModal;
