import classNames from 'classnames';
import { InputHTMLAttributes } from 'react';
import { UseFormRegister, FieldValues } from 'react-hook-form';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';

type InputProps = {
  id?: string;
  error?: string;
  placeholder?: string;
  className?: string;
  value?: string | undefined;
  label?: string;
  readonly?: boolean;
  wrapperClassName?: string;
  register?: UseFormRegister<FieldValues>;
  name: string;
  leftIcon?: any;
  labelBaseClasses: string;
  labelErrorClasses: string;
  labelSuccessClasses: string;
  inputBaseClasses: string;
  inputErrorClasses: string;
  inputSuccessClasses: string;
  inputSizing: string;
  rightIcon?: any;
} & InputHTMLAttributes<HTMLInputElement>;

export const InputWithIcon = ({
  id,
  error,
  placeholder,
  value,
  onChange,
  className,
  type,
  name,
  disabled,
  label,
  readonly,
  wrapperClassName = '',
  register,
  leftIcon,
  rightIcon,
  labelBaseClasses,
  labelErrorClasses,
  labelSuccessClasses,
  inputBaseClasses,
  inputErrorClasses,
  inputSuccessClasses,
  inputSizing,
  required,
  minLength,
  maxLength,
  ...props
}: InputProps) => (
  <div className={classNames(wrapperClassName, 'w-full')}>
    {label ? (
      <label
        htmlFor={id}
        className="block mb-2 text-sm font-medium text-gray-900"
      >
        {label}
      </label>
    ) : null}
    <div className="relative">
      {leftIcon ? (
        <div className="absolute inset-y-0 left-0 flex items-center pl-3">
          {leftIcon}
        </div>
      ) : null}

      <input
        type={type}
        id={id}
        value={value}
        readOnly={readonly}
        disabled={disabled}
        required={required}
        minLength={minLength}
        maxLength={maxLength}
        {...(register ? register(name) : {})}
        name={name}
        onChange={onChange}
        className={classNames(
          inputSizing,
          !error && !value && inputBaseClasses,
          error && inputErrorClasses,
          !error && value && inputSuccessClasses,
          `bg-gray-50 text-sm rounded-lg block w-full ${
            leftIcon ? 'pl-10' : 'pl-3'
          } appearance-none focus:outline-none focus:ring-[#046C4E] disabled:bg-gray-200 focus:border-[#046C4E]`
        )}
        placeholder={placeholder}
      />
      {rightIcon ? (
        <div className="absolute inset-y-0 right-2.5 flex items-center">
          {rightIcon}
        </div>
      ) : null}
    </div>
    {error ? (
      <div className="mt-2">
        <ErrorMessage msg={error} />
      </div>
    ) : null}
  </div>
);
