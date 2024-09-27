import ITextInput from "./ITextInput";

const TextInput = ({
  label,
  placeholder,
  value,
  onChange,
  type,
}: ITextInput) => {
  return (
    <>
      <div className="text-left">
        <label className="block text-sm font-medium leading-6 text-gray-900">
          {label}
        </label>
        <div className="mt-2">
          <input
            type={type ? type : "text"}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
    </>
  );
};

export default TextInput;
