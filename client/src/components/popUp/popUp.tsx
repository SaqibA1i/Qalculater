import React, { useEffect, useRef, useState } from "react";
import { X } from "react-bootstrap-icons";
import { SpinnerInfinity } from "spinners-react";

import {
  AcademicData,
  AssessmentData,
  PopTypes,
  User
} from "../../TS types/Types";
import {
  // Term
  addTermPushHelper,
  editTermPushHelper,
  deleteTermPushHelper,
  // Course
  addCoursePushHelper,
  editCoursePushHelper,
  deleteCoursePushHelper,
  // Assessment
  addAssessmentPushHelper,
  editAssessmentPushHelper,
  deleteAssessmentPushHelper
} from "../../helperFunctions/helpers";
import { useQalcContext } from "../../context/qalculaterContext";
import { store } from "react-notifications-component";
import "animate.css";
import "react-notifications-component/dist/theme.css";
interface PopUpProps {
  setPopUp: (b: boolean) => void;
  popUp: boolean;
  popType: PopTypes;
  edit: AssessmentData | boolean;
}

function PopUp(Props: PopUpProps) {
  const { userInfo, selection, setUserInfo, setSelection } = useQalcContext()!!;
  const inputNameRef = useRef(null);
  const [editData, setEditData] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  // Refs for Course info
  const courseCreditRef = useRef(null);

  // Refs for Assessment info
  const percentageScoreRef = useRef(null);
  const weightRef = useRef(null);

  useEffect(() => {
    setEditData(typeof Props.edit != "boolean");
    if (typeof Props.edit != "boolean") {
      (inputNameRef.current! as HTMLInputElement).value = Props.edit[0];
      if (Props.popType == "Course") {
        (courseCreditRef.current! as HTMLInputElement).value =
          Props.edit[1].toString();
      } else if (Props.popType == "Assessment") {
        (percentageScoreRef.current! as HTMLInputElement).value =
          Props.edit[1].toString();
        (weightRef.current! as HTMLInputElement).value =
          Props.edit[2].toString();
      }
    }
  }, []);

  const submitClick = () => {
    try {
      //! ** ADDING A NEW TERM
      if (Props.popType == "Term") {
        let name = (inputNameRef.current! as HTMLInputElement).value;
        if (name.length == 0) {
          throw "Please input all fields";
        }
        setLoading(true);
        addTermPushHelper(name, userInfo!.data)
          .then((res: AcademicData | string) => {
            let updatedUser: User = userInfo!;
            if (typeof res === "string") {
              throw res;
            }
            updatedUser.data = [...res];
            //update react context with updated data
            setUserInfo({ ...updatedUser });
            store.addNotification({
              title: "Add",
              message: "" + name + " added!",
              type: "success",
              insert: "top",
              container: "top-center",
              animationIn: ["animate__animated", "animate__fadeIn"],
              animationOut: ["animate__animated", "animate__fadeOut"],
              dismiss: {
                duration: 3000,
                onScreen: true
              }
            });
            // Close the popup
            Props.setPopUp(false);
            setLoading(false);
          })
          .catch((err) => {
            store.addNotification({
              title: "Add",
              message: "" + err,
              type: "danger",
              insert: "top",
              container: "top-center",
              animationIn: ["animate__animated", "animate__fadeIn"],
              animationOut: ["animate__animated", "animate__fadeOut"],
              dismiss: {
                duration: 3000,
                onScreen: true
              }
            });
            setLoading(false);
          });
      }
      //! ** ADDING A NEW COURSE
      else if (Props.popType == "Course") {
        let name = (inputNameRef.current! as HTMLInputElement).value;
        let courseCred: number = parseFloat(
          (courseCreditRef.current! as HTMLInputElement).value
        );
        setLoading(true);
        if (name && courseCred && selection!.currTerm != undefined) {
          addCoursePushHelper(
            name,
            courseCred,
            selection!.currTerm,
            userInfo!.data
          )
            .then((res: AcademicData | string) => {
              let updatedUser: User = userInfo!;
              if (typeof res === "string") {
                throw res;
              }
              updatedUser.data = res!;
              //update react context with updated data
              store.addNotification({
                title: "Add",
                message: "" + name + " successfully added!",
                type: "success",
                insert: "top",
                container: "top-center",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                  duration: 3000,
                  onScreen: true
                }
              });
              setUserInfo({ ...updatedUser });
              console.log(userInfo);
              // Close the popup
              Props.setPopUp(false);
              setLoading(false);
            })
            .catch((err) => {
              store.addNotification({
                title: "Add",
                message: "" + err,
                type: "danger",
                insert: "top",
                container: "top-center",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                  duration: 3000,
                  onScreen: true
                }
              });
              setLoading(false);
            });
        } else {
          throw "Please input all fields";
        }
      }
      //! ** ADDING A NEW ASSESSMENT
      else if (Props.popType == "Assessment") {
        setLoading(true);
        let name = (inputNameRef.current! as HTMLInputElement).value;
        let percentage: number = parseFloat(
          (percentageScoreRef.current! as HTMLInputElement).value
        );
        let weight: number = parseFloat(
          (weightRef.current! as HTMLInputElement).value
        );
        if (name && percentage && weight && selection.currTerm != undefined) {
          addAssessmentPushHelper(
            [name, percentage, weight],
            selection,
            userInfo!.data
          )
            .then((res: AcademicData | string) => {
              let updatedUser: User = userInfo!;
              if (typeof res === "string") {
                throw res;
              }
              updatedUser.data = res!;
              //update react context with updated data
              store.addNotification({
                title: "Add",
                message: "" + name + " added!",
                type: "success",
                insert: "top",
                container: "top-center",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                  duration: 3000,
                  onScreen: true
                }
              });
              setLoading(false);
              setUserInfo({ ...updatedUser });
              // Close the popup
              Props.setPopUp(false);
            })
            .catch((err) => {
              store.addNotification({
                title: "Add",
                message: "" + err,
                type: "danger",
                insert: "top",
                container: "top-center",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                  duration: 3000,
                  onScreen: true
                }
              });
              setLoading(false);
            });
        } else {
          throw " Please input all fields";
        }
      }
    } catch (err) {
      store.addNotification({
        title: "Add",
        message: "" + err,
        type: "danger",
        insert: "top",
        container: "top-center",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 3000,
          onScreen: true
        }
      });
      setLoading(false);
    }
  };
  const deleteClick = () => {
    try {
      if (window.confirm("Are you sure?")) {
        setLoading(true);
        //! ** DELETE TERM
        if (Props.popType == "Term" && typeof Props.edit != "boolean") {
          let name = Props.edit[0];
          deleteTermPushHelper(name, userInfo.data)
            .then((res: AcademicData | string) => {
              let updatedUser: User = userInfo!;
              if (typeof res === "string") {
                throw res;
              }
              updatedUser.data = res!;
              //update react context with updated data
              setUserInfo!({ ...updatedUser });
              selection.currTerm = "undefined";
              selection.currCourse = "undefined";
              setSelection({ ...selection });

              store.addNotification({
                title: "Delete",
                message: "Deleted " + name,
                type: "success",
                insert: "top",
                container: "top-center",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                  duration: 3000,
                  onScreen: true
                }
              });
              setLoading(false);
              // Close the popup
              Props.setPopUp(false);
            })
            .catch((err) => {
              setLoading(false);
              store.addNotification({
                title: "Delete",
                message: "" + err,
                type: "danger",
                insert: "top",
                container: "top-center",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                  duration: 3000,
                  onScreen: true
                }
              });
            });
        }
        //! ** DELETE A COURSE
        else if (Props.popType == "Course" && typeof Props.edit != "boolean") {
          let courseToDelete = Props.edit[0];
          if (courseToDelete && selection.currTerm != undefined) {
            deleteCoursePushHelper(
              courseToDelete,
              selection.currTerm,
              userInfo.data
            )
              .then((res: AcademicData | string) => {
                let updatedUser: User = userInfo!;
                if (typeof res === "string") {
                  throw res;
                }
                updatedUser.data = res!;
                //update react context with updated data
                setUserInfo!({ ...updatedUser });
                store.addNotification({
                  title: "Delete",
                  message: "Deleted " + courseToDelete,
                  type: "success",
                  insert: "top",
                  container: "top-center",
                  animationIn: ["animate__animated", "animate__fadeIn"],
                  animationOut: ["animate__animated", "animate__fadeOut"],
                  dismiss: {
                    duration: 3000,
                    onScreen: true
                  }
                });
                setLoading(false);
                // Close the popup
                selection.currCourse = "undefined";
                setSelection({ ...selection });
                Props.setPopUp(false);
              })
              .catch((err) => {
                setLoading(false);
                store.addNotification({
                  title: "Delete",
                  message: "" + err,
                  type: "danger",
                  insert: "top",
                  container: "top-center",
                  animationIn: ["animate__animated", "animate__fadeIn"],
                  animationOut: ["animate__animated", "animate__fadeOut"],
                  dismiss: {
                    duration: 3000,
                    onScreen: true
                  }
                });
                setLoading(false);
              });
          } else {
            throw "Please input all fields";
          }
        }
        //! ** DELETING A ASSESSMENT
        else if (
          Props.popType == "Assessment" &&
          typeof Props.edit != "boolean"
        ) {
          let name: string = Props.edit[0];
          deleteAssessmentPushHelper(
            [name, Props.edit[1], Props.edit[2]],
            selection,
            userInfo!.data
          )
            .then((res: AcademicData | string) => {
              let updatedUser: User = userInfo!;
              if (typeof res === "string") {
                throw res;
              }
              updatedUser.data = res!;
              //update react context with updated data
              setUserInfo!({ ...updatedUser });
              store.addNotification({
                title: "Delete",
                message: "Deleted " + name,
                type: "success",
                insert: "top",
                container: "top-center",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                  duration: 3000,
                  onScreen: true
                }
              });
              setLoading(false);
              // Close the popup
              Props.setPopUp(false);
            })
            .catch((err) => {
              setLoading(false);
              store.addNotification({
                title: "Delete",
                message: "" + err,
                type: "danger",
                insert: "top",
                container: "top-center",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                  duration: 3000,
                  onScreen: true
                }
              });
            });
        }
      }
    } catch (err) {
      store.addNotification({
        title: "Delete",
        message: "" + err,
        type: "danger",
        insert: "top",
        container: "top-center",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 3000,
          onScreen: true
        }
      });
      setLoading(false);
    }
  };
  const editClick = () => {
    try {
      //! ** EDITING TERM
      if (Props.popType == "Term" && typeof Props.edit != "boolean") {
        let name = (inputNameRef.current! as HTMLInputElement).value;
        let newName: string = Props.edit[0];
        if (name == newName) {
          throw "No edits made";
        }
        if (name.length == 0) {
          throw "Please input all fields";
        }
        editTermPushHelper(newName, name, userInfo!.data)
          .then((res: AcademicData | string) => {
            let updatedUser: User = userInfo!;
            if (typeof res === "string") {
              throw res;
            }
            updatedUser.data = res!;
            //update react context with updated data
            setUserInfo!({ ...updatedUser });
            selection.currTerm = name;
            setSelection({ ...selection });
            // NOTIFICATION
            store.addNotification({
              title: "Edit",
              message: "Updated " + name + " to " + newName,
              type: "success",
              insert: "top",
              container: "top-center",
              animationIn: ["animate__animated", "animate__fadeIn"],
              animationOut: ["animate__animated", "animate__fadeOut"],
              dismiss: {
                duration: 3000,
                onScreen: true
              }
            });
            // Close the popup
            Props.setPopUp(false);
          })
          .catch((err) => {
            alert(err);
          });
      }
      //! ** EDITING A COURSE
      else if (Props.popType == "Course" && typeof Props.edit != "boolean") {
        // Existing values
        let name = Props.edit[0];
        let courseCred = Props.edit[1];
        // New Values
        let newName = (inputNameRef.current! as HTMLInputElement).value;
        let newCourseCred: number = parseFloat(
          (courseCreditRef.current! as HTMLInputElement).value
        );
        if (name == newName && courseCred == newCourseCred) {
          throw "No edits have been made";
        }
        if (name && courseCred && selection!.currTerm != undefined) {
          editCoursePushHelper(
            newName,
            name,
            newCourseCred,
            courseCred,
            selection.currTerm,
            userInfo.data
          )
            .then((res: AcademicData | string) => {
              let updatedUser: User = userInfo!;
              if (typeof res === "string") {
                throw res;
              }
              updatedUser.data = res!;
              //update react context with updated data
              setUserInfo!({ ...updatedUser });
              // Close the popup
              selection.currCourse = newName;
              setSelection({ ...selection });
              store.addNotification({
                title: "Edit",
                message: "Updated " + name + " successfully",
                type: "success",
                insert: "top",
                container: "top-center",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                  duration: 3000,
                  onScreen: true
                }
              });
              Props.setPopUp(false);
            })
            .catch((err) => {
              alert(err);
            });
        } else {
          throw "Please input all fields";
        }
      }
      //! ** EDITING AN ASSESSMENT
      else if (
        Props.popType == "Assessment" &&
        typeof Props.edit != "boolean"
      ) {
        let newName = (inputNameRef.current! as HTMLInputElement).value;
        let newPercentage: number = parseFloat(
          (percentageScoreRef.current! as HTMLInputElement).value
        );
        let newWeight: number = parseFloat(
          (weightRef.current! as HTMLInputElement).value
        );
        let name = Props.edit[0];
        let percentage = Props.edit[1];
        let weight = Props.edit[2];
        if (
          name === newName &&
          percentage === newPercentage &&
          weight === newWeight
        ) {
          throw "No edits made";
        }
        if (
          newName &&
          newPercentage &&
          newWeight &&
          selection.currTerm != undefined
        ) {
          editAssessmentPushHelper(
            [name, percentage, weight],
            [newName, newPercentage, newWeight],
            selection,
            userInfo.data
          )
            .then((res: AcademicData | string) => {
              let updatedUser: User = userInfo!;
              if (typeof res === "string") {
                throw res;
              }
              updatedUser.data = res!;
              //update react context with updated data
              setUserInfo!({ ...updatedUser });
              store.addNotification({
                title: "Edit",
                message: "Updated " + newName + " successfully",
                type: "success",
                insert: "top",
                container: "top-center",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                  duration: 3000,
                  onScreen: true
                }
              });
              // Close the popup
              Props.setPopUp(false);
            })
            .catch((err) => {
              alert(err);
            });
        } else {
          throw " Please input all fields";
        }
      }
    } catch (err) {
      store.addNotification({
        title: "Edit",
        message: "" + err,
        type: "danger",
        insert: "top",
        container: "top-center",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 3000,
          onScreen: true
        }
      });
    }
  };

  return (
    <div className={Props.popUp ? "popup-view-anim" : "popup-model"}>
      <div className="popup-header">
        <h3>
          {typeof Props.edit != "boolean"
            ? "Edit " + Props.popType + " : " + Props.edit[0]
            : "Add an" + Props.popType}
        </h3>
        <X
          size={30}
          color={"#333"}
          onClick={() => {
            Props.setPopUp(false);
          }}
        />
      </div>
      <div className="popup-header-input">
        <h5>{Props.popType} Name:</h5>
        <input
          placeholder="Enter name ...."
          id="inputNameRef"
          ref={inputNameRef}
          type="text"
        />
      </div>
      {Props.popType === "Course" && (
        <>
          <div className="popup-header-input">
            <h5>Course Credit Weighting:</h5>
            <input
              placeholder="Enter credit weight ...."
              type="number"
              ref={courseCreditRef}
            />
          </div>
        </>
      )}
      {Props.popType === "Assessment" && (
        <>
          <div className="popup-header-input">
            <h5>Your percentage score:</h5>
            <input
              ref={percentageScoreRef}
              placeholder="Enter percentage ...."
              type="number"
            />
          </div>

          <div className="popup-header-input">
            <h5>Weight</h5>

            <input
              ref={weightRef}
              placeholder="Enter weight ...."
              type="number"
            />
          </div>
        </>
      )}
      {!loading ? (
        <div className="button-container">
          {editData ? (
            <>
              <button onClick={editClick} className="popup-header-edit">
                Edit
              </button>
              <button onClick={deleteClick} className="popup-header-delete">
                Delete
              </button>
            </>
          ) : (
            <button onClick={submitClick} className="popup-header-button">
              Submit
            </button>
          )}
        </div>
      ) : (
        <div className="button-container">
          <SpinnerInfinity thickness={200} color={"red"} />
        </div>
      )}
    </div>
  );
}

export default PopUp;
