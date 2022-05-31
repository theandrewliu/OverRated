function ApiSelector(props) {
  const value = props.value;
  const selected = props.selected;
  const label = props.label;
  const handleOptionChange = props.onChange;
  return (
    <div className="form-check text-start">
      <input onChange={handleOptionChange} className="form-check-input" type="radio" value={value} name="api-selector" id={value} checked={value === selected} />
      <label className="form-check-label" htmlFor={value}>{label}</label>
    </div>
  );
}

export default ApiSelector;
