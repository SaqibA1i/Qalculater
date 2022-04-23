import { PenFill } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import useUpdateSelection from "../../../hooks/useUpdateSelection";
import { getSelData } from "../../../redux/currentSelections/selectors";
import { POPUP_ACTIONS } from "../../../redux/popup";
import { ACTION_TYPE, DATA_TYPE } from "../../../utils/constants";
import { getColor } from "../../../utils/helpers/colors";
import CompletionBar from "../../../pages/EditScreen/CompletionBar";

type Props = {
  label: string;
  average: number;
  completion: number;
  isTermRow: boolean;
  isSelected: boolean;
};

const Pill = ({ label, average, completion, isTermRow, isSelected }: Props) => {
  const dispatch = useDispatch();
  const { updateSelected } = useUpdateSelection();
  const selection = useSelector(getSelData);
  const updateSel = isTermRow
    ? {
        currTerm: label,
        currCourse: undefined,
      }
    : { ...selection, currCourse: label };

  return (
    <div
      className={isSelected ? "edit-slider-term selected" : "edit-slider-term"}
      onClick={() => {
        updateSelected(updateSel);
      }}
    >
      <div className="cover">
        <div className="container">
          <div className="left-section">
            <h5>{label}</h5>
            <p
              style={{
                color: getColor(average / 100),
              }}
            >
              {average || "--"}%
            </p>
          </div>
          <p>Completed: {completion || "--"}%</p>
          <CompletionBar
            completion={completion || 0}
            color={getColor(average / 100)}
          />
        </div>
        <div
          className={isSelected ? "bottom-section expanded" : "bottom-section"}
          onClick={() => {
            dispatch(
              POPUP_ACTIONS.open({
                actionType: ACTION_TYPE.EDIT,
                dataType: isTermRow ? DATA_TYPE.TERM : DATA_TYPE.COURSE,
              })
            );
          }}
        >
          {isSelected && <PenFill size={20} />}
        </div>
      </div>
    </div>
  );
};

export default Pill;
