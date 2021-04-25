import { data } from 'jquery';
import React, { useEffect, useState } from 'react';

import { PlusCircle, Upload } from 'react-bootstrap-icons';

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
                    <div className="adder-container" style={{ "margin": "40px auto -60px auto" }} >
                        <div class="adder-inputs">
                            <input
                                type="text"
                                id="courseName"
                                placeholder="Add Course Name" />
                            <button
                                class="header-add-course"
                                onClick={update}
                            >
                                <Upload size={15} />
                        </button>
                        </div>
                    </div > : ("")
            }
        </>

    )

}

export default CourseAdder;