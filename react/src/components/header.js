import React, { useEffect, useState, useContext } from 'react';
import { UserDataContext } from '../App';

import {
    JournalPlus,
    CalculatorFill,
    EnvelopeFill,
    PersonCircle,
    Book,
    XCircleFill,
    BoxArrowDownLeft,
    InfoCircleFill,
    GearFill,
    Upload,
    PlusCircleFill,
    App
} from 'react-bootstrap-icons';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';

function Header({ currTerm, totalAvg, username }) {
    const [visible, setVisible] = useState(false);
    const [optionsBool, setOpt] = useState(false);
    const [courseBool, setCourse] = useState(false);

    const updateData = useContext(UserDataContext).updateJson;
    let userData = useContext(UserDataContext).data;
    let selected = useContext(UserDataContext).selectedCourse;

    const logOut = () => {
        let result = window.confirm("Sure you want to logout ?");
        if (result) {
            fetch('/logout', {
                method: "GET",
            })
                .then((result) => result.json())
                .then((info) => {
                    if (info.status == 200) {
                        window.location.href = "/login";
                    }
                })
        }
    }

    const add = () => {
        let name = document.getElementById("assessmentName").value;
        let percentage = document.getElementById("assessmentPercentage").value;
        let weightage = document.getElementById("assessmentWeightage").value;
        if (percentage == "" || weightage == "" || weightage == "") {
            NotificationManager.info("Fill in the required fields", selected)
        }
        else {
            let updatedAssessments = userData[selected]["data"];
            updatedAssessments.push([name, parseFloat(percentage), parseFloat(weightage)]);

            userData[selected]["data"] = updatedAssessments;
            setVisible(false);
            updateData(userData);
            NotificationManager.info(name + " gained " + percentage + "%", selected)
        }
    }

    const addCourse = () => {
        if (document.getElementById("courseCred").value != "" && document.getElementById("courseName").value != "") {
            userData[document.getElementById("courseName").value] = {
                "credit": parseFloat(document.getElementById("courseCred").value),
                "data": []
            };

            updateData(userData);
            NotificationManager.info(document.getElementById("courseName").value + " course is added ")
        }
        else {
            alert("please enter the required fields");
        }

    }

    const viewCourseAdderModal = () => {
        setCourse(!courseBool);
        setVisible(false);
        setOpt(false);
    }

    const viewOptionModal = () => {
        setCourse(false);
        setVisible(false);
        setOpt(!optionsBool);
    }

    const viewAssessmentModal = () => {
        setCourse(false);
        setVisible(!visible);
        setOpt(false);
    }
    return (
        <div className="header-container">
            <button
                class="header-add-course"
                id="header-add-course"
            >
                {totalAvg}
            </button>
            <div>
                <button
                    className="header-settings"
                    onClick={viewCourseAdderModal}>
                    <JournalPlus size={25} color={"#1f52bfc8"} />
                </button>
                {selected &&
                    <button
                        className="header-settings"
                        onClick={viewAssessmentModal}>
                        <PlusCircleFill size={25} color={"#1f52bfc8"} />
                    </button>}

                <button
                    className="header-settings"
                    onClick={viewOptionModal}>
                    <GearFill size={25} color={"#1f52bfc8"} />
                </button>
            </div>

            <div class={(courseBool) ? ("adder-modal") : ("hidden")}>
                <div class="modal">
                    <div class="header-modal">
                        <p style={{ "display": "flex", "alignItems": "center" }}>
                            <JournalPlus class="option-icon" color={"#ffff"} size={25} />
                            Add a course
                        </p>
                        <button
                            onClick={viewCourseAdderModal}>
                            <XCircleFill color={"#ffff"} size={20} />
                        </button>
                    </div>
                    <div class="body-modal">
                        <input
                            style={{ "width": "80%" }}
                            type="text"
                            id="courseName"
                            placeholder="Course Name eg. MAT324" />
                        <div class="adder-numbers">
                            <input
                                style={{ "width": "80%" }}
                                type="number"
                                id="courseCred"
                                max="100"
                                min="0"
                                placeholder="Credit eg. 0.5" />

                        </div>
                        <button
                            class="header-add-course submitBtn"
                            onClick={() => { addCourse(); viewCourseAdderModal() }}
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>

            <div class={(visible) ? ("adder-modal") : ("hidden")}>
                <div class="modal">
                    <div class="header-modal">
                        <p style={{ "display": "flex", "alignItems": "center" }}>
                            <CalculatorFill class="option-icon" color={"#ffff"} size={25} />
                            Add assessment for <b>: {selected}</b>
                        </p>
                        <button
                            onClick={viewAssessmentModal}>
                            <XCircleFill color={"#ffff"} size={20} />
                        </button>
                    </div>
                    <div class="body-modal">
                        <input
                            type="text"
                            id="assessmentName"
                            placeholder="Add Assessment Name" />
                        <div class="adder-numbers">
                            <input
                                type="number"
                                id="assessmentPercentage"
                                max="100"
                                min="0"
                                placeholder="My Percent" />
                            <input
                                type="number"
                                id="assessmentWeightage"
                                max="100"
                                min="0"
                                placeholder="Weight" />

                        </div>
                        <button
                            class="header-add-course submitBtn"
                            onClick={() => { add(); viewAssessmentModal() }}
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>

            <div class={(optionsBool) ? ("adder-modal") : ("hidden")}>
                <div class="modal">
                    <div class="header-modal">
                        <p style={{ "display": "flex", "alignItems": "center" }}>
                            <PersonCircle class="option-icon" color={"#ffff"} size={25} />
                            {username}
                        </p>
                        <button
                            onClick={viewOptionModal}>
                            <XCircleFill class="option-icon" color={"#ffff"} size={20} />
                        </button>
                    </div>

                    <div class="body-modal">
                        <div class="modal-options">
                            <Book class="option-icon" color={"#1f52bfc8"} size={20} />
                            Choose Gpa Scale
                        </div>
                        <hr />
                        <div class="modal-options">
                            <EnvelopeFill class="option-icon" color={"#1f52bfc8"} size={20} />
                            Contact dev
                        </div>
                        <hr />
                        <div class="modal-options">
                            <InfoCircleFill class="option-icon" color={"#1f52bfc8"} size={20} />
                            About
                        </div>
                        <hr />
                        <div class="modal-options" onClick={logOut}>
                            <BoxArrowDownLeft class="option-icon" color={"#1f52bfc8"} size={20} />
                            Logout
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )

}

export default Header;