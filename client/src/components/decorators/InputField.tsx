import { useContext } from "react";
import { Controller } from "react-hook-form";
import styled, { ThemeContext } from "styled-components";
import { Box } from "../../styles/Box";
import { VBox } from "../../styles/VBox";
type Props = {
  label: string;
  name: string;
  type: "text" | "number";
  control: any;
  errors: any;
};

const StyledInput = styled.input`
  ${({ theme }) => `
      background: ${theme.main};
      color: ${theme.text};
      border: none;
      font-size: 17px;
      padding: 0px 10px;
      height: 40px;
      width: -webkit-fill-available;
      box-shadow: inset 1px 0px 6px 0px rgb(0 0 0 / 37%);
      border-radius: 10px;
  `}
`;

const StyledVBox = styled(VBox)`
  align-items: flex-start;
  gap: 0.3rem;
  font-weight: bold;
`;

const InputField = ({ label, name, control, errors }: Props) => {
  const theme = useContext(ThemeContext);
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <StyledVBox>
          <Box>{label}</Box>
          <StyledInput placeholder="Enter ...." {...field} autoComplete="off" />
          {errors[name] && (
            <Box fontSize="0.8rem" color={theme.error}>
              {errors[name].message}
            </Box>
          )}
        </StyledVBox>
      )}
    />
  );
};

export default InputField;
