import { keys, round } from "lodash";
import { Assessments, CourseData, TermData, Terms } from "../../TS types";
import { AcademicData, AssessmentData, Course, courseData } from "../../TS types/Types";
import { CourseFilteredData, TermFilteredData } from "./types";

export const getFilteredTermData = (courses: TermData): TermFilteredData => {
    const dataFiltered: TermFilteredData = {
        average: 0,
        courses: keys(courses).length,
        completion: 0
    }
    let totalCred = 0;
    keys(courses).forEach((course: string) => {
        const courseData = courses[course];
        const { average, completion, credit } = getFilteredCourseData(courseData);
        dataFiltered.average += average * credit;
        totalCred += credit;
        dataFiltered.completion += completion;
    })

    dataFiltered.average = round(dataFiltered.average / totalCred, 2) || 0;
    dataFiltered.completion = round(dataFiltered.completion / dataFiltered.courses, 2);
    return dataFiltered;
}

export const getFilteredCourseData = (course: CourseData):
    CourseFilteredData => {
    const dataFiltered: CourseFilteredData = {
        credit: course.credit,
        average: 0,
        completion: 0
    }
    const assessments: Assessments = course.assessments;
    keys(assessments).forEach((assessment: string) => {
        const { myPercentageScore, worth } = assessments[assessment];
        dataFiltered.average += myPercentageScore * worth;
        dataFiltered.completion += worth;
    })
    dataFiltered.average = round(dataFiltered.average / dataFiltered.completion, 2) || 0;
    dataFiltered.completion = round(dataFiltered.completion, 2);
    return dataFiltered;
}



export const convertAcademicData = (data: AcademicData): Terms => {
    const result: Terms = {};
    data.forEach((term) => {
        const termName = keys(term)[0];
        const courses: Course[] = term[termName];
        result[termName] = {};
        courses.forEach((course: Course) => {
            const courseName = keys(course)[0];
            const courseData: AssessmentData[] = course[courseName].data;
            const assessments: Assessments = {};
            courseData.forEach(assessment =>
                assessments[assessment[0]] = {
                    myPercentageScore: assessment[1],
                    worth: assessment[2]
                }
            )
            result[termName][courseName] = {
                credit: course[courseName].credit, assessments: assessments,
            };
        })
    })

    return result;
}

export const convertFilteredToApi = (data: Terms): AcademicData => {
    const result: AcademicData = [];
    keys(data).forEach((termName: string) => {
        const courses: TermData = data[termName];
        result.push({ [termName]: [] });
        keys(courses).forEach((courseName: string) => {
            const { credit, assessments }: CourseData = courses[courseName];
            const course: courseData = {
                credit,
                data: keys(assessments).map(
                    assessment => {
                        const { myPercentageScore, worth } = assessments[assessment];
                        return [
                            assessment,
                            myPercentageScore,
                            worth
                        ]
                    })
            }
            result[result.length - 1][termName].push({ [courseName]: course });
        })
    })

    return result;
}
