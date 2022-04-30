import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import InputField from "../../decorators/InputField";
import { yupResolver } from "@hookform/resolvers/yup";
import { getFilteredData } from "../../../redux/grades/selectors";
import useApi from "../../../hooks/useApi";
import { getSelData } from "../../../redux/currentSelections/selectors";
import { CourseFormSchema } from "./types";
import { useMemo } from "react";
import { getPopupSelector } from "../../../redux/popup/selector";
import { ACTION_TYPE } from "../../../utils/constants";
import { isEqual } from "lodash";
import Form from "../../../wrappers/FormWrapper";

const defaultValues: CourseFormSchema = { name: "", credit: 0 };

const CourseForm = () => {
  const { actionType: type } = useSelector(getPopupSelector);
  const { currCourse = "" } = useSelector(getSelData);
  const { addCourse, editCourse, deleteCourse } = useApi();
  const { courses } = useSelector(getFilteredData);

  const initialValues = useMemo((): CourseFormSchema => {
    if (type === ACTION_TYPE.EDIT)
      return {
        name: currCourse,
        credit: courses[currCourse].credit,
      };
    else return defaultValues;
  }, [type, currCourse, courses]);

  const schema = yup
    .object({
      name: yup
        .string()
        .required("Required")
        .max(10, "Only 10 characters allowed"),
      credit: yup
        .number()
        .required("Required")
        .max(99, "How massive is this course? :(")
        .min(0, "Only positive values"),
    })
    .test("Edit Course", function ({ name = 0, credit = 0 }) {
      if (isEqual({ name, credit }, initialValues)) {
        return this.createError({
          message: "No changes made",
        });
      } else if (name !== initialValues.name && courses[name] !== undefined) {
        return this.createError({
          message: `'${name}' already exists`,
        });
      }
      return true;
    });
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { ...initialValues },
  });

  const onSubmit = (course: CourseFormSchema) => {
    if (type === ACTION_TYPE.CREATE) {
      addCourse(course);
    } else {
      editCourse(initialValues.name, course);
    }
  };
  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      errors={errors}
      deleteAction={deleteCourse}
    >
      <InputField
        label="Course Name"
        name="name"
        type="text"
        control={control}
        errors={errors}
      />
      <InputField
        label="Course Credit"
        name="credit"
        type="number"
        control={control}
        errors={errors}
      />
    </Form>
  );
};

export default CourseForm;
