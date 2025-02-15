import DynamicHeroIcon from '../../dynamic-hero-icon';
import clsx from 'clsx';

interface BaseInputProps {
  id: string;
  name?: string;
  placeholder?: string;
  className?: string;
  label?: string;
  icon?: string;
  errors?: string[];
  disabled?: boolean;
  readOnly?: boolean;
  onInput?:  (event: React.FormEvent<HTMLInputElement>) => void,
}

interface InputProps extends BaseInputProps {
  defaultValue?: string | number;
  type: string;
  step?: number;
  min?: number;
  max?: number;
}

interface TextInputProps extends BaseInputProps {
  defaultValue?: string;
}

interface NumberInputProps extends BaseInputProps {
  defaultValue?: number;
  step?: number;
  min?: number;
  max?: number;
}

export function TextInput({ id, name, placeholder, className, defaultValue = '', label = '', icon, errors, disabled = false, onInput, ...rest }: TextInputProps ) {
  return (
    <Input id={id} 
    name={name} 
    placeholder={placeholder} 
    className={className} 
    defaultValue={defaultValue} 
    label={label} 
    icon= {icon} 
    errors={errors} 
    type='text' 
    disabled = {disabled}
    onInput={onInput}
    {...rest}
    />
  );
}

export function EmailInput({ id, name, placeholder, className, defaultValue = '', label = '', icon, errors, disabled = false, ...rest }: TextInputProps ) {
  return (
    <Input id={id} 
    name={name} 
    placeholder={placeholder} 
    className={className} 
    defaultValue={defaultValue} 
    label={label} 
    icon= {icon} 
    errors={errors} 
    type='email' 
    disabled = {disabled}
    {...rest}
    />
  );
}

export function NumberInput({ id, name, placeholder, className, defaultValue = 0, label = '', icon, errors, step = 1, min, max, disabled = false, ...rest }: NumberInputProps ) {
  return (
    <Input id={id} 
    name={name} 
    placeholder={placeholder} 
    className={className} 
    defaultValue={defaultValue} 
    label={label}
    icon= {icon}
    errors={errors}
    step={step}
    type="number"
    min={min}
    max={max} 
    disabled = {disabled}
    {...rest}
    />
  );
}

export function PasswordInput({ id, name, placeholder, className, defaultValue = '', label = '', icon, errors, disabled = false, ...rest }: TextInputProps ) {
  return (
    <Input id={id} 
    name={name} 
    placeholder={placeholder} 
    className={className} 
    defaultValue={defaultValue} 
    label={label} 
    icon= {icon} 
    errors={errors} 
    type='password' 
    disabled = {disabled}
    {...rest}
    />
  );
}

export default function Input({ id, name, placeholder, className, defaultValue, label = '', icon, errors, type, step, min, max, disabled = false, onInput, ...rest }: InputProps ) {
  return (
    <>
      <label htmlFor={id} className="mb-2 ml-1 block text-2xl font-medium text-gray-700">
        {label}
      </label>
      <div className="relative mt-2 rounded-md">
        <div className="relative">
          <input
            id={id}
            name={ name ? name : id }
            type={type}
            step={step}
            min={min}
            max={max}
            placeholder={ placeholder ? placeholder : '' }
            className={ clsx(
              "peer block w-full rounded-2xl border border-black py-2 pl-10 text-2xl outline-2 placeholder:text-gray-700 text-gray-700",
              errors ? "border-red-700" : null,
              className ? className : null
            )}
            aria-describedby={`${id}-error`}
            defaultValue={ defaultValue }
            disabled = {disabled}
            onInput={onInput}
            {...rest}
          />
          { icon ? 
          <DynamicHeroIcon className='pointer-events-none absolute left-3 top-1/2 h-[24px] w-[24px] -translate-y-1/2 text-black' icon={icon} solid={false}/> 
          : null}
        </div>
        <div id={`${id}-error`} aria-live="polite" aria-atomic="true">
          {errors ?
          <FormFieldsErrors errors={errors}/> : null}
        </div>
      </div>
    </>
  );
}

export function FormFieldsErrors({ errors } : {errors: string[]}) {
  return (
    <div className="py-1">
      <div className="flex">
        <div className="ml-0">
          <div className="mt-0 text-xl text-red-700 font-medium">
            <ul role="list" className="list-none space-y-1 pl-1">
            { errors.map((error: string) => (
                <li key={error}>
                  {error}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}