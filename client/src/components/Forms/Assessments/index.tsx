import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import InputField from "../../decorators/InputField";
import { yupResolver } from "@hookform/resolvers/yup";
import { getFilteredData } from "../../../redux/grades/selectors";
import useApi from "../../../hooks/useApi";
import { getSelData } from "../../../redux/currentSelections/selectors";
import { useMemo } from "react";
import { getPopupSelector } from "../../../redux/popup/selector";
import { ACTION_TYPE } from "../../../utils/constants";
import { isEqual } from "lodash";
import { AssessmentFormSchema } from "./type";
import Form from "../../../wrappers/FormWrapper";

const defaultValues: AssessmentFormSchema = {
  name: "",
  myPercentageScore: 0,
  worth: 1,
};

const AssessmentForm = () => {
  const { actionType: type } = useSelector(getPopupSelector);
  const { currAssessment } = useSelector(getSelData);
  const { addAssessment, editAssessments, deleteAssessment } = useApi();
  const { assessments } = useSelector(getFilteredData);

  const initialValues = useMemo((): AssessmentFormSchema => {
    if (type === ACTION_TYPE.EDIT && currAssessment)
      return {
        name: currAssessment,
        myPercentageScore: assessments[currAssessment].myScorePercentage,
        worth: assessments[currAssessment].worth,
      };
    else return defaultValues;
  }, [type, assessments, currAssessment]);

  const schema = yup
    .object({
      name: yup
        .string()
        .required("Required")
        .max(15, "Only 15 characters allowed"),
      myPercentageScore: yup.number().required("Required"),
      worth: yup.number().required("Required field"),
    })
    .test("Edit", function ({ name = "", myPercentageScore, worth }) {
      if (isEqual({ name, worth, myPercentageScore }, initialValues)) {
        return this.createError({
          message: "No changes made",
        });
      } else if (
        name !== initialValues.name &&
        assessments[name] !== undefined
      ) {
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

  const onSubmit = (assessment: AssessmentFormSchema) => {
    switch (type) {
      case ACTION_TYPE.CREATE:
        addAssessment(assessment);
        break;
      case ACTION_TYPE.EDIT:
        editAssessments(initialValues.name, assessment);
        break;
    }
  };
  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      errors={errors}
      deleteAction={deleteAssessment}
    >
      <InputField
        label="Course Name"
        name="name"
        type="text"
        control={control}
        errors={errors}
      />
      <InputField
        label="Your Percentage "
        name="myPercentageScore"
        type="number"
        control={control}
        errors={errors}
      />
      <InputField
        label="Percentage worth of assessment"
        name="worth"
        type="number"
        control={control}
        errors={errors}
      />
    </Form>
  );
};

export default AssessmentForm;
