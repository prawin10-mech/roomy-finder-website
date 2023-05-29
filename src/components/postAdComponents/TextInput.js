import React from "react";
import { TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { TenantActions } from "../../store/Tenant";

const TextInput = ({ label, name, value }) => {
  const dispatch = useDispatch();
  const edit = useSelector((state) => state.property.edit);
  const editedData = useSelector((state) => state.property.editedData);

  const handleInputChange = (e, name) => {
    if (edit && editedData[name]) {
      const newData = e.target.value + editedData[name];
      dispatch(TenantActions[name](newData));
    } else {
      dispatch(TenantActions[name](e.target.value));
    }
  };

  return (
    <TextField
      label={label}
      variant="outlined"
      value={value}
      onChange={(e) => handleInputChange(e, name)}
      fullWidth
    />
  );
};

export default TextInput;
