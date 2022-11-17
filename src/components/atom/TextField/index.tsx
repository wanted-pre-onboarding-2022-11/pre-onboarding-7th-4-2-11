import React from "react";
import { InputHTMLAttributes, ReactNode } from "react";
import styled from "styled-components";

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: ReactNode;
  helperText?: ReactNode;
}

const TextField = ({
  id,
  name,
  type = "text",
  label,
  helperText,
  ...restProps
}: TextFieldProps) => {
  const textFieldId = id || `text-input-${name}`;
  return (
    <S.TextField>
      {label && <S.Label htmlFor={textFieldId}>{label}</S.Label>}
      <S.TextInput type={type} id={textFieldId} name={name} {...restProps} />
      {helperText && <S.HelperText>{helperText}</S.HelperText>}
    </S.TextField>
  );
};

const S = {
  TextField: styled.div`
    display: flex;
    flex-direction: column;
    width: 350px;
  `,
  TextInput: styled.input`
    height: 50px;
    padding: 0px 10px;
    border: 1px solid black;
    border-radius: 10px;
  `,
  Label: styled.label`
    padding-bottom: 10px;
    font-weight: bold;
  `,
  HelperText: styled.div`
    padding-top: 10px;
    font-size: small;
    color: #800024;
  `,
};

export default TextField;
