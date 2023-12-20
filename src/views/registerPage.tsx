import { useState, type ChangeEvent, type FormEvent } from "react";
import EmailForm from "../components/form/emailForm";
import PasswordForm from "../components/form/passwordForm";
import { useNavigate } from "react-router-dom";
import { swalError } from "../lib/swal";
import { Form, Container, Button } from "react-bootstrap";
import TextForm from "../components/form/textForm";
import LoadingWrapper from "../components/loaders/loadingOverlay";
import { registerHandler } from "../actions/user";

export type state = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function RegisterPage() {
  const navigate = useNavigate();
  const [data, setData] = useState<state>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [hidePass, setHidePass] = useState<boolean>(true);
  const [hideConfirmPass, setHideConfirmPass] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    registerHandler(data).then(() => {
        navigate('/login')
    }).catch((err:Error) => {
        swalError(err?.message || 'Internal Server Error')
    }).finally(() => {
        setLoading(false)
    })
  };

  return (
    <LoadingWrapper active={loading}>
      <Container fluid className="p-3 my-5 h-custom">
        <Form onSubmit={onSubmit}>
          <TextForm
            value={data.username}
            onChange={onChangeHandler}
            placeHolder="username"
            label="username"
            id="username"
            name="username"
          />
          <EmailForm
            name="email"
            value={data.email}
            handler={onChangeHandler}
          />
          <PasswordForm
            name="password"
            value={data.password}
            handler={onChangeHandler}
            hide={hidePass}
            hidePasswordHandler={setHidePass}
          />
          <PasswordForm
            name="confirmPassword"
            value={data.confirmPassword}
            handler={onChangeHandler}
            hide={hideConfirmPass}
            hidePasswordHandler={setHideConfirmPass}
          />
          <Button
            variant="primary"
            className="mb-0 px-5"
            size="lg"
            type="submit">
            Signup
          </Button>
        </Form>
      </Container>
    </LoadingWrapper>
  );
}
