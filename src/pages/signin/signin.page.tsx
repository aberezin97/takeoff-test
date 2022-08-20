import React from 'react';
import { Card, Form, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAppDispatch, useAppSelector } from '../../store';
import { ISignInArguments, signIn } from '../../controllers/authorization';
import Button from '../../components/button/button.component';
import ROUTES from '../../routes';
import {
  emailRequiredValidator,
  passwordRequiredValidator,
} from '../../utils/validators';
import { EUserErrorType, clearError } from '../../store/slices/userSlice';
import './signin.page.css';

const SigninPage = () => {
  const { isLoading, error } = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: emailRequiredValidator,
      password: passwordRequiredValidator,
    }),
    onSubmit: (args: ISignInArguments) => {
      dispatch(signIn(args))
        .unwrap()
        .then(() => navigate(ROUTES.APP));
    },
  });
  return (
    <div className="authorization-page">
      <div className="mb-4">
        <i className="fa-solid fa-address-book fa-8x" />
      </div>
      {error && error.type === EUserErrorType.SIGN_IN && (
        <Alert
          variant="danger"
          onClose={() => dispatch(clearError())}
          className="authorization-card"
          dismissible
        >
          <Alert.Heading>Ошибка авторизации</Alert.Heading>
          <p>{error.explanation}</p>
        </Alert>
      )}
      <Card className="authorization-card">
        <Card.Header>
          <Card.Title>Авторизация</Card.Title>
        </Card.Header>
        <Form onSubmit={formik.handleSubmit}>
          <Card.Body>
            <Form.Group>
              <Form.Label>Почта</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                isInvalid={!!(formik.errors.email && formik.touched.email)}
              />
            </Form.Group>
            <Form.Group className="mt-2">
              <Form.Label>Пароль</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                isInvalid={
                  !!(formik.errors.password && formik.touched.password)
                }
              />
            </Form.Group>
          </Card.Body>
          <Card.Footer className="text-center">
            <Button
              isLoading={isLoading}
              type="submit"
              variant="success"
              className="w-100"
            >
              Войти
            </Button>
            <Link to={ROUTES.SIGN_UP}>Создать аккаунт</Link>
          </Card.Footer>
        </Form>
      </Card>
    </div>
  );
};

export default SigninPage;
