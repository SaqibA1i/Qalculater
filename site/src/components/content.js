import React, { useEffect, useState } from 'react';
import '../marks-styler.css';

function Content({data, setSelHelper}) {
    const [courses, setCourses] = useState([]);
    useEffect(() => {
        let newCourses = []
        for (let course in data) {
            newCourses.push(course);
        }
        setCourses(newCourses);
        console.log(newCourses)
    }, [data])
    return (
        <div className="content-container">
            {
                courses.map(course =>
                    <div className="content-course" onClick={()=>setSelHelper(course)}>
                        {course}
                    </div>

                )
            }
        </div>
    )

}

export default Content;