/* Academic Data
 Example:
  SCRIPT
  for(let i = 0; i < Object.keys(temp1).length; i++){
    let json = {};
    let courses = [];
    let keys = Object.keys(temp1[Object.keys(temp1)[i]]);

    keys.map(key => {let tempJSON = {}; tempJSON[key] = temp1[Object.keys(temp1)[i]][key];courses.push(tempJSON)})
    json[Object.keys(temp1)[i]] = courses;
    temp2.push(json);
}
  
*/

let s = [
  {
    "2B": [
      {
        "ECE 224": {
          credit: 0.5,
          data: [
            ["FINAL", 46, 20],
            ["Design Prj - (RR)", 100, 10],
            ["Design Prj - (SP)", 87.5, 10],
            ["LT Quiz", 100, 10],
            ["Q1", 98, 5],
            ["Q2", 100, 5],
            ["Q3", 76, 5],
            ["Q4", 84, 5],
            ["Q6", 84, 5],
            ["Q7", 94, 5],
            ["Q8", 85, 5],
            ["Quiz 10", 74, 5],
            ["Quiz 11", 88, 5],
            ["Quiz 9", 79, 5],
            ["Curve", 100, 6],
          ],
        },
      },
      {
        "ECE 207": {
          credit: 0.5,
          data: [
            ["Final #2 (32%)", 60, 32],
            ["Final #1", 54.55, 30],
            ["Midterm", 71.74, 28],
            ["A01", 95, 1],
            ["A02", 70, 1],
            ["A03", 100, 1],
            ["A04", 100, 1],
            ["A05", 100, 1],
            ["A06", 90, 1],
            ["A07", 100, 1],
            ["A08", 0.001, 1],
            ["A09", 100, 1],
            ["A10", 100, 1],
          ],
        },
      },
      {
        "ECE 203": {
          credit: 0.5,
          data: [
            ["❓Final (80%)", 88.3, 80],
            ["Test 1 (10%)", 80.7, 10],
            ["Test 2 (10%)", 24.5, 10],
          ],
        },
      },
      {
        "ECE 252": {
          credit: 0.5,
          data: [
            ["Lab 5", 41.16, 6],
            ["Lab 4", 25, 6],
            ["Lab 3", 100, 6],
            ["Lab 2", 100, 6],
            ["Lab 1", 100, 5.4],
            ["L0 group sign up", 100, 0.6],
            ["Final", 85.1, 40],
            ["A6", 100, 5],
            ["A5", 100, 5],
            ["A4", 100, 5],
            ["A3", 100, 5],
            ["A2", 100, 5],
            ["A1", 100, 5],
          ],
        },
      },
      {
        "ECE 208": {
          credit: 0.5,
          data: [
            ["Final Exam 30%", 42, 30],
            ["A5", 85, 10],
            ["A2", 100, 10],
            ["A3", 100, 10],
            ["A4", 80, 10],
            ["Q1", 80, 10],
            ["Q2", 100, 10],
            ["Q3", 60, 10],
            ["A1 (Dropped)", 40, 0.0001],
          ],
        },
      },
      {
        "ECE 298": {
          credit: 0.25,
          data: [
            ["Lab A", 55, 20],
            ["B4 Report", 75, 10],
            ["B4 Quiz", 90, 10],
            ["B3 Report", 80, 10],
            ["B3 Quiz", 90, 10],
            ["B2 Report", 100, 10],
            ["B2 Quiz", 56.67, 10],
            ["B1 Report", 95, 10],
            ["B1 Quiz", 95, 10],
          ],
        },
      },
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
  courseCredit?: number,
  completedCourses?: number
];
export type CoursePercentageMap = coursePercentageSingle[];

// current Selection of course and term
export type CurrSelection = {
  currTerm: string | undefined;
  currCourse: string | undefined;
  currAssessment?: string;
};

export type PopTypes = "Term" | "Course" | "Assessment";

export enum SORT_MODES {
  ALPHABET = "alpha",
  ALPHABET_ALT = "alpha-alt",
  GRADE = "grades",
  GRADE_ALT = "grades-alt",
}
