import { Input } from "./Input";
import { FormError } from "./FormError";

export const FormField = ({
  label,
  name,
  value,
  onChange,
  error,
  required,
  type = "text",
  textarea = false,
}) => (
  <div>
    <label className="text-sm font-semibold">
      {label}
      {required && <span className="text-red-500">*</span>}
    </label>

    {textarea ? (
      <textarea
        name={name}
        value={value ?? ""}
        onChange={onChange}
        className="border border-gray-300 p-2 rounded w-full font-mono text-xs"
      />
    ) : (
      <Input
        name={name}
        value={value ?? ""}
        onChange={onChange}
        type={type}
        className="border border-gray-300 p-2 rounded w-full"
      />
    )}

    <FormError message={error} />
  </div>
);