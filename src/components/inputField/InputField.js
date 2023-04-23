export default function InputField(id, type, required, autoComplete, placeholder) {
  return <>
    <label htmlFor={id}></label>
    <input
      id={id}
      type={type}
      required={required}
      placeholder={placeholder}
      autoComplete={autoComplete}
    />
  </>
}