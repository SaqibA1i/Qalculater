import React, { useEffect, useState } from 'react';


function Overview({ data, selected, getGpa, setColor }) {
    const [currentMark, setMark] = useState(0);
    const [gpa, setGpa] = useState("0.00");
// TODO use the assestotal for current mark in course
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
        let num = parseInt(newGpa);
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
                        <h1 class="overview-header">{selected}</h1>
                        <div class="overview-mark">
                            <i>{currentMark}%</i>
                            <br />
                            <div id="overview-gpa" class="overview-gpa">{gpa} gpa</div>
                        </div>
                    </>
                ) :
                    (<h1 class="overview-header">Please Select a course</h1>)
            }
        </div>
    )

}

export default Overview;