import React, { useEffect, useState } from "react";
import { useQalcContext } from "../../../context/qalculaterContext";
import {
  getCoursePercentageMapFromTerm,
  getTermPercentageMapFrom,
} from "../../../helperFunctions/helpers";
import { CoursePercentageMap, Course } from "../../../TS types/Types";

function BarOverview() {
  const [coursePercentageMap, setCoursePercentageMap] =
    useState<CoursePercentageMap>([]);
  const { userInfo, selection, setSelection } = useQalcContext()!;
  const getColor = (value: number) => {
    if (value < 0.5) {
      value = 1;
    } else {
      value = -2 * value + 2;
    }
    //value from 0 to 1
    var hue = ((1 - value) * 120).toString(10);
    return ["hsl(", hue, ",100%,50%)"].join("");
  };
  useEffect(() => {
    let courses: CoursePercentageMap | void = getCoursePercentageMapFromTerm(
      selection.currTerm,
      userInfo.data!
    );
    getTermPercentageMapFrom(userInfo.data, selection.currTerm);
    if (courses) {
      setCoursePercentageMap(courses);
    }
  }, [userInfo, selection]);
  return (
    <div className="bar-overview">
      {coursePercentageMap.map((singleMap, idx) => {
        return (
          <div className="bar-container" key={idx}>
            <div
              className="bar"
              onClick={() => {
                selection.currCourse = singleMap[0];
                setSelection({ ...selection });
                //TODO add edit panel for courses;
              }}
              style={{
                height: singleMap[1] * 2 + "px",
                background:
                  "linear-gradient(" +
                  getColor((singleMap[1] + 3) / 100) +
                  ", " +
                  getColor((singleMap[1] - 10) / 100) +
                  ")",
              }}
            >
              <p>{singleMap[1].toFixed(2)}%</p>
            </div>
            <p key={idx}>{singleMap[0]}</p>
          </div>
        );
      })}
    </div>
  );
}

export default BarOverview;
