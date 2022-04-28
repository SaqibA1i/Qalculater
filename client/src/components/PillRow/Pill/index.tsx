import { PenFill } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import useUpdateSelection from "../../../hooks/useUpdateSelection";
import { getSelData } from "../../../redux/currentSelections/selectors";
import { POPUP_ACTIONS } from "../../../redux/popup";
import { ACTION_TYPE, DATA_TYPE } from "../../../utils/constants";
import { getColor } from "../../../utils/helpers/colors";
import CompletionBar from "../../../pages/EditScreen/CompletionBar";
import { BackWrapper, StyledPill, StyledVBox } from "./styles";
import { Box } from "../../../styles/Box";
import { VBox } from "../../../styles/VBox";
import { HBox } from "../../../styles/HBox";
import { ThemeContext } from "styled-components";
import { useContext } from "react";

type Props = {
  label: string;
  average: number;
  completion: number;
  isTermRow: boolean;
  isSelected: boolean;
};

const Pill = ({ label, average, completion, isTermRow, isSelected }: Props) => {
  const dispatch = useDispatch();
  const theme = useContext(ThemeContext);

  const { updateSelected } = useUpdateSelection();
  const selection = useSelector(getSelData);
  const updateSel = isTermRow
    ? {
        currTerm: label,
        currCourse: undefined,
      }
    : { ...selection, currCourse: label };

  return (
    <StyledPill
      onClick={() => {
        updateSelected(updateSel);
      }}
    >
      <BackWrapper>
        <StyledVBox>
          <HBox>
            <Box as="h5" fontSize="1rem">
              {label}
            </Box>
            <Box
              color={getColor(average / 100)}
              fontSize="1.2rem"
              fontWeight={700}
            >
              {average || "--"}%
            </Box>
          </HBox>
          <Box fontSize="0.6rem" marginBottom="0.1rem">
            Completed: {completion || "--"}%
          </Box>

          <CompletionBar
            completion={completion || 0}
            color={getColor(average / 100)}
          />
        </StyledVBox>
        <Box
          padding="10px 0"
          onClick={() => {
            dispatch(
              POPUP_ACTIONS.open({
                actionType: ACTION_TYPE.EDIT,
                dataType: isTermRow ? DATA_TYPE.TERM : DATA_TYPE.COURSE,
              })
            );
          }}
        >
          <Box padding="10px" color={theme.main}>
            {isSelected && <PenFill size={20} />}
          </Box>
        </Box>
      </BackWrapper>
    </StyledPill>
  );
};

export default Pill;
