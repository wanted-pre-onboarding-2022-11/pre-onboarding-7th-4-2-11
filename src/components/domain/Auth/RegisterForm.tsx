import React from "react";
import { Button, Form, TextField } from "@/components/atom";
import useInputValidation from "@/hooks/useInputValidation";
import { FormEvent } from "react";
import styled from "styled-components";
import validate from "@/hooks/useInputValidation/validate";

const RegisterForm = () => {
  const { values, results, isAllPass, eventHandler } = useInputValidation({
    names: ["email", "password"],
    validate,
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // 요청
    console.log(values);
  };

  return (
    <S.Container>
      <Form onSubmit={handleSubmit}>
        <TextField
          type="email"
          name="email"
          placeholder="이메일"
          onBlur={eventHandler}
          helperText={results.email.isError && results.email.errorMsg}
        />
        <TextField
          type="password"
          name="password"
          placeholder="비밀번호"
          onBlur={eventHandler}
          helperText={results.password.isError && results.password.errorMsg}
        />
        <Button type="submit" size="large" disabled={!isAllPass}>
          가입
        </Button>
      </Form>
    </S.Container>
  );
};

const S = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    gap: 25px;
  `,
};

export default RegisterForm;
