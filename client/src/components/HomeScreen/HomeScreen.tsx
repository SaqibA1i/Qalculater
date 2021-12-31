import React, { useEffect, useState } from "react";
import { useQalcContext } from "../../context/qalculaterContext";
import BarOverview from "./BarOverview/BarOverview";
import {
  Book,
  GraphDownArrow,
  GraphUpArrow,
  CheckCircle,
  XCircle,
  Check2Circle,
  Mortarboard
} from "react-bootstrap-icons";
import {
  AssessmentData,
  CoursePercentageMap,
  coursePercentageSingle
} from "../../TS types/Types";
import {
  getAssessmentsFromTermCourse,
  getTermPercentageMapFrom,
  getTermPercentageMapForAll
} from "../../helperFunctions/helpers";

function HomeScreen() {
  const [courseStatistics, setCourseStats] = useState<
    [aHundredCount: number, failedCount: number, totalAssessments: number]
  >([0, 0, 0]);
  const [termStatistics, setTermStats] = useState<{
    average: number;
    gpa: number;
    completed: number;
    highestTerm: { name: string; average: number };
    lowestTerm: { name: string; average: number };
  }>({
    average: 0,
    gpa: 0,
    completed: 0,
    highestTerm: { name: "", average: NaN },
    lowestTerm: { name: "", average: NaN }
  });

  const { selection, userInfo } = useQalcContext()!;
  useEffect(() => {
    // TERMS
    let termInfo: coursePercentageSingle | undefined = getTermPercentageMapFrom(
      userInfo.data,
      selection.currTerm
    );
    let termMap: CoursePercentageMap = getTermPercentageMapForAll(
      userInfo.data
    );
    termMap.sort(
      (term1: coursePercentageSingle, term2: coursePercentageSingle) => {
        if (term1[1] > term2[1]) {
          return -1;
        }
        return 1;
      }
    );
    if (termInfo != undefined) {
      termStatistics.average = termInfo?.[1];
      termStatistics.completed = termInfo[4]!;
    }
    if (termMap.length > 0) {
      termStatistics.highestTerm.name = termMap[0][0];
      termStatistics.highestTerm.average = termMap[0][1];

      termStatistics.lowestTerm.name = termMap[termMap.length - 1][0];
      termStatistics.lowestTerm.average = termMap[termMap.length - 1][1];
    }
    setTermStats({ ...termStatistics });
    // ASSESSMENTS
    let assessments: AssessmentData[] = getAssessmentsFromTermCourse(
      selection,
      userInfo.data
    );
    let failed = 0;
    let atHundred = 0;
    assessments.map((assessment: AssessmentData) => {
      if (assessment[1] === 100) {
        ++atHundred;
      } else if (assessment[1] < 50) {
        ++failed;
      }
    });
    setCourseStats([atHundred, failed, assessments.length]);
  }, [selection, userInfo]);

  return (
    <div className="edit-screen" style={{ marginBottom: "100px" }}>
      <div className="edit-container">
        <h2>
          Key Term Statistics: <b>{selection.currTerm}</b>
        </h2>
        <div className="edit-slider" style={{ marginBottom: 0 }}>
          <div className="key-statistics-card">
            <Book size={30} color="#064bcac2" />
            <p>
              {selection.currTerm != "undefined" && selection.currTerm} Average
            </p>
            <h5>
              <b style={{ margin: 0 }}>{termStatistics.average} %</b>
            </h5>
          </div>
          {/* <div className="key-statistics-card">
            <Mortarboard size={30} color={"#064bcac2"} />
            <p>{selection.currTerm} CGPA</p>
            <h5>{termStatistics.gpa.toFixed(2)}</h5>
          </div> */}
          <div className="key-statistics-card">
            <CheckCircle size={30} color="#064bcac2" />
            <p>
              {selection.currTerm != "undefined" && selection.currTerm} Courses
              Completed
            </p>
            <h5>{termStatistics.completed}</h5>
          </div>
          <div className="key-statistics-card">
            <GraphUpArrow size={30} color="#064bcac2" />
            <p>Highest Term</p>
            <h5>
              {termStatistics.highestTerm.name}
              <b>{termStatistics.highestTerm.average} %</b>
            </h5>
          </div>
          <div className="key-statistics-card">
            <GraphDownArrow size={30} color="#064bcac2" />
            <p>Lowest Term</p>
            <h5>
              {termStatistics.lowestTerm.name}
              <b>{termStatistics.lowestTerm.average} %</b>
            </h5>
          </div>
        </div>
      </div>
      <BarOverview termAvg={termStatistics.average} />
      <div className="edit-container">
        <h2>
          Key Course Statistics:{" "}
          <b>
            {selection.currCourse == "undefined" ? "" : selection.currCourse}
          </b>
        </h2>
        {selection.currCourse != "undefined" && (
          <div className="edit-slider">
            <div className="key-statistics-card">
              <Check2Circle size={30} color="#064bcac2" />
              <p>100% Assessments</p>
              <h5>
                {courseStatistics[0]} / {courseStatistics[2]}
              </h5>
            </div>
            <div className="key-statistics-card">
              <XCircle size={30} color="#064bcac2" />
              <p>Failed Assessments</p>
              <h5>
                {courseStatistics[1]} / {courseStatistics[2]}
              </h5>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default HomeScreen;
