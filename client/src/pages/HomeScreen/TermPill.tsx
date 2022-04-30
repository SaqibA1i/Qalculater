import { useContext } from "react";
import styled, { ThemeContext } from "styled-components";
import { Box } from "../../styles/Box";
import { VBox } from "../../styles/VBox";

const StyledBox = styled(VBox)`
  gap: 0.5rem;
  padding: 12px 20px;
  border-radius: 1rem;
  align-items: start;
  ${({ theme }) => `
        background: ${theme.accent};
        box-shadow: ${theme.boxShadow};
    `};
`;

type Props = {
  icon: JSX.Element;
  label: string;
  value: string;
};
const TermPill = ({ icon, label, value }: Props) => {
  const theme = useContext(ThemeContext);
  return (
    <StyledBox>
      <Box color={theme.textAccent}>{icon}</Box>
      <Box style={{ whiteSpace: "nowrap" }}>{label}</Box>
      <Box fontWeight={900} color={theme.textAccent}>
        {value}
      </Box>
    </StyledBox>
  );
};

export default TermPill;
