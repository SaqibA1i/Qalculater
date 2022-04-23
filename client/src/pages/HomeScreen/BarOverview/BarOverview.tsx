import { useSelector } from "react-redux";

import { getSelData } from "../../../redux/currentSelections/selectors";
import useUpdateSelection from "../../../hooks/useUpdateSelection";
import { getFilteredData } from "../../../redux/grades/selectors";
import { keys } from "lodash";
import { getColor } from "../../../utils/helpers/colors";
import { useMemo } from "react";

function BarOverview() {
  const { updateSelected } = useUpdateSelection();

  const { currTerm, currCourse } = useSelector(getSelData);
  const { terms, courses } = useSelector(getFilteredData);
  if (currTerm === undefined) {
    return <></>;
  }
  const { average = 0 } = terms[currTerm] || {};

  const getWidth = () => {
    return 65 / keys(courses).length + "vw"; // 5 margin each side
  };

  const getGradient = (courseAverage: number) => {
    return (
      "linear-gradient(" +
      getColor((courseAverage + 3) / 100) +
      ", " +
      getColor((courseAverage - 10) / 100) +
      ")"
    );
  };

  const sortedCourses = keys(courses).sort((a, b) => {
    const { average: prev } = courses[a];
    const { average: next } = courses[b];
    if (prev < next) {
      return 0;
    }
    return -1;
  });

  return (
    <div className="bar-overview" id="bar-overview">
      <div className="avgLine" style={{ top: -2 * average + 235 }}>
        <p>{average}</p>
        <hr />
      </div>
      <div className="container">
        {sortedCourses.map((courseName: string, idx) => {
          const { average } = courses[courseName];
          let width = getWidth();
          return (
            <div className="bar-container" key={idx}>
              <div
                className="bar"
                onClick={() => {
                  updateSelected({ currTerm, currCourse: courseName });
                }}
                style={{
                  height: average * 2 || 0 + "px",
                  width: width,
                  background: getGradient(average),
                  boxShadow:
                    "0px 0px 9px 0px " + getColor((average - 10) / 100),
                }}
              >
                <p>{average.toFixed(2)}%</p>
              </div>
              <p
                key={idx}
                style={
                  courseName === currCourse
                    ? {
                        fontWeight: 900,
                        maxWidth: width + "px",
                      }
                    : {
                        maxWidth: width + "px",
                        borderBottom: "1px solid transparent",
                      }
                }
                className={courseName === currCourse ? "selected" : ""}
              >
                {courseName}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default BarOverview;
