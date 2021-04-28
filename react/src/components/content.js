import React, { useEffect, useState, useContext } from 'react';
import { CircleFill, PlusCircleFill } from 'react-bootstrap-icons';
import { UserDataContext } from '../App';

import { NotificationContainer, NotificationManager } from 'react-notifications';
import ReactDOM from 'react-dom';
import { Carousel } from 'react-responsive-carousel';
import {
    XCircleFill,
    JournalPlus
} from 'react-bootstrap-icons';

function Content({ setSelHelper, asTotal }) {
    const [courses, setCourses] = useState([]);
    const [terms, setTerms] = useState([]);
    const [view, setView] = useState(false);

    const setCurrTerm = useContext(UserDataContext).updateTerm;
    const updateData = useContext(UserDataContext).updateJson;

    let userData = useContext(UserDataContext).data;
    let allData = useContext(UserDataContext).allUserData;
    let currTerm = useContext(UserDataContext).termName;
    // selected is needed as when a course is deleted it should
    // change to ""
    let selected = useContext(UserDataContext).selectedCourse;
    console.log("content render")

    const termSetter = (term) => {
        setCurrTerm(term);
    }
    const addTerm = () => {
        if (document.getElementById("termName").value != "") {
            allData[document.getElementById("termName").value] = {};
            updateData(allData,true);
            termSetter(document.getElementById("termName").value);
            window.location.href="/";
        }
        else {
            NotificationManager.error("Error", "Fill in the required fields", 900);
        }
    }

    useEffect(() => {
        let newCourses = []
        for (let course in userData) {
            newCourses.push(course);
        }
        setCourses(newCourses);
        newCourses = [];
        for (let term in allData) {
            newCourses.push(term);
        }
        setTerms(newCourses);
        console.log("useEffect at Content")
    }, [userData, selected, currTerm])
    return (
        <>
            <Carousel class="carousel" width="100%" showThumbs={false} showStatus={false} showIndicators={false} swipeable={true} emulateTouch={true}  >
                <div className="content-container" >
                    {
                        terms.map(term =>
                            <div className={"content-course "} onClick={() => { termSetter(term) }}>
                                <CircleFill class={(currTerm == term) ? ("awesomeC") : ("badC")} style={{ marginRight: "10px" }} size={10} />
                                {term}
                            </div>

                        )
                    }
                    <button className="content-add-term" onClick={(() => { setView(!view) })}>
                        <PlusCircleFill color={"#1f52bfc8"} size={25} />
                    </button>
                </div>
                <div className="content-container">
                    {
                        courses.map(course =>
                            <div className={"content-course "} id={course} onClick={() => setSelHelper(course)}>
                                <CircleFill class={asTotal[course][1] + 'C'} style={{ marginRight: "10px" }} size={10} />
                                {course}
                                <span class="course-avg">{asTotal[course][0]} %</span>
                            </div>

                        )
                    }
                </div>

            </Carousel >
            <div class={(view) ? ("adder-modal") : ("hidden")} style={{ top: "-100px" }}>
                <div class="modal">
                    <div class="header-modal">
                        <p style={{ "display": "flex", "alignItems": "center" }}>
                            <JournalPlus class="option-icon" color={"#ffff"} size={25} />
                            Add a new term
                        </p>
                        <button
                            onClick={() => { setView(false) }}>
                            <XCircleFill color={"#ffff"} size={20} />
                        </button>
                    </div>
                    <div class="body-modal">
                        <input
                            style={{ "width": "80%" }}
                            type="text"
                            id="termName"
                            placeholder="Name of term eg. 2A" />
                        <button
                            class="header-add-course submitBtn"
                            onClick={() => { addTerm(); setView(false) }}
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </>
    )

}

export default Content;