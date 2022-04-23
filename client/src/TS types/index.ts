
type Assessment = {
    myPercentageScore: number;
    worth: number;
}
type Assessments = {
    [name: string]: Assessment;
}

type CourseData = {
    credit: number;
    assessments: Assessments;
}

type TermData = {
    [courseName: string]: CourseData;
}

type Terms = {
    [termName: string]: TermData;
}



export type { Terms, TermData, CourseData, Assessments, Assessment };
