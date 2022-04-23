import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import InputField from "../../decorators/InputField";
import { yupResolver } from "@hookform/resolvers/yup";
import { getFilteredData } from "../../../redux/grades/selectors";
import useApi from "../../../hooks/useApi";
import { getSelData } from "../../../redux/currentSelections/selectors";
import { TermFormSchema } from "./types";
import { useMemo } from "react";
import { getPopupSelector } from "../../../redux/popup/selector";
import { ACTION_TYPE } from "../../../utils/constants";
import { isEqual } from "lodash";
import Form from "../../../wrappers/FormWrapper";

const defaultValues: TermFormSchema = { name: "" };

const TermForm = () => {
  const { terms } = useSelector(getFilteredData);
  const { actionType: type } = useSelector(getPopupSelector);
  const { currTerm = "" } = useSelector(getSelData);
  const { addTerm, editTerm, deleteTerm } = useApi();

  const initialValues = useMemo((): TermFormSchema => {
    if (type === ACTION_TYPE.EDIT) return { name: currTerm };
    else return defaultValues;
  }, [type, currTerm]);

  const schema = yup.object({
    name: yup
      .string()
      .required("Required")
      .max(10, "Only 10 characters allowed")
      .test("Term doesn't repeat", function (value = "") {
        if (terms[value] !== undefined) {
          return this.createError({
            message: isEqual(initialValues, { name: value })
              ? "No changes made"
              : `${value} already exists`,
          });
        }
        return true;
      }),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { ...initialValues },
  });

  const onSubmit = ({ name }: TermFormSchema) => {
    if (type === "Create") {
      addTerm(name);
    } else {
      editTerm(initialValues.name, name);
    }
  };
  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      deleteAction={deleteTerm}
      errors={errors}
    >
      <InputField
        label="Term Name"
        name="name"
        type="text"
        control={control}
        errors={errors}
      />
    </Form>
  );
};

export default TermForm;
