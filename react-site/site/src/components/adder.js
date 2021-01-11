import React, { useEffect, useState } from 'react';
import '../marks-styler.css';

function Adder({ data, selected, updateJson }) {
    const [visible, setVisible] = useState(false);

    const add = () => {
        let name = document.getElementById("assessmentName").value;
        name = (name != "" || name != null) ? name : "unnamed";

        let percentage = document.getElementById("assessmentPercentage").value;
        percentage = percentage != null ? percentage : 0;

        let weightage = document.getElementById("assessmentWeightage").value;
        weightage = weightage != null ? weightage : 0;

        let json = data;
        let updatedAssessments = data[selected];
        updatedAssessments.push([name, parseInt(percentage), parseInt(weightage)]);

        json[selected] = updatedAssessments;
        updateJson(json);
    }
    return (
        <div className="adder-container">
            {selected != "" && (
                <>
                    <button className="adder-button" onClick={() => setVisible(!visible)}>+</button>
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
                                    placeholder="Your percentage acheived" />
                                <input
                                    type="number"
                                    id="assessmentWeightage"
                                    max="100"
                                    min="0"
                                    placeholder="Weight of Assessment" />
                            </div>
                            <button
                                class="assessment-remove"
                                onClick={add}
                            >
                                submit
                        </button>

                        </div> : ("")}
                </>
            )}

        </div>
    )

}

export default Adder;