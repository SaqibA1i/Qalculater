import React, { useEffect, useState } from 'react';

import {
    XCircleFill,
    Upload,
    PenFill,
    PencilSquare,
    ArchiveFill
} from 'react-bootstrap-icons';

import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';


function Assessments({ data, selected, updateJson }) {
    const [assessments, setAssessments] = useState([]);
    const [courseCompletion, setCompletion] = useState(0);
    const [view, setView] = useState(false);
    const [AsSelected, setSel] = useState(0);

    const update = (assessment) => {
        let json = data;
        json[selected][AsSelected][0] = document.getElementById("editAsName").value;
        json[selected][AsSelected][1] = parseFloat(document.getElementById("editAsPercentage").value);
        json[selected][AsSelected][2] = parseFloat(document.getElementById("editAsWeight").value);

        updateJson(json)
        NotificationManager.info(json[selected][AsSelected][0] + " is Updated")
    }

    const viewAssessmentEditModal = () => {
        setView(!view);
    }

    const removeAssessment = (assessment) => {
        let result = window.confirm("Sure you want to delete ?");
        if (result) {
            NotificationManager.error(assessment + " is deleted", selected)
            let json = data;
            let updatedAssessments = [];
            assessments.map(a => {
                if (a[0] != assessment) {
                    updatedAssessments.push(a);
                }
            }
            )
            json[selected] = updatedAssessments;
            updateJson(json);
        }

    }

    useEffect(() => {
        let newAssessments = data[selected] != null ? data[selected] : [];
        setAssessments(newAssessments)

        let total = 0;
        newAssessments.map(assessment => {
            total += assessment[2];
        })
        setCompletion(total);
        setAssessments(newAssessments);
        // set width of completion bar
        document.getElementById("assessment-completion-bar").style.width = total + "%";
    }, [data, selected])


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
                            document.getElementById("editAsName").value = data[selected][index][0];
                            document.getElementById("editAsPercentage").value = data[selected][index][1];
                            document.getElementById("editAsWeight").value = data[selected][index][2];
                        }}>
                            <PenFill size={13} />
                        </button>
                        <button class="header-add-course" onClick={() => removeAssessment(assessment[0])}><ArchiveFill size={13} /></button>
                    </div>
                </div>
            )}
            <div class={(view) ? ("adder-modal") : ("hidden")} style={{ "top": "-100px" }}>
                {data[selected] != undefined && data[selected][0] != undefined &&
                    <div class="modal">
                        <div
                            class="header-modal"
                        >
                            <p style={{ "display": "flex", "alignItems": "center" }}>
                                <PencilSquare class="option-icon" color={"#ffff"} size={25} />
                                Edit
                                <b>: {data[selected][AsSelected][0]}</b>
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
                                placeholder={data[selected][AsSelected][0]} />
                            <div class="adder-numbers">
                                <input
                                    type="number"
                                    id="editAsPercentage"
                                    max="100"
                                    min="0"
                                    defaultValue={data[selected][AsSelected][1]}
                                    placeholder={"My mark: " + data[selected][AsSelected][1] + " %"} /> %
                                <input
                                    type="number"
                                    id="editAsWeight"
                                    max="100"
                                    min="0"
                                    defaultValue={data[selected][AsSelected][2]}
                                    placeholder={"Weight: " + data[selected][AsSelected][2] + " %"} /> %

                            </div>
                        </div>
                        <div class="footer-modal">
                            <button
                                class="header-add-course"
                                onClick={() => { update(); viewAssessmentEditModal()}}
                            >
                                <Upload size={15} />
                            </button>
                        </div>
                    </div>
                }

            </div>
        </div>

    )

}

export default Assessments;