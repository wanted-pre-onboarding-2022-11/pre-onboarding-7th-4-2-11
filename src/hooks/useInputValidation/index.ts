import { ChangeEvent, FocusEvent, useEffect, useState } from "react";
import { ValidateFC, ValidationResult } from "./validate";

interface InputValidationParam {
  names: string[];
  validate: ValidateFC;
}

type InputValue = {
  [name: string]: string;
};

type ResultValue = {
  [name: string]: ValidationResult;
};

type InputEvent = ChangeEvent<HTMLInputElement> | FocusEvent<HTMLInputElement>;

const getInitialValues = (names: string[]): [InputValue, ResultValue] =>
  names.reduce(
    ([values, results], name) => [
      { ...values, [name]: "" },
      { ...results, [name]: { isPass: false, isError: false, errorMsg: "" } },
    ],
    [{}, {}],
  );

const useInputValidation = ({ names, validate }: InputValidationParam) => {
  const [initValues, initResults] = getInitialValues(names);
  const [values, setValues] = useState(initValues);
  const [results, setResults] = useState(initResults);
  const [isAllPass, setAllPass] = useState(false);

  const eventHandler = ({ target }: InputEvent, payload?: any) => {
    const { name, value } = target;
    setValues({ ...values, [name]: value });
    setResults({ ...results, [name]: validate(name, value, payload) });
  };

  useEffect(() => {
    setAllPass(names.reduce((acc, name) => acc && results[name].isPass, true));
  }, [results]);

  return { values, setValues, results, isAllPass, eventHandler };
};

export default useInputValidation;
