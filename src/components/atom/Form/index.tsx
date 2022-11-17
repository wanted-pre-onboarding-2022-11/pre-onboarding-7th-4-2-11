import React from "react";
import { FormEvent, ReactNode } from "react";
import styled from "styled-components";

type FormProps = {
  onSubmit?: (e: FormEvent) => void;
  children: ReactNode;
};

const StyledForm = styled.form<FormProps>`
  display: flex;
  width: fit-content;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & > * {
    margin-top: 15px;
  }
  :first-child {
    margin-top: 0px;
  }
`;

const Form = ({ children, ...restProps }: FormProps) => (
  <StyledForm {...restProps}>{children}</StyledForm>
);

export default Form;
