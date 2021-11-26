import React, { useEffect, useState, useContext } from "react";

import {
  XCircleFill,
  Upload,
  PenFill,
  PencilSquare,
  ArchiveFill,
  Wrench,
} from "react-bootstrap-icons";

import "react-notifications/lib/notifications.css";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import { UserDataContext } from "../App";

function Assessments() {
  const [assessments, setAssessments] = useState([]);
  const [courseCompletion, setCompletion] = useState(0);
  const [view, setView] = useState(false);
  const [AsSelected, setSel] = useState(0);

  const updateData = useContext(UserDataContext).updateJson;
  let userData = useContext(UserDataContext).data;
  let selected = useContext(UserDataContext).selectedCourse;
  let currTerm = useContext(UserDataContext).termName;

  let errors = require("./errors.json");

  // Edit an Assessment
  const update = () => {
    let prevName = userData[selected]["data"][AsSelected][0];
    let name = document.getElementById("editAsName").value;
    let percentage = parseFloat(
      document.getElementById("editAsPercentage").value
    );
    let weight = parseFloat(document.getElementById("editAsWeight").value);
    try {
      // Check: Are the fields empty
      if (name == "" || percentage == "" || weight == "") {
        throw errors["emptyFields"];
      }
      // Check: Have any edits been made
      if (
        name == prevName &&
        percentage == userData[selected]["data"][AsSelected][1] &&
        weight == userData[selected]["data"][AsSelected][2]
      ) {
        throw errors["makeChanges"];
      }
      // Check: Is it being renamed to something with the same name
      userData[selected]["data"].map((assessment) => {
        if (assessment[0] == name && assessment[0] != prevName) {
          throw errors["repeatedEntry"];
        }
      });
      viewAssessmentEditModal();
      userData[selected]["data"][AsSelected][0] = name;
      userData[selected]["data"][AsSelected][1] = percentage;
      userData[selected]["data"][AsSelected][2] = weight;

      updateData(userData);
      NotificationManager.info(
        userData[selected]["data"][AsSelected][0] + " is Updated",
        selected,
        1500
      );
    } catch (err) {
      NotificationManager.warning(err, selected, 1000);
    }
  };

  const viewAssessmentEditModal = () => {
    setView(!view);
  };

  const removeAssessment = (assessment) => {
    let result = window.confirm("Sure you want to delete ?");
    if (result) {
      NotificationManager.error(assessment + " is deleted", selected, 900);
      let updatedAssessments = [];
      assessments.map((a) => {
        if (a[0] != assessment) {
          updatedAssessments.push(a);
        }
      });
      userData[selected]["data"] = updatedAssessments;
      updateData(userData);
    }
  };

  useEffect(() => {
    try {
      if (selected == "" || currTerm == "") {
        setCompletion(0);
        setSel(0);
        setAssessments([]);
      } else {
        let newAssessments = userData[selected]["data"];
        newAssessments.sort((a1, a2) => {
          return a2[2] - a1[2];
        });
        let total = 0;
        newAssessments.map((assessment) => {
          total += assessment[2];
        });

        setCompletion(total);
        setAssessments(newAssessments);

        // set width of completion bar
        document.getElementById("assessment-completion-bar").style.width =
          total + "%";

        console.log("Assessments rendered sucessfully");
      }
    } catch (err) {
      console.log("Error rendering the assessments: " + err);
    }
  }, [userData, selected, currTerm]);

  return (
    <div className="assessment-container">
      <div class="assessment-completion">
        Course Completion{" "}
        <b>{(Math.round(courseCompletion * 100) / 100).toFixed(2)}</b> %
      </div>
      <div
        id="assessment-completion-bar"
        class="assessment-completion-bar"
      ></div>
      {assessments.map((assessment, index) => (
        <div key={index} class="assessment-single assessment-data">
          <b class="assessment-header">
            {assessment[0]}
            <br />
            <i>
              <span class="mark">{assessment[1]}%</span> worth{" "}
              <span class="worth">{assessment[2]}</span>
            </i>
          </b>
          <div class="assessment-editors">
            <button
              class="header-add-course"
              onClick={() => {
                setSel(index);
                viewAssessmentEditModal();
                document.getElementById("editAsName").value =
                  userData[selected]["data"][index][0];
                document.getElementById("editAsPercentage").value =
                  userData[selected]["data"][index][1];
                document.getElementById("editAsWeight").value =
                  userData[selected]["data"][index][2];
              }}
            >
              <PenFill size={13} />
            </button>
            <button
              class="header-add-course"
              onClick={() => removeAssessment(assessment[0])}
            >
              <ArchiveFill size={13} />
            </button>
          </div>
        </div>
      ))}
      <div class={view ? "adder-modal" : "hidden"} style={{ top: "-100px" }}>
        {userData && userData[selected] && userData[selected]["data"][0] && (
          <div class="modal">
            <div class="header-modal">
              <p style={{ display: "flex", alignItems: "center" }}>
                <PencilSquare class="option-icon" color={"#ffff"} size={25} />
                Edit
                <b>: {userData[selected]["data"][AsSelected][0]}</b>
              </p>
              <button onClick={viewAssessmentEditModal}>
                <XCircleFill color={"#ffff"} size={20} />
              </button>
            </div>
            <div class="body-modal">
              <input
                style={{ width: "80%" }}
                type="text"
                id="editAsName"
                placeholder={userData[selected]["data"][AsSelected][0]}
              />
              <div class="adder-numbers">
                <input
                  type="number"
                  id="editAsPercentage"
                  max="100"
                  min="0"
                  defaultValue={userData[selected]["data"][AsSelected][1]}
                  placeholder={
                    "My mark: " +
                    userData[selected]["data"][AsSelected][1] +
                    " %"
                  }
                />{" "}
                %
                <input
                  type="number"
                  id="editAsWeight"
                  max="100"
                  min="0"
                  defaultValue={userData[selected]["data"][AsSelected][2]}
                  placeholder={
                    "Weight: " +
                    userData[selected]["data"][AsSelected][2] +
                    " %"
                  }
                />{" "}
                %
              </div>
              <button class="header-add-course submitBtn" onClick={update}>
                Submit
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Assessments;
