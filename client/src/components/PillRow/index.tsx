import { keys } from "lodash";
import { Plus } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { CAROUSEL_ACTIONS } from "../../redux/carousel";
import { getSelData } from "../../redux/currentSelections/selectors";
import { POPUP_ACTIONS } from "../../redux/popup";
import { DATA_TYPE, ACTION_TYPE } from "../../utils/constants";
import Pill from "./Pill";

type Props = {
  data: { [entry: string]: { average: number; completion: number } };
  isTermRow: boolean;
};
const PillRow = ({ data, isTermRow }: Props) => {
  const dispatch = useDispatch();
  const { currCourse, currTerm } = useSelector(getSelData);

  const sortedData = keys(data).sort((a, b) => {
    if (a < b) {
      return 0;
    }
    return -1;
  });

  return (
    <div className="edit-slider">
      {sortedData.map((label, idx) => {
        const { average, completion } = data[label];
        return (
          <Pill
            key={idx}
            label={label}
            average={average}
            completion={completion}
            isTermRow={isTermRow}
            isSelected={isTermRow ? currTerm === label : currCourse === label}
          />
        );
      })}
      <div
        className="edit-add"
        data-aos="zoom-in"
        onClick={() => {
          dispatch(
            POPUP_ACTIONS.open({
              isOpen: true,
              actionType: ACTION_TYPE.CREATE,
              dataType: isTermRow ? DATA_TYPE.TERM : DATA_TYPE.COURSE,
            })
          );
        }}
      >
        <Plus size={50} />
      </div>
    </div>
  );
};

export default PillRow;
