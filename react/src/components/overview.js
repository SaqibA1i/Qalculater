import React, { useEffect, useState, useContext } from 'react';
import { UserDataContext } from '../App';

import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import {
    XCircleFill,
    Upload,
    PenFill,
    PencilSquare,
    ArchiveFill
} from 'react-bootstrap-icons';

function Overview({ getGpa }) {
    const [currentMark, setMark] = useState(0);
    const [gpa, setGpa] = useState("0.00");
    const [courseBool, setCourse] = useState(false);

    const updateData = useContext(UserDataContext).updateJson;
    const setSel = useContext(UserDataContext).setSelected;

    let userData = useContext(UserDataContext).data;
    let selected = useContext(UserDataContext).selectedCourse;
    let currTerm = useContext(UserDataContext).termName;

    const update = () => {
        let result = window.confirm(`Are you sure you would like to update ${selected}?`);
        if (result) {
            let name = document.getElementById("courseNameE").value;
            if (document.getElementById("courseCredE").value != "" && name != "") {

                let data = Object.assign({}, userData);
                delete data[selected];
                data[name] = {
                    "credit": parseFloat(document.getElementById("courseCredE").value),
                    "data": userData[selected]["data"]
                };
                setSel("");
                updateData(data);
                window.location.href = "/"
                NotificationManager.info(selected + " course is edited")
            }
            else {
                alert("please enter the required fields");
            }
        }
    }

    const deleteCourse = () => {
        let result = window.confirm("This course will be deleted forever. Sure you want to delete ?");
        if (result) {
            setSel("");
            delete userData[selected];
            updateData(userData);
            NotificationManager.error(selected + " course is deleted ")
        }
    }

    const calcOverview = () => {
        try {
            let total = 0;
            let courseCompletion = 0;
            let assessments = userData[selected]["data"];
            assessments.map(assessment => {
                total += ((assessment[1] / 100) * assessment[2]);
                courseCompletion += assessment[2];
            })
            courseCompletion = courseCompletion != 0 ? (total / courseCompletion) : 0;
            setMark((courseCompletion * 100).toPrecision(3));
            let newGpa = getGpa((courseCompletion * 100).toPrecision(3));

            // set gpa color class
            let className = "";
            if (newGpa >= 3.90) {
                className = "awesome";
            } else if (newGpa >= 3.70) {
                className = "good";
            } else if (newGpa >= 3.3) {
                className = "okay";
            } else {
                className = "bad";
            }
            if (selected != "") {
                let e = document.getElementById("overview-gpa");
                e.className = "overview-gpa " + className;
            }

            setGpa(newGpa);
            console.log("Overview rendered sucessfully");
        }
        catch (err) {
            console.log("Error rendering the overview: " + err);
        }
    };
    useEffect(() => {
        if (selected != "" && currTerm != "") {
            calcOverview();
        }
        console.log("overview useEffect rendered")
    }, [userData, selected, currTerm])

    return (
        <div className="overview-container">
            {
                selected != "" ? (
                    <>
                        <div class={(courseBool) ? ("adder-modal") : ("hidden")} style={{ top: "-100px", zIndex: "100" }}>
                            <div class="modal">
                                <div class="header-modal">
                                    <p style={{ "display": "flex", "alignItems": "center" }}>
                                        <PencilSquare class="option-icon" color={"#ffff"} size={25} />
                                        Edit {selected}
                                    </p>
                                    <button
                                        onClick={() => { setCourse(false) }}>
                                        <XCircleFill color={"#ffff"} size={20} />
                                    </button>
                                </div>
                                <div class="body-modal">
                                    <input
                                        style={{ "width": "80%" }}
                                        type="text"
                                        id="courseNameE"
                                        placeholder="Course Name eg. MAT324" />
                                    <div class="adder-numbers">
                                        <input
                                            style={{ "width": "80%" }}
                                            type="number"
                                            id="courseCredE"
                                            max="100"
                                            min="0"
                                            placeholder="Credit eg. 0.5" />

                                    </div>

                                    <button
                                        class="header-add-course submitBtn del"
                                        onClick={() => { deleteCourse(); setCourse(false) }}
                                    >
                                        Delete
                                    </button>
                                    <button
                                        class="header-add-course submitBtn"
                                        onClick={() => { update(); setCourse(false) }}
                                    >
                                        Submit
                                    </button>
                                </div>

                            </div>
                        </div>
                        <h1 class="overview-header">
                            <button
                                className="header-settings"
                                onClick={() => {
                                    setCourse(!courseBool)
                                    document.getElementById("courseNameE").value = selected;
                                    document.getElementById("courseCredE").value = userData[selected]["credit"];
                                }}>
                                <PenFill size={25} color={"#1f52bfc8"} />
                            </button>
                            {selected}
                            <p><i>{userData[selected]["credit"] + " credits"}</i></p>
                        </h1>
                        <div class="overview-mark">
                            <i>{currentMark}% </i>
                            <br />
                            <div id="overview-gpa" >{gpa} gpa</div>
                        </div>
                    </>
                ) :
                    (<h1 class="overview-header" style={{ "padding": "5px 20px" }}>Please Select a course</h1>)
            }
        </div>
    )

}

export default Overview;