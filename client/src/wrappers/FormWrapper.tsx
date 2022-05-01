import { useSelector } from "react-redux";
import { getPopupSelector } from "../redux/popup/selector";
import { ACTION_TYPE } from "../utils/constants";
import { VBox } from "../styles/VBox";
import { Button } from "../styles/Button";
import { ErrorMessage, StyledHr, StyledVBox } from "./styles";
type Props = {
  onSubmit: () => void;
  children?: JSX.Element[] | JSX.Element;
  errors?: any;
  deleteAction: () => void;
};

const Form = ({ onSubmit, children, errors, deleteAction }: Props) => {
  const { actionType } = useSelector(getPopupSelector);
  return (
    <form onSubmit={onSubmit} onReset={deleteAction}>
      <StyledVBox>{children}</StyledVBox>
      {errors[""] && <ErrorMessage>{errors[""].message}</ErrorMessage>}
      <VBox marginTop="25px">
        {actionType === ACTION_TYPE.EDIT ? (
          <>
            <Button intent="submit" type="submit">
              Edit
            </Button>
            <StyledHr />

            <Button intent="delete" type="reset">
              Delete
            </Button>
          </>
        ) : (
          <Button intent="submit" type="submit">
            Submit
          </Button>
        )}
      </VBox>
    </form>
  );
};

export default Form;
