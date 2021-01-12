import { data } from 'jquery';
import React, { useEffect, useState } from 'react';
import '../marks-styler.css';

import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';

function CourseAdder({ courseAddBool, updateJson, data }) {

    const update = () => {
        let json = data;
        json[document.getElementById("courseName").value] = [];
        updateJson(json)
        NotificationManager.info(document.getElementById("courseName").value + " course is added ")
    }
    return (
        <>
            <NotificationContainer />
            {
                courseAddBool ?
                    <div className="adder-container" style={{ "margin-top": "40px" }} >
                        <div class="adder-inputs">
                            <input
                                type="text"
                                id="courseName"
                                placeholder="Add Course Name" />
                            <button
                                class="assessment-remove"
                                onClick={update}
                            >
                                submit
                        </button>
                        </div>
                    </div > : ("")
            }
        </>

    )

}

export default CourseAdder;