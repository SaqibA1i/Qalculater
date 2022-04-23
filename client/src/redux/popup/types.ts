import { ACTION_TYPE, DATA_TYPE } from "../../utils/constants";

export type PopupContext = {
    isOpen?: boolean;
    actionType: ACTION_TYPE;
    dataType: DATA_TYPE;
}
