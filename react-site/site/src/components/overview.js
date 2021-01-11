import React, { useEffect, useState } from 'react';
import '../marks-styler.css';

function Overview({ data, selected }) {
    const [currentMark, setMark] = useState(0);
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
        setMark((courseCompletion * 100).toPrecision(2));
    }, [selected])
    return (
        <div className="overview-container">
            {
                selected != "" ? (
                    <>
                        <h1 class="overview-header">{selected}</h1>
                        <div class = "overview-mark"><i>{currentMark}%</i></div>
                    </>
                ) :
                    (<h1 class="overview-header">Please Select a course</h1>)
            }
        </div>
    )

}

export default Overview;