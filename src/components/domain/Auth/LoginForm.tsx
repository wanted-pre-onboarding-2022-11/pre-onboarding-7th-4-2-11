import React from "react";
import { Form, Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("이메일 형식을 확인해 주세요.").required("이메일은 필수항목입니다."),
  password: Yup.string()
    .required("비밀번호는 필수항목입니다.")
    .min(8, "최소 8자리의 문자를 입력해주세요."),
});

interface LoginFormProps {
  handleLogin: ({ email, password }: { email: string; password: string }) => void;
}

const LoginForm = ({ handleLogin }: LoginFormProps) => {
  return (
    <div className="w-full max-w-md">
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={handleLogin}
      >
        <Form className="bg-white shadow-lg border-solid border border-gray-200 rounded-md px-8 pt-6 pb-8 mb-4">
          <h1 className="text-6xl mb-16">PREFACE</h1>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              이메일
            </label>
            <Field
              className="shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-3"
              id="email"
              name="email"
              type="email"
              placeholder="이메일을 입력해주세요"
              form={""}
            />
            <ErrorMessage className="text-sm text-amber-600" name="email" component="div" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              비밀번호
            </label>
            <Field
              className="shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-3"
              id="password"
              name="password"
              type="password"
              placeholder="비밀번호를 입력해주세요"
            />
            <ErrorMessage className="text-sm text-amber-600" name="password" component="div" />
          </div>
          <button
            className="w-full p-2 text-stone-100 bg-sky-800 hover:bg-sky-700 rounded-md"
            type="submit"
          >
            로그인
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default LoginForm;
