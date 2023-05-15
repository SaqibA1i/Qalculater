import { noop } from "lodash";
import { CircleFill, Lightbulb } from "react-bootstrap-icons";
import { Box } from "../../styles/Box";
import { HBox } from "../../styles/HBox";
import { StyledHBox } from "./styles";

type Props = {
  label?: string;
  icon?: JSX.Element;
  element?: JSX.Element;
  onClick?: () => void;
};

const SectionRow = ({ label, icon, element, onClick = noop }: Props) => {
  return (
    <StyledHBox onClick={onClick}>
      {icon && (
        <HBox>
          {icon}
          <Box marginLeft="1rem" fontWeight="600">
            {label}
          </Box>
        </HBox>
      )}
      {element}
    </StyledHBox>
  );
};

export default SectionRow;
