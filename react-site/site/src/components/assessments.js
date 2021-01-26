import React, { useEffect, useState } from 'react';
import '../marks-styler.css';

import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';


function Assessments({ data, selected, updateJson }) {
    const [assessments, setAssessments] = useState([]);
    const [courseCompletion, setCompletion] = useState(0);

    useEffect(() => {
        let newAssessments = data[selected] != null ? data[selected] : [];
        setAssessments(newAssessments)

        let total = 0;
        newAssessments.map(assessment => {
            total += assessment[2];
            console.log(assessment[2])
        })
        setCompletion(total);
        setAssessments(newAssessments);
        console.log(total)
        console.log(data[selected])
        // set width of completion bar
        document.getElementById("assessment-completion-bar").style.width = total + "px";
    }, [data, selected])

    const removeAssessment = (assessment) => {
        let result = window.confirm("Sure you want to delete ?");
        if (result) {
            NotificationManager.error(assessment + " is deleted", selected)
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
        }
        
    }
    return (
        <div className="assessment-container">
            <div class="assessment-completion">
                Course Completion <b>{courseCompletion}</b>  %
            </div>
            <div id="assessment-completion-bar" class="assessment-completion-bar">

            </div>
            {assessments.map(assessment =>
                <div class="assessment-single assessment-data">
                    <div>
                        <b>{assessment[0]}</b>
                        <p>{"Mark: " + assessment[1] + " % "}</p>
                        <p>{"Weightage: " + assessment[2]}</p>
                    </div>
                    <div>
                        <button class="header-add-course" onClick={() => removeAssessment(assessment[0])}>x</button>
                    </div>
                </div>
            )}
        </div>

    )

}

export default Assessments;