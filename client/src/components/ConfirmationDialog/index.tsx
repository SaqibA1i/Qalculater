import { X } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { CONFIRMATION_ACTION } from "../../redux/confirmationDIalog";
import { getConfirmationSelector } from "../../redux/confirmationDIalog/selectors";

const ConfirmationDialog = () => {
  const dispatch = useDispatch();
  const { isOpen, onSubmit } = useSelector(getConfirmationSelector);

  return (
    <div
      className={!isOpen ? "hideBlock" : "full-container"}
      style={{ zIndex: 1000 }}
    >
      <div className="popup-model">
        <div className="popup-header">
          <h3>Are you sure?</h3>
          <p>You won't be able to undo this action.</p>
          <X
            size={30}
            color="#333"
            onClick={() => {
              dispatch(CONFIRMATION_ACTION.close());
            }}
          />
        </div>
        <div
          className="button-container"
          style={{ flexDirection: "row", margin: "auto" }}
        >
          <button
            onClick={() => {
              dispatch(CONFIRMATION_ACTION.close());
            }}
            className="popup-header-cancel"
          >
            Cancel
          </button>
          <button onClick={onSubmit} className="popup-header-button">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;
