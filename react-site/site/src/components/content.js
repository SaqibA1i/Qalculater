import React, { useEffect, useState } from 'react';

function Content({ data, setSelHelper, totalAvg,color }) {
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
                    <div className={"content-course "+color} id={course} onClick={() => setSelHelper(course)}>
                        {course}
                    </div>

                )
            }
        </div>
    )

}

export default Content;