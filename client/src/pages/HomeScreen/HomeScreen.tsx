import BarOverview from "./BarOverview/BarOverview";
import {
  Book,
  GraphDownArrow,
  GraphUpArrow,
  CheckCircle,
  XCircle,
  Check2Circle,
} from "react-bootstrap-icons";
import { CurrSelection } from "../../TS types/Types";

import { useSelector } from "react-redux";
import { getSelData } from "../../redux/currentSelections/selectors";
import { getFilteredData } from "../../redux/grades/selectors";
import { keys, maxBy, values } from "lodash";

function HomeScreen() {
  const { currTerm = "", currCourse } = useSelector(
    getSelData
  ) as CurrSelection;
  const { terms, courses, assessments } = useSelector(getFilteredData);

  const { average = 0 } = terms[currTerm] || {};

  const completedCourses = () => {
    let result = 0;
    keys(courses).forEach((name) =>
      courses[name].completion >= 100 ? ++result : 0
    );
    return result;
  };

  const aboveAverage = () => {
    let result = 0;
    keys(assessments).forEach((name) => {
      const percentage = assessments[name].myScorePercentage;
      percentage > average && result++;
    });
    return result;
  };

  const failedAssessments = () => {
    let result = 0;
    keys(assessments).forEach((name) => {
      const percentage = assessments[name].myScorePercentage;
      percentage < 50 && result++;
    });
    return result;
  };

  return (
    <div className="edit-screen" style={{ marginBottom: "100px" }}>
      <div className="edit-container">
        <h2>
          Key Term Statistics: <b>{currTerm}</b>
        </h2>
        <div className="edit-slider" style={{ marginBottom: 0 }}>
          <div className="key-statistics-card">
            <Book size={30} />
            <p>{currTerm} Average</p>
            <h5>
              <b style={{ margin: 0 }}>{average || "--"} %</b>
            </h5>
          </div>
          <div className="key-statistics-card">
            <CheckCircle size={30} />
            <p>{currTerm !== undefined && currTerm} Courses Completed</p>
            <h5>{completedCourses()}</h5>
          </div>
          <div className="key-statistics-card">
            <GraphUpArrow size={30} />
            <p>Highest Term</p>
            <h5>{}</h5>
          </div>
          <div className="key-statistics-card">
            <GraphDownArrow size={30} />
            <p>Lowest Term</p>
            <h5></h5>
          </div>
        </div>
      </div>
      <BarOverview />
      <div className="edit-container">
        <h2>
          Key Course Statistics:{" "}
          <b>{currCourse === undefined ? "" : currCourse}</b>
        </h2>
        {currCourse !== undefined && (
          <div className="edit-slider">
            <div className="key-statistics-card">
              <Check2Circle size={30} color="green" />
              <p>Above Average Assessments</p>
              <h5>
                {aboveAverage()} / {keys(assessments).length}
              </h5>
            </div>
            <div className="key-statistics-card">
              <XCircle size={30} color="red" />
              <p>Failed Assessments</p>
              <h5>
                {failedAssessments()} / {keys(assessments).length}
              </h5>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default HomeScreen;
