import React, { useEffect, useState } from "react";
import { useQalcContext } from "../../../context/qalculaterContext";
import {
  getCoursePercentageMapFromTerm,
  getTermPercentageMapFrom
} from "../../../helperFunctions/helpers";
import {
  CoursePercentageMap,
  Course,
  coursePercentageSingle
} from "../../../TS types/Types";

interface BarProps {
  termAvg: number;
}

function BarOverview(Props: BarProps) {
  const [coursePercentageMap, setCoursePercentageMap] =
    useState<CoursePercentageMap>([]);
  const [avg, setAvg] = useState<number>(389);

  const { userInfo, selection, setSelection } = useQalcContext()!;

  const getColor = (value: number) => {
    if (value < 0.5) {
      value = 1;
    } else {
      value = -2 * value + 2;
    }
    //value from 0 to 1
    var hue = ((1 - value) * 120).toString(10);
    return ["hsl(", hue, ",80%,50%)"].join("");
  };

  useEffect(() => {
    if (document.getElementsByClassName("bar").length != 0) {
      let top =
        (document.getElementsByClassName("bar")[0] as HTMLBodyElement)
          .offsetTop +
        (document.getElementsByClassName("bar")[0] as HTMLBodyElement)
          .offsetHeight -
        10;
      setAvg(top);
      console.log(top);
    } else {
      console.log("zero");
    }
    let courses: CoursePercentageMap | void = getCoursePercentageMapFromTerm(
      selection.currTerm,
      userInfo.data!
    );
    getTermPercentageMapFrom(userInfo.data, selection.currTerm);
    if (courses) {
      courses.sort((a: coursePercentageSingle, b: coursePercentageSingle) => {
        if (a[1] > b[1]) {
          return -1;
        }
        return 1;
      });
      setCoursePercentageMap([...courses]);
    }
  }, [userInfo, selection]);

  const getWidth = () => {
    let courses = coursePercentageMap.length;
    let containerWidth = document.getElementById("bar-overview")!.clientWidth;
    return (containerWidth - 150) / courses + 10; // 5 margin each side
  };
  return (
    <div className="bar-overview" id="bar-overview">
      <div className="avgLine" style={{ top: avg - Props.termAvg * 2 }}>
        <p>{Props.termAvg}</p>
        <hr />
      </div>
      <div className="container">
        {coursePercentageMap.map((singleMap, idx) => {
          let width = getWidth();
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
                  width: width + "px",
                  background:
                    "linear-gradient(" +
                    getColor((singleMap[1] + 3) / 100) +
                    ", " +
                    getColor((singleMap[1] - 10) / 100) +
                    ")"
                }}
              >
                <p>{singleMap[1].toFixed(2)}%</p>
              </div>
              <p
                key={idx}
                style={
                  singleMap[0] === selection.currCourse
                    ? {
                        color: "#2c76ffc2",
                        fontWeight: 900,
                        width: width + "px"
                      }
                    : { width: width + "px" }
                }
              >
                {singleMap[0]}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default BarOverview;
