import React, { useEffect, useState } from 'react';
import '../marks-styler.css';
import { PlusCircle, Upload } from 'react-bootstrap-icons';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { isEmptyObject } from 'jquery';


function Adder({ data, selected, updateJson }) {
    const [visible, setVisible] = useState(false);

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
        <div className="adder-container">
            {selected != "" && (
                <>
                    <button
                        className="header-add-course"
                        onClick={() => setVisible(!visible)}>
                        +
                    </button>
                    {visible ?
                        <div class="adder-inputs">
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
                                    placeholder="Percent" />
                                <input
                                    type="number"
                                    id="assessmentWeightage"
                                    max="100"
                                    min="0"
                                    placeholder="Weight" />
                            </div>
                            <button
                                class="header-add-course"
                                onClick={add}
                            >
                                <Upload size={15}/>
                            </button>

                        </div> : ("")}
                </>
            )}

        </div>
    )

}

export default Adder;