import React, { useEffect, useState } from 'react';

import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import {
    JournalMinus,
    ArchiveFill
} from 'react-bootstrap-icons';

function Overview({ data, selected, getGpa, updateJson }) {
    const [currentMark, setMark] = useState(0);
    const [gpa, setGpa] = useState("0.00");

    const deleteCourse = () => {
        let result = window.confirm("This course will be deleted forever. Sure you want to delete ?");
        if (result) {
            let json = data;
            delete json[selected];
            updateJson(json)
            NotificationManager.error(selected + " course is deleted ")
        }
    }

    // TODO use the assestotal for current mark in
    useEffect(() => {

        let total = 0;
        let courseCompletion = 0;
        let assessments = data[selected] != null ? data[selected] : [];
        assessments.map(assessment => {
            total += ((assessment[1] / 100) * assessment[2]);
            courseCompletion += assessment[2];
            console.log(total)
        })
        courseCompletion = courseCompletion != 0 ? (total / courseCompletion) : 0;
        setMark((courseCompletion * 100).toPrecision(3));
        let newGpa = getGpa((courseCompletion * 100).toPrecision(3));
        console.log((courseCompletion * 100));
        
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

    }, [data, selected])
    return (
        <div className="overview-container">
            {
                selected != "" ? (
                    <>
                        <h1 class="overview-header">
                            <button
                                className="header-settings"
                                onClick={deleteCourse}>
                                <ArchiveFill size={25} color={"#1f52bfc8"} />
                            </button>
                            {selected}
                        </h1>
                        <div class="overview-mark">
                            <i>{currentMark}% </i>
                            <br />
                            <div id="overview-gpa" class="overview-gpa">{gpa} gpa</div>
                        </div>
                    </>
                ) :
                    (<h1 class="overview-header" style={{ "padding": "5px 20px" }}>Please Select a course</h1>)
            }
        </div>
    )

}

export default Overview;