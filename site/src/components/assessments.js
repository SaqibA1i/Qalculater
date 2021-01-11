import React, { useEffect, useState } from 'react';
import '../marks-styler.css';

function Assessments({ data, selected, updateJson }) {
    const [assessments, setAssessments] = useState([])

    useEffect(() => {
        let newAssessments = data[selected] != null ? data[selected] : [];

        setAssessments(newAssessments)
        console.log(data[selected])
    }, [data, selected])

    const removeAssessment = (assessment) => {
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
        console.log(json);
    }
    return (
        <div className="assessment-container">
            {assessments.map(assessment =>
                <div class="assessment-single assessment-data">
                    <div>
                        <b>{assessment[0]}</b>
                        <p>{"Mark: " + assessment[1] + " % "}</p>
                        <p>{"Weightage: " + assessment[0]}</p>
                    </div>
                    <div>
                        <button class="assessment-remove" onClick={() => removeAssessment(assessment[0])}>X</button>
                    </div>
                </div>
            )}
        </div>

    )

}

export default Assessments;