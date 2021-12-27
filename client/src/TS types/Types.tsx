/* Academic Data
 Example:

  
*/

import { Terminal } from "react-bootstrap-icons";

let s = [
  {
    "1B": [
      { ECE252: { credit: 0.5, data: [["Final", 96, 45]] } },
      { ECE203: { credit: 0.5, data: [["Final", 96, 45]] } },
    ],
  },
  {
    "2A": [
      { ECE252: { credit: 0.5, data: [["Final", 96, 45]] } },
      { ECE203: { credit: 0.5, data: [["Final", 96, 45]] } },
    ],
  },
];

type weight = number;
type percentageAcheived = number;

export type AssessmentData = [string, percentageAcheived, weight];

export type courseData = {
  credit: number;
  data: AssessmentData[];
};

export type Course = {
  [courseName: string]: courseData;
};

export type Term = {
  [termName: string]: Course[];
};

export type AcademicData = Term[];

// User Data
export type User = {
  firstName: string | undefined;
  lastName: string | undefined;
  imgURL: string | undefined;
  data: AcademicData;
};

// course and its total Average Map
export type coursePercentageSingle = [
  courseName: string,
  courseAverage: number,
  courseCompletion: number,
  courseCredit?: number
];
export type CoursePercentageMap = coursePercentageSingle[];

// current Selection of course and term
export type currSelection = {
  currTerm: string | "undefined";
  currCourse: string | "undefined";
};

export type PopTypes = "Term" | "Course" | "Assessment";
