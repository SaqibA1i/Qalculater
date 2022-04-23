import { Controller } from "react-hook-form";
type Props = {
  label: string;
  name: string;
  type: "text" | "number";
  control: any;
  errors: any;
};
const InputField = ({ label, name, control, errors }: Props) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div className="popup-header-input">
          <h5>{label}</h5>
          <input placeholder="Enter ...." {...field} autoComplete="off" />
          {errors[name] && <span>{errors[name].message}</span>}
        </div>
      )}
    />
  );
};

export default InputField;
