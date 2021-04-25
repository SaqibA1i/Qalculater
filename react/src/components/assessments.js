import React, { useEffect, useState } from 'react';

import { PenFill, ArchiveFill } from 'react-bootstrap-icons';

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
        document.getElementById("assessment-completion-bar").style.width = total + "%";
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

    const editAssessment = (assessment) => {

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
                    <div style={{"width":"100%"}}>
                        <b class="assessment-header">
                            {assessment[0]} 
                            <i><span class="mark">{assessment[1]}%</span>  worth  <span class="worth">{assessment[2]}</span></i>
                            <button class="header-add-course" onClick={() => removeAssessment(assessment[0])}><ArchiveFill size={15} /></button>
                        </b>
                    </div>
                </div>
            )}
        </div>

    )

}

export default Assessments;