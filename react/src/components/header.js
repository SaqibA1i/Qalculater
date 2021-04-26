import React, { useEffect, useState } from 'react';
import { XCircleFill, BoxArrowDownLeft, InfoCircleFill, X, GearFill, Upload, plusCircleFill, PlusCircle, PlusCircleFill } from 'react-bootstrap-icons';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';

function Header({ setCourseBoolHelper, totalAvg, data, selected, updateJson }) {
    const [visible, setVisible] = useState(false);
    const [optionsBool, setOpt] = useState(false);

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
            let json = data;
            let updatedAssessments = data[selected];
            updatedAssessments.push([name, parseFloat(percentage), parseFloat(weightage)]);

            json[selected] = updatedAssessments;
            setVisible(false);
            updateJson(json);
            NotificationManager.info(name + " gained " + percentage + "%", selected)
        }
    }

    return (
        <div className="header-container">
            <button
                class="header-add-course"
                id="header-add-course"
                onClick={setCourseBoolHelper}
            >
                {totalAvg}
            </button>
            <div>
                {selected &&
                    <button
                        className="header-settings"
                        onClick={() => { setVisible(!visible); setOpt(false) }}>
                        <PlusCircleFill size={25} color={"#1f52bfc8"} />
                    </button>}

                <button
                    className="header-settings"
                    onClick={() => { setVisible(false); setOpt(!optionsBool) }}>
                    <GearFill size={25} color={"#1f52bfc8"} />
                </button>
            </div>
            <div class={(visible) ? ("adder-modal") : ("hidden")}>
                <div class="modal">
                    <div class="header-modal">
                        <p>Add your Assessment for {selected}</p>
                        <button
                            onClick={() => { setVisible(!visible); setOpt(false) }}>
                            <XCircleFill color={"#ff1500b7"} size={20} />
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


                    </div>
                    <div class="footer-modal">
                        <button
                            class="header-add-course"
                            onClick={add}
                        >
                            <Upload size={15} />
                        </button>
                    </div>
                </div>

            </div>

            <div class={(optionsBool) ? ("adder-modal") : ("hidden")}>
                <div class="modal">
                    <div class="header-modal">
                        <p>Options</p>
                        <button
                            onClick={() => { setVisible(false); setOpt(!optionsBool) }}>
                            <XCircleFill color={"#ff1500b7"} size={20} />
                        </button>
                    </div>
                    <div class="body-modal">
                        <div class="modal-options" onClick={logOut}>
                            <BoxArrowDownLeft color={"#1f52bfc8"} size={20} />
                            Logout
                        </div>
                        <hr />
                        <div class="modal-options">
                            <BoxArrowDownLeft color={"#1f52bfc8"} size={20} />
                            Logout
                        </div>
                        <hr />
                        <div class="modal-options">
                            <InfoCircleFill color={"#1f52bfc8"} size={20} />
                            About
                        </div>
                    </div>
                </div>

            </div>



        </div>
    )

}

export default Header;