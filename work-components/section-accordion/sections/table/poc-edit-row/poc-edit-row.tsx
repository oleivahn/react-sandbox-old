import React, { useEffect, useState } from "react";

import TextField from "@material-ui/core/TextField";

import _includes from "lodash/includes";

interface IProps {
  editprops: any;
}

const PocEditRow = (props: IProps) => {
  const { editprops } = props;
  const [pocErrorState, setPocErrorState] = useState({
    error: false,
    required: false
  });

  const [pocField, setPocField] = useState(editprops.value);
  useEffect(() => {
    if (
      _includes(["text0", "text1"], editprops.columnDef.field) &&
      (editprops.value === "" || editprops.value === undefined)
    ) {
      setPocErrorState({
        error: true,
        required: true
      });
    } else {
      setPocErrorState({
        error: false,
        required: false
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePocChange = (event: any) => {
    const poc = event.target.value;
    if (
      _includes(["text0", "text1"], event.target.id) &&
      event.target.value === ""
    ) {
      setPocErrorState({
        error: true,
        required: true
      });
    } else {
      setPocErrorState({
        error: false,
        required: true
      });
    }

    setPocField(poc);
    editprops.onChange(poc);
  };
  return (
    <TextField
      value={pocField}
      placeholder={editprops.columnDef.title}
      onChange={handlePocChange}
      required={pocErrorState.required ? true : false}
      error={pocErrorState.error}
      inputProps={{
        title: "Title, Name and at least one email or one phone number required"
      }}
      id={editprops.columnDef.field}
    />
  );
};

export default PocEditRow;
