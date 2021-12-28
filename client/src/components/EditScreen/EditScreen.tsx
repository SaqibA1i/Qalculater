import React, { useEffect, useState } from "react";
import { Plus } from "react-bootstrap-icons";
import { useQalcContext } from "../../context/qalculaterContext";
import PopUp from "../popUp/popUp";
import {
  PopTypes,
  Course,
  AssessmentData,
  CoursePercentageMap
} from "../../TS types/Types";
import { colors } from "../../helperFunctions/colors";
import {
  ArchiveFill,
  PenFill,
  DashCircle,
  PlusCircle
} from "react-bootstrap-icons";
import {
  getCoursePercentageMapFromTerm,
  getAssessmentsFromTermCourse,
  getTermPercentageMapForAll
} from "../../helperFunctions/helpers";

import CompletionBar from "./CompletionBar";

function EditScreen() {
  // Fixed variables
  const iconSize = 50;

  const { userInfo, selection, setSelection, setCarouselSwipable } =
    useQalcContext()!;
  const [popUp, setPopUp] = useState<boolean>(false);
  const [popType, setPopType] = useState<PopTypes>("Term");
  const [courses, setCourses] = useState<CoursePercentageMap>([]);
  const [assessments, setAssessments] = useState<AssessmentData[]>([]);
  const [terms, setTermsAvg] = useState<CoursePercentageMap>([]);
  const [edit, setEdit] = useState<AssessmentData | boolean>(false);
  const [termHidden, hideTerm] = useState<boolean>(false);

  useEffect(() => {
    setTermsAvg(getTermPercentageMapForAll(userInfo.data));
    // make an array of courses
    let newCourses: CoursePercentageMap | undefined =
      getCoursePercentageMapFromTerm(selection.currTerm, userInfo.data);
    let newAssessments: AssessmentData[] = getAssessmentsFromTermCourse(
      selection,
      userInfo.data
    );
    if (newCourses != undefined) {
      setCourses(newCourses);
    }
    setAssessments(newAssessments);
  }, [selection, userInfo]);

  useEffect(() => {
    let hiden = localStorage.getItem("termHidden");
    console.log(hiden == "true");
    if (hiden == "true") {
      hideTerm(true);
    } else {
      hideTerm(false);
    }
  }, []);

  const getColor = (value: number) => {
    if (value < 0.5) {
      value = 1;
    } else {
      value = -2 * value + 2;
    }
    //value from 0 to 1
    var hue = ((1 - value) * 120).toString(10);
    return ["hsl(", hue, ",100%,37%)"].join("");
  };

  const addTerm = () => {
    // addTermHelper();
    setPopType("Term");
    setEdit(false);
    setPopUp(true);
  };
  const addCourse = () => {
    // addTermHelper();
    setPopType("Course");
    setEdit(false);
    setPopUp(true);
  };
  // ASSESSMENTS
  const addAssessment = () => {
    setPopType("Assessment");
    setEdit(false);
    setPopUp(true);
  };
  const editAssessment = (assessment: AssessmentData) => {
    setPopType("Assessment");
    setEdit(assessment);
    setPopUp(true);
  };
  const editTerm = (term: string) => {
    setPopType("Term");
    setEdit([term, NaN, NaN]);
    setPopUp(true);
  };
  const editCourse = (course: AssessmentData) => {
    setPopType("Course");
    setEdit(course);
    setPopUp(true);
  };

  const setPopUpHelper = (p: boolean): void => {
    setPopUp(p);
  };
  const hideTermHelperToggle = () => {
    hideTerm(!termHidden);
    if (!termHidden) {
      localStorage.setItem("termHidden", "true");
    } else {
      localStorage.setItem("termHidden", "false");
    }
  };

  return (
    <div className="edit-screen">
      {popUp && (
        <PopUp
          setPopUp={setPopUpHelper}
          popUp={popUp}
          popType={popType}
          edit={edit}
        />
      )}
      <div className="edit-container">
        <h2>
          Terms
          {termHidden ? (
            <PlusCircle
              size={15}
              color={"#333"}
              onClick={hideTermHelperToggle}
            />
          ) : (
            <DashCircle
              size={15}
              color={"#333"}
              onClick={hideTermHelperToggle}
            />
          )}
        </h2>
        {!termHidden && (
          <div className="edit-slider">
            {terms.map((term, idx) => {
              return (
                <div
                  key={idx}
                  className={
                    selection.currTerm == term[0]
                      ? "edit-slider-term selected"
                      : "edit-slider-term"
                  }
                  onClick={() => {
                    let tempSel = selection;
                    tempSel.currTerm = term[0];
                    tempSel.currCourse = "undefined";
                    setSelection({ ...tempSel! });
                  }}
                >
                  <div className="cover">
                    <div className="container">
                      <div className="left-section">
                        <h5 style={{ color: "#333" }}>{term[0]}</h5>
                        <p style={{ color: colors[idx % colors.length] }}>
                          {term[1] ? term[1].toFixed(2) : " - "}%
                        </p>
                      </div>
                      <p>Completed: {term[2] ? term[2].toFixed(2) : 0}%</p>
                      <CompletionBar
                        completion={term[2] ? term[2] : 0}
                        color={colors[idx % colors.length]}
                      />
                    </div>
                    <div
                      className={
                        selection.currTerm == term[0]
                          ? "bottom-section expanded"
                          : "bottom-section"
                      }
                      onClick={() => {
                        editTerm(term[0]);
                      }}
                    >
                      {selection.currTerm == term[0] && (
                        <PenFill size={20} color={"aliceblue"} />
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
            <div className="edit-add" data-aos="zoom-in" onClick={addTerm}>
              <Plus size={iconSize} color={"#333"} />
            </div>
          </div>
        )}
      </div>
      {selection.currTerm != "undefined" && (
        <div className="edit-container">
          <h2>Courses</h2>
          <div className="edit-slider">
            {courses.map((course, idx) => {
              return (
                <div
                  key={idx}
                  className="edit-slider-term"
                  onClick={() => {
                    selection.currCourse = course[0];
                    setSelection({ ...selection });
                    //TODO add edit panel for courses
                  }}
                  data-aos="slide-left"
                  data-aos-delay={idx * 100}
                >
                  <div className="cover">
                    <div className="container">
                      <div className="left-section">
                        <h5 data-aos="fade-right">{course[0]}</h5>
                        <p
                          data-aos="fade-right"
                          style={{ color: getColor(course[1] / 100) }}
                        >
                          {course[1] ? course[1].toFixed(2) : " - "}%
                        </p>
                      </div>
                      <p>Completed: {course[2].toFixed()}%</p>
                      <CompletionBar
                        data-aos="fade-right"
                        completion={course[2] ? course[2] : 0}
                        color={getColor(course[1] / 100)}
                      />
                    </div>

                    <div
                      className={
                        selection.currCourse == course[0]
                          ? "bottom-section expanded"
                          : "bottom-section"
                      }
                      onClick={() => {
                        editCourse([course[0], course[3]!, NaN]);
                      }}
                      data-aos="zoom-in"
                    >
                      {selection.currCourse == course[0] && (
                        <PenFill size={20} color={"aliceblue"} />
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
            <div className="edit-add" onClick={addCourse}>
              <Plus size={iconSize} color={"#333"} />
            </div>
          </div>
        </div>
      )}
      {selection!.currCourse != "undefined" && (
        <div className="edit-container">
          <h2>Assessments</h2>
          <div
            className={
              termHidden
                ? "edit-slider-vertical edit-slider-vertical-long"
                : "edit-slider-vertical"
            }
            id="assessments"
          >
            {assessments.map((assessment, idx) => {
              return (
                <div
                  key={idx}
                  data-aos="slide-up"
                  data-aos-delay={idx * 100}
                  className="edit-slider-edit-del"
                >
                  <div className="edit-slider-term-vertical">
                    <div className="bottom">
                      <h5>{assessment[0]}</h5>
                      <h6>worth {assessment[2]}%</h6>
                    </div>
                    <p>{assessment[1].toFixed(2)}%</p>
                  </div>
                  <PenFill
                    size={25}
                    color="aliceblue"
                    onClick={() => {
                      editAssessment(assessment);
                    }}
                  />
                </div>
              );
            })}
            <div className="edit-add" onClick={addAssessment}>
              <Plus size={iconSize} color={"#333"} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EditScreen;
