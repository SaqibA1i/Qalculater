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
import { getSlide } from "../../../redux/carousel/selectors";
import { CAROUSEL_SLIDE } from "../../../redux/carousel/types";

type Props = {
  id: number;
  label: string;
  average: number;
  completion: number;
  isTermRow: boolean;
  isSelected: boolean;
};

const Pill = ({
  id,
  label,
  average,
  completion,
  isTermRow,
  isSelected,
}: Props) => {
  const dispatch = useDispatch();
  const theme = useContext(ThemeContext);

  const { updateSelected } = useUpdateSelection();
  const selection = useSelector(getSelData);
  const { slide } = useSelector(getSlide);
  const updateSel = isTermRow
    ? {
        currTerm: label,
        currCourse: undefined,
      }
    : { ...selection, currCourse: label };

  const isPageSelected = slide === CAROUSEL_SLIDE.EDIT ? 1 : 0;

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
          <Box fontSize="0.8rem" marginBottom="0.1rem">
            Completed: {completion || "--"}%
          </Box>

          <CompletionBar
            completion={isPageSelected * completion || 0}
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
