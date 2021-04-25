import React, { useEffect, useState } from 'react';
import {CircleFill} from 'react-bootstrap-icons';


function Content({ data, setSelHelper, totalAvg,color,asTotal }) {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        let newCourses = []
        for (let course in data) {
            newCourses.push(course);
        }
        setCourses(newCourses);
        console.log(newCourses)
    }, [data,color])

    
    return (
        <div className="content-container">
            {
                courses.map(course =>
                    <div className={"content-course "} id={course} onClick={() => setSelHelper(course)}>
                        <CircleFill class={asTotal[course][1] + 'C'} style={{"margin-right":"10px"}} size={10}/>
                        {course}
                        <span class="course-avg">{asTotal[course][0]} %</span>
                    </div>

                )
            }
        </div>
    )

}

export default Content;