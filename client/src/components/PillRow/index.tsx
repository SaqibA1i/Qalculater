import { keys } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { getSelData } from "../../redux/currentSelections/selectors";
import { POPUP_ACTIONS } from "../../redux/popup";
import { HBox } from "../../styles/HBox";
import { AddButton, StyledSlider } from "../../styles/Styles";
import { DATA_TYPE, ACTION_TYPE } from "../../utils/constants";
import Pill from "./Pill";

type Props = {
  data: { [entry: string]: { average: number; completion: number } };
  isTermRow: boolean;
  hidden: boolean;
};

const PillRow = ({ data, isTermRow, hidden }: Props) => {
  const dispatch = useDispatch();
  const { currCourse, currTerm } = useSelector(getSelData);

  const sortedData = keys(data).sort((a, b) => {
    if (a < b) {
      return 0;
    }
    return -1;
  });

  return (
    <StyledSlider hidden={hidden}>
      {sortedData.map((label, idx) => {
        const { average, completion } = data[label];
        return (
          <Pill
            key={idx}
            id={idx}
            label={label}
            average={average}
            completion={completion}
            isTermRow={isTermRow}
            isSelected={isTermRow ? currTerm === label : currCourse === label}
          />
        );
      })}
      <AddButton
        borderRadius="50%"
        onClick={() => {
          dispatch(
            POPUP_ACTIONS.open({
              isOpen: true,
              actionType: ACTION_TYPE.CREATE,
              dataType: isTermRow ? DATA_TYPE.TERM : DATA_TYPE.COURSE,
            })
          );
        }}
      />
    </StyledSlider>
  );
};

export default PillRow;
