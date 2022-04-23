import { useSelector } from "react-redux";
import { getPopupSelector } from "../redux/popup/selector";
import { ACTION_TYPE } from "../utils/constants";
import { Archive, ArchiveFill, PencilFill } from "react-bootstrap-icons";
type Props = {
  onSubmit: () => void;
  children: JSX.Element[] | JSX.Element;
  errors: any;
  deleteAction: () => void;
};

const Form = ({ onSubmit, children, errors, deleteAction }: Props) => {
  const { actionType } = useSelector(getPopupSelector);
  return (
    <form onSubmit={onSubmit} onReset={deleteAction}>
      {children}
      {errors[""] && <span>{errors[""].message}</span>}
      <div className="button-container">
        {actionType === ACTION_TYPE.EDIT ? (
          <>
            <button type="submit" className="popup-header-edit">
              Edit
            </button>
            <hr />
            <button type="reset" className="popup-header-delete">
              Delete
            </button>
          </>
        ) : (
          <button type="submit" className="popup-header-button">
            Submit
          </button>
        )}
      </div>
    </form>
  );
};

export default Form;
