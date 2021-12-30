import { courseData, User } from "../TS types/Types";
import axios from "axios";
import {
  AcademicData,
  Term,
  Course,
  CoursePercentageMap,
  AssessmentData,
  currSelection,
  coursePercentageSingle
} from "../TS types/Types";

// smaller helper functions
const indexAtWhichTermExists = (
  term: string,
  userData: AcademicData
): number | undefined => {
  for (let i = 0; i < userData.length; i++) {
    if (Object.keys(userData[i])[0] == term) {
      // index at which the term exists has been found!
      return i;
    }
  }

  // the term does not exist
  return undefined;
};

const indexAtWhichCourseExists = (
  termData: Course[],
  currCourse: string
): number | undefined => {
  for (let i = 0; i < termData.length; i++) {
    if (Object.keys(termData[i])[0] === currCourse) {
      return i;
    }
  }
  return undefined;
};

const getCourseAvg = (
  courseInfo: courseData
): [courseAvg: number, courseCompletion: number] => {
  let assessments = courseInfo.data;
  let result: number = 0;
  let divisor: number = 0;
  for (let i = 0; i < assessments.length; i++) {
    result += (assessments[i][1] * assessments[i][2]) / 100;
    divisor += assessments[i][2];
  }
  return [parseFloat(((100 * result) / divisor).toFixed(2)), divisor];
};

export const getCoursePercentageMapFromTerm = (
  term: string | "undefined",
  userData: AcademicData
): CoursePercentageMap => {
  let result: CoursePercentageMap = [];
  if (term != "undefined" && userData != undefined) {
    // Get the index at which this term exists
    let idx = indexAtWhichTermExists(term, userData);
    // push all course keys into the result array
    if (idx != undefined) {
      let termData: Course[] = userData[idx][term];
      for (let i = 0; i < termData.length; i++) {
        let courseName = Object.keys(termData[i])[0];
        let courseAverage = getCourseAvg(termData[i][courseName]);
        result.push([
          Object.keys(termData[i])[0],
          courseAverage[0],
          courseAverage[1],
          termData[i][courseName].credit
        ]);
      }
    }
  } else {
    console.log("Your Term and/or userData is undefined");
  }
  return result;
};

export const getTermPercentageMapFrom = (
  userData: AcademicData,
  term: string
): coursePercentageSingle | undefined => {
  let termCompletion = 0;
  let divisor = 0;
  let runningCount = 0;
  let idx = indexAtWhichTermExists(term, userData);
  let atHundred = 0;
  if (idx != undefined) {
    let termName: string = Object.keys(userData[idx])[0];
    let courses: Course[] = userData[idx][termName];
    courses.forEach((course: Course) => {
      let courseAvg: [courseAvg: number, courseCompletion: number] =
        getCourseAvg(course[Object.keys(course)[0]]);
      let courseCred: number = course[Object.keys(course)[0]].credit;
      runningCount += courseCred * courseAvg[0];
      if (courseAvg[1] > 99) {
        ++atHundred;
      }
      termCompletion += Math.min(courseAvg[1], 100); // if some courses have bonuses and completion exceeds 100%
      divisor += courseCred;
    });
    return [
      term,
      parseFloat((runningCount / divisor).toFixed(2)),
      termCompletion / courses.length,
      0,
      atHundred
    ];
  }

  return undefined;
};

export const getTermPercentageMapForAll = (
  userData: AcademicData
): CoursePercentageMap => {
  let result: CoursePercentageMap = [];

  userData.forEach((term: Term) => {
    let termName = Object.keys(term)[0];
    let courseAvgMap = getTermPercentageMapFrom(userData, termName);
    if (courseAvgMap != undefined) {
      result.push(courseAvgMap);
    }
  });

  return result;
};

export const getAssessmentsFromTermCourse = (
  selection: currSelection,
  userData: AcademicData | undefined
): AssessmentData[] => {
  let result: AssessmentData[] = [];

  try {
    if (
      selection.currTerm != "undefined" &&
      selection.currCourse != "undefined" &&
      userData != undefined
    ) {
      // Get the index at which this term exists
      let idx = indexAtWhichTermExists(selection.currTerm, userData);
      if (idx != undefined) {
        let termData: Course[] = userData[idx][selection.currTerm];

        let idxCourse = indexAtWhichCourseExists(
          termData,
          selection.currCourse
        );

        let assessments: AssessmentData[] = [];

        if (idxCourse != undefined) {
          assessments = termData[idxCourse][selection.currCourse].data;
          return assessments;
        } else {
          throw "Course is undefined";
        }
      } else {
        throw "Term is undefined";
      }
    } else {
      throw "Term, Course and/or User Data is undefined";
    }
  } catch (err) {
    console.log(" Adding Assessment", err);
  }
  // push all course keys into the result array

  return result;
};

// Functions which push data to the server

const push = async (updatedUserData: AcademicData) => {
  let result = await axios({
    url: process.env.REACT_APP_SERVER_PROXY + "term/update",
    method: "POST",
    withCredentials: true,
    data: {
      data: updatedUserData
    }
  });
  return result.data;
};

//! TERM HELPERS
export const addTermPushHelper = async (
  termToAdd: string,
  userData: AcademicData
): Promise<AcademicData | string> => {
  let errorString = "";
  let updatedData: AcademicData = userData;

  let term: Term = {};
  term[termToAdd] = [];

  try {
    //! Check if Term already exists
    for (let i = 0; i < userData.length; i++) {
      if (userData[i][termToAdd] != undefined) {
        throw "This term already exists";
      }
    }
    //! Check if Term length is within limits
    if (termToAdd.length >= 20) {
      throw "Term name is to big, keep it less than 20 characters";
    }

    updatedData.unshift(term);
    // push updated data
    let result = await push(userData);
    console.log("[Success] - Adding a Term", result);
    return result.data.data;
  } catch (err) {
    return "" + err;
  }
};
export const editTermPushHelper = async (
  termToEdit: string,
  newTerm: string,
  userData: AcademicData
): Promise<AcademicData | string> => {
  let updatedData: AcademicData = userData;
  try {
    //! Check if Term already exists
    for (let i = 0; i < userData.length; i++) {
      if (userData[i][newTerm] != undefined) {
        throw "This term already exists";
      }
    }
    //! Check if Term length is within limits
    if (newTerm.length >= 20) {
      throw "Term name is to big, keep it less than 20 characters";
    }

    // update
    let index = indexAtWhichTermExists(termToEdit, userData);
    if (index != undefined) {
      updatedData[index][newTerm] = updatedData[index][termToEdit];
      delete updatedData[index][termToEdit];
    } else {
      throw "The term you are editing does not exist";
    }

    // push updated data
    let result = await push(userData);
    console.log("[Success] - Editing a Term", result);
    return result.data.data;
  } catch (err) {
    return "" + err;
  }
};
export const deleteTermPushHelper = async (
  termToDelete: string,
  userData: AcademicData
): Promise<AcademicData | string> => {
  let updatedData: AcademicData = userData;
  try {
    // update
    let index = indexAtWhichTermExists(termToDelete, userData);
    if (index != undefined) {
      updatedData.splice(index, 1);
    } else {
      throw "The term you are editing does not exist";
    }

    // push updated data
    let result = await push(userData);
    console.log("[Success] - Deleting a Term", result);
    return result.data.data;
  } catch (err) {
    return "" + err;
  }
};

//! COURSE HELPERS
export const addCoursePushHelper = async (
  courseToAdd: string,
  courseCredit: number,
  currTerm: string,
  userData: AcademicData
): Promise<AcademicData | string> => {
  let idx: number | undefined = indexAtWhichTermExists(currTerm, userData);
  console.log("Index of term: ", currTerm, " - ", idx);
  try {
    if (idx != undefined) {
      let newCourse: Course = {};

      //! Check if Course already exists
      for (let i = 0; i < userData[idx][currTerm].length; i++) {
        if (userData[idx][currTerm][i][courseToAdd] != undefined) {
          throw "This Course already exists";
        }
      }
      //! Check if Term length is within limits
      if (courseToAdd.length >= 20) {
        throw "Term name is to big, keep it less than 20 characters";
      }
      //! Course Cred cant be negative
      if (courseCredit < 0) {
        throw "Course credit can not be negative";
      }

      newCourse[courseToAdd] = { credit: courseCredit, data: [] };
      userData[idx][currTerm].push(newCourse);

      // push updated data
      let result = await push(userData);
      console.log("[Success] - Adding a course", result);

      return result.data.data;
    } else {
      throw "Term index is undefined";
    }
  } catch (err) {
    return "" + err;
  }
};
export const editCoursePushHelper = async (
  newCourseToAdd: string,
  courseToEdit: string,
  newCredToAdd: number,
  courseCredit: number,
  currTerm: string,
  userData: AcademicData
): Promise<AcademicData | string> => {
  let idx: number | undefined = indexAtWhichTermExists(currTerm, userData);

  try {
    if (idx != undefined) {
      let newCourse: Course = {};
      let idxCourse: number | undefined = indexAtWhichCourseExists(
        userData[idx][currTerm],
        courseToEdit
      );
      //! Check if Course already exists
      for (let i = 0; i < userData[idx][currTerm].length; i++) {
        // (name is same) && (credit is same)
        if (
          userData[idx][currTerm][i][newCourseToAdd] != undefined &&
          userData[idx][currTerm][i][newCourseToAdd].credit === newCredToAdd
        ) {
          throw "This Course already exists";
        }
      }
      //! Check if Term length is within limits
      if (newCourseToAdd.length >= 20) {
        throw "Term name is to big, keep it less than 20 characters";
      }
      //! Course Cred cant be negative
      if (courseCredit < 0) {
        throw "Course credit can not be negative";
      }
      if (idxCourse == undefined) {
        throw "Course to edit does not exist";
      }
      newCourse[newCourseToAdd] = {
        credit: newCredToAdd,
        data: userData[idx][currTerm][idxCourse][courseToEdit].data
      };

      userData[idx][currTerm].splice(idxCourse, 1);
      userData[idx][currTerm].push(newCourse);

      // push updated data
      let result = await push(userData);
      console.log("[Success] - Editing a course", result);

      return result.data.data;
    } else {
      throw "Term index is undefined";
    }
  } catch (err) {
    return "" + err;
  }
};
export const deleteCoursePushHelper = async (
  courseToDelete: string,
  currTerm: string,
  userData: AcademicData
): Promise<AcademicData | string> => {
  let idx: number | undefined = indexAtWhichTermExists(currTerm, userData);

  let errorString: string = "";
  try {
    if (idx != undefined) {
      let newCourse: Course = {};
      let idxCourse: number | undefined = indexAtWhichCourseExists(
        userData[idx][currTerm],
        courseToDelete
      );

      if (idxCourse == undefined) {
        throw "Course to delete does not exist";
      }

      userData[idx][currTerm].splice(idxCourse, 1);

      // push updated data
      let result = await push(userData);
      console.log("[Success] - Editing a course", result);

      return result.data.data;
    } else {
      throw "Term index is undefined";
    }
  } catch (err) {
    errorString = " - Editing a course " + err;
    return errorString;
  }
};

//! ASSESSMENT HELPERS
export const addAssessmentPushHelper = async (
  assessmentToAdd: AssessmentData,
  currSelection: currSelection,
  userData: AcademicData
): Promise<AcademicData | string> => {
  console.log("Adding Assessment: ", assessmentToAdd);
  let errorString = "";
  // Get the index where the term exists

  try {
    let idxTerm: number | undefined = indexAtWhichTermExists(
      currSelection.currTerm,
      userData
    );
    if (idxTerm != undefined) {
      let termData: Course[] = userData[idxTerm][currSelection.currTerm];

      // Get the index where the course exists within that term
      let idxCourse: number | undefined = indexAtWhichCourseExists(
        termData,
        currSelection.currCourse
      );

      console.log(
        "Index of term: " +
          currSelection.currTerm +
          " " +
          idxTerm +
          " Course Index :" +
          idxCourse
      );
      if (idxCourse != undefined) {
        //! Check if Assessment already exists
        for (
          let i = 0;
          i < termData[idxCourse][currSelection.currCourse].data.length;
          i++
        ) {
          if (
            termData[idxCourse][currSelection.currCourse].data[i][0] ===
            assessmentToAdd[0]
          ) {
            throw "This assessment already exists";
          }
        }
        //! Check if Assessment length is within limits
        if (assessmentToAdd[0].length >= 20) {
          throw "Term name is to big, keep it less than 20 characters";
        }
        //! Assessment Weight can't be negative
        if (assessmentToAdd[2] < 0) {
          throw "Assessment Weight can not be negative";
        }

        userData[idxTerm][currSelection.currTerm][idxCourse][
          currSelection.currCourse
        ].data.push(assessmentToAdd);

        // push updated data
        let result = await push(userData);
        console.log("[Success] - Adding a course", result);

        return result.data.data;
      } else {
        throw "Course isnt defined";
      }
    } else {
      throw "Term isnt defined";
    }
  } catch (err) {
    errorString = " - Adding an Assessment " + err;
    console.log(" - Adding an Assessment", err);
  }
  return errorString;
};
export const editAssessmentPushHelper = async (
  assessmentToEdit: AssessmentData,
  assessmentNew: AssessmentData,
  currSelection: currSelection,
  userData: AcademicData
): Promise<AcademicData | string> => {
  let errorString = "";
  // Get the index where the term exists

  try {
    let idxTerm: number | undefined = indexAtWhichTermExists(
      currSelection.currTerm,
      userData
    );
    if (idxTerm != undefined) {
      let termData: Course[] = userData[idxTerm][currSelection.currTerm];

      // Get the index where the course exists within that term
      let idxCourse: number | undefined = indexAtWhichCourseExists(
        termData,
        currSelection.currCourse
      );

      if (idxCourse != undefined) {
        // find the index at which the assignment exists
        let assessments: AssessmentData[] =
          userData[idxTerm][currSelection.currTerm][idxCourse][
            currSelection.currCourse
          ].data;
        let idxAsssessment = 0;
        for (
          idxAsssessment = 0;
          idxAsssessment < assessments.length;
          idxAsssessment++
        ) {
          if (assessments[idxAsssessment][0] === assessmentToEdit[0]) {
            break;
          }
        }
        //! Check if Assessment already exists
        for (
          let i = 0;
          i < termData[idxCourse][currSelection.currCourse].data.length;
          i++
        ) {
          // (name is same) && (its not referring to itself)
          if (
            termData[idxCourse][currSelection.currCourse].data[i][0] ===
              assessmentNew[0] &&
            i != idxAsssessment
          ) {
            throw "This assessment already exists";
          }
        }
        //! Check if Assessment length is within limits
        if (assessmentNew[0].length >= 20) {
          throw "Term name is to big, keep it less than 20 characters";
        }
        //! Assessment Weight can't be negative
        if (assessmentNew[2] < 0) {
          throw "Assessment Weight can not be negative";
        }

        assessments.splice(idxAsssessment, 1);
        userData[idxTerm][currSelection.currTerm][idxCourse][
          currSelection.currCourse
        ].data.push(assessmentNew);

        // push updated data
        let result = await push(userData);
        console.log("[Success] - Adding a course", result);

        return result.data.data;
      } else {
        throw "Course isnt defined";
      }
    } else {
      throw "Term isnt defined";
    }
  } catch (err) {
    errorString = " - Adding an Assessment " + err;
    console.log(" - Adding an Assessment", err);
  }
  return errorString;
};
export const deleteAssessmentPushHelper = async (
  assessmentToDelete: AssessmentData,
  currSelection: currSelection,
  userData: AcademicData
): Promise<AcademicData | string> => {
  let errorString = "";
  // Get the index where the term exists

  try {
    let idxTerm: number | undefined = indexAtWhichTermExists(
      currSelection.currTerm,
      userData
    );
    if (idxTerm != undefined) {
      let termData: Course[] = userData[idxTerm][currSelection.currTerm];

      // Get the index where the course exists within that term
      let idxCourse: number | undefined = indexAtWhichCourseExists(
        termData,
        currSelection.currCourse
      );

      if (idxCourse != undefined) {
        // find the index at which the assignment exists
        let assessments: AssessmentData[] =
          userData[idxTerm][currSelection.currTerm][idxCourse][
            currSelection.currCourse
          ].data;
        let idxAsssessment = 0;
        for (
          idxAsssessment = 0;
          idxAsssessment < assessments.length;
          idxAsssessment++
        ) {
          if (assessments[idxAsssessment][0] === assessmentToDelete[0]) {
            break;
          }
        }
        assessments.splice(idxAsssessment, 1);

        // push updated data
        let result = await push(userData);
        console.log("[Success] - Adding a course", result);

        return result.data.data;
      } else {
        throw "Course isnt defined";
      }
    } else {
      throw "Term isnt defined";
    }
  } catch (err) {
    errorString = " - Adding an Assessment " + err;
    console.log(" - Adding an Assessment", err);
  }
  return errorString;
};
