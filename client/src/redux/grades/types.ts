import { Terms } from "../../TS types";

export type TermFilteredData = {
    average: number;
    courses: number;
    completion: number;
}

export type CourseFilteredData = {
    credit: number;
    average: number;
    completion: number;
};

export type TermFiltered = {
    [termName: string]: TermFilteredData
}

export type CourseFiltered = {
    [courseName: string]: CourseFilteredData;
}

export type AssessmentFilteredData = {
    worth: number;
    myScorePercentage: number;
};
export type AssessmentFiltered = {
    [assessmentName: string]: AssessmentFilteredData
}

export type GradeFiltered = {
    terms: TermFiltered,
    courses: CourseFiltered,
    assessments: AssessmentFiltered;
    unfilteredData: Terms;
}

export type NewTerm = {
    name: string;
    credit: number;
}
