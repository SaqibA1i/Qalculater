import { data } from 'jquery';
import React, { useEffect, useState } from 'react';
import '../marks-styler.css';

function CourseAdder({ courseAddBool, updateJson, data }) {

    const update = () => {
        let json = data;
        json[document.getElementById("courseName").value] = [];
        updateJson(json)
    }
    return (
        <div className="adder-container" style={{"margin-top": "90px"}}>
            {courseAddBool ?
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

                </div> : ("")
            }

        </div>
    )

}

export default CourseAdder;