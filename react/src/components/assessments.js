import React, { useEffect, useState, useContext } from 'react';

import {
    XCircleFill,
    Upload,
    PenFill,
    PencilSquare,
    ArchiveFill
} from 'react-bootstrap-icons';

import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { UserDataContext } from '../App';

function Assessments() {
    const [assessments, setAssessments] = useState([]);
    const [courseCompletion, setCompletion] = useState(0);
    const [view, setView] = useState(false);
    const [AsSelected, setSel] = useState(0);

    const updateData = useContext(UserDataContext).updateJson;
    let userData = useContext(UserDataContext).data;
    let selected = useContext(UserDataContext).selectedCourse;
    let currTerm = useContext(UserDataContext).termName;

    const update = () => {
        userData[selected]["data"][AsSelected][0] = document.getElementById("editAsName").value;
        userData[selected]["data"][AsSelected][1] = parseFloat(document.getElementById("editAsPercentage").value);
        userData[selected]["data"][AsSelected][2] = parseFloat(document.getElementById("editAsWeight").value);

        updateData(userData)
        NotificationManager.info(selected, userData[selected]["data"][AsSelected][0] + " is Updated", 900)
    }

    const viewAssessmentEditModal = () => {
        setView(!view);
    }

    const removeAssessment = (assessment) => {
        let result = window.confirm("Sure you want to delete ?");
        if (result) {
            NotificationManager.error(selected, assessment + " is deleted", 900)
            let updatedAssessments = [];
            assessments.map(a => {
                if (a[0] != assessment) {
                    updatedAssessments.push(a);
                }
            }
            )
            userData[selected]["data"] = updatedAssessments;
            updateData(userData);
        }
    }

    useEffect(() => {
        try {
            if (selected == "" || currTerm == "") {
                setCompletion(0);
                setSel(0);
                setAssessments([]);
            }
            else {
                let newAssessments = userData[selected]["data"];

                let total = 0;
                newAssessments.map(assessment => {
                    total += assessment[2];
                })

                setCompletion(total);
                setAssessments(newAssessments);

                // set width of completion bar
                document.getElementById("assessment-completion-bar").style.width = total + "%";

                console.log("Assessments rendered sucessfully");
            }
        }
        catch (err) {
            console.log("Error rendering the assessments: " + err);
        }
    }, [userData, selected, currTerm])


    return (
        <div className="assessment-container">
            <div class="assessment-completion">
                Course Completion <b>{courseCompletion}</b>  %
            </div>
            <div id="assessment-completion-bar" class="assessment-completion-bar">
            </div>
            {assessments.map((assessment, index) =>
                <div class="assessment-single assessment-data">
                    <b class="assessment-header">
                        {assessment[0]}
                        <br />
                        <i><span class="mark">{assessment[1]}%</span>  worth  <span class="worth">{assessment[2]}</span></i>
                    </b>
                    <div class="assessment-editors">
                        <button class="header-add-course" onClick={() => {
                            setSel(index);
                            viewAssessmentEditModal();
                            document.getElementById("editAsName").value = userData[selected]["data"][index][0];
                            document.getElementById("editAsPercentage").value = userData[selected]["data"][index][1];
                            document.getElementById("editAsWeight").value = userData[selected]["data"][index][2];
                        }}>
                            <PenFill size={13} />
                        </button>
                        <button class="header-add-course" onClick={() => removeAssessment(assessment[0])}><ArchiveFill size={13} /></button>
                    </div>
                </div>
            )}
            <div class={(view) ? ("adder-modal") : ("hidden")} style={{ "top": "-100px" }}>
                {userData[selected] != undefined && userData[selected]["data"][0] != undefined &&
                    <div class="modal">
                        <div
                            class="header-modal"
                        >
                            <p style={{ "display": "flex", "alignItems": "center" }}>
                                <PencilSquare class="option-icon" color={"#ffff"} size={25} />
                                Edit
                                <b>: {userData[selected]["data"][AsSelected][0]}</b>
                            </p>
                            <button
                                onClick={viewAssessmentEditModal}>
                                <XCircleFill color={"#ffff"} size={20} />
                            </button>
                        </div>
                        <div class="body-modal">
                            <input
                                style={{ "width": "80%" }}
                                type="text"
                                id="editAsName"
                                placeholder={userData[selected]["data"][AsSelected][0]} />
                            <div class="adder-numbers">
                                <input
                                    type="number"
                                    id="editAsPercentage"
                                    max="100"
                                    min="0"
                                    defaultValue={userData[selected]["data"][AsSelected][1]}
                                    placeholder={"My mark: " + userData[selected]["data"][AsSelected][1] + " %"} /> %
                                <input
                                    type="number"
                                    id="editAsWeight"
                                    max="100"
                                    min="0"
                                    defaultValue={userData[selected]["data"][AsSelected][2]}
                                    placeholder={"Weight: " + userData[selected]["data"][AsSelected][2] + " %"} /> %

                            </div>
                            <button
                                class="header-add-course submitBtn"
                                onClick={() => { update(); viewAssessmentEditModal() }}
                            >
                                Submit
                        </button>
                        </div>
                    </div>
                }

            </div>
        </div>

    )

}

export default Assessments;