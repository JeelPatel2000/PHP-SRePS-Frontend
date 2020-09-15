import React, { PureComponent } from "react";
const Input = ({ name, value, error, onChange, type, placeholder }) => {
  return (
    <React.Fragment>
      <input
        value={value}
        onChange={onChange}
        name={name}
        type={type}
        placeholder={placeholder}
      />
      {/* {error && <div className="alert alert-danger">{error}</div>} */}
    </React.Fragment>
  );
};

export default Input;
