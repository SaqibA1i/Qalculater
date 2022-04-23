import { useEffect, useState } from "react";
import { DashCircle, PlusCircle, Grid, GridFill } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { getSelData } from "../../redux/currentSelections/selectors";
import { getFilteredData } from "../../redux/grades/selectors";
import PillRow from "../../components/PillRow";
import AssessmentSection from "../../components/AssessmentSection";
import { CAROUSEL_ACTIONS } from "../../redux/carousel";
import { getSlide } from "../../redux/carousel/selectors";

function EditScreen() {
  // Fixed variables
  const dispatch = useDispatch();
  const { currCourse, currTerm } = useSelector(getSelData);
  const { terms, courses } = useSelector(getFilteredData);
  const { termHidden } = useSelector(getSlide);

  return (
    <div className="edit-screen">
      <div className="edit-container">
        <h2>
          Terms
          {termHidden ? (
            <PlusCircle
              size={15}
              onClick={() => {
                dispatch(CAROUSEL_ACTIONS.toggleTermHidden(false));
              }}
            />
          ) : (
            <DashCircle
              size={15}
              onClick={() => {
                dispatch(CAROUSEL_ACTIONS.toggleTermHidden(true));
              }}
            />
          )}
        </h2>
        {!termHidden && <PillRow data={terms} isTermRow />}
      </div>

      <div className="edit-container">
        <h2>
          Courses: <b>{currTerm}</b>
        </h2>
        {currTerm && <PillRow data={courses} isTermRow={false} />}
      </div>

      {currCourse && <AssessmentSection />}
    </div>
  );
}

export default EditScreen;
