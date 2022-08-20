import React from 'react';
import { Card, Form, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAppDispatch, useAppSelector } from '../../store';
import ROUTES from '../../routes';
import { ISignUpArguments, signUp } from '../../controllers/authorization';
import Button from '../../components/button/button.component';
import { useNavigate } from 'react-router-dom';
import {
  emailRequiredValidator,
  passwordRequiredValidator,
  passwordConfirmationRequiredValidator,
} from '../../utils/validators';
import { EUserErrorType, clearError } from '../../store/slices/userSlice';
import './signup.page.css';

const SignupPage = () => {
  const { isLoading, error } = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      passwordConfirmation: '',
    },
    validationSchema: Yup.object({
      email: emailRequiredValidator,
      password: passwordRequiredValidator,
      passwordConfirmation: passwordConfirmationRequiredValidator('password'),
    }),
    onSubmit: ({ email, password }: ISignUpArguments) => {
      dispatch(signUp({ email, password }))
        .unwrap()
        .then(() => navigate(ROUTES.APP));
    },
  });
  return (
    <div className="authorization-page">
      <div className="mb-4">
        <i className="fa-solid fa-address-book fa-8x" />
      </div>
      {error && error.type === EUserErrorType.SIGN_UP && (
        <Alert
          variant="danger"
          onClose={() => dispatch(clearError())}
          className="authorization-card"
          dismissible
        >
          <Alert.Heading>Ошибка регистрации</Alert.Heading>
          <p>{error.explanation}</p>
        </Alert>
      )}
      <Card className="authorization-card">
        <Card.Header>
          <Card.Title>Регистрация</Card.Title>
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
                onBlur={formik.handleBlur}
                isInvalid={!!(formik.errors.email && formik.touched.email)}
                isValid={!!(!formik.errors.email && formik.touched.email)}
              />
              {formik.errors.email && (
                <Form.Control.Feedback type="invalid">
                  {formik.errors.email}
                </Form.Control.Feedback>
              )}
            </Form.Group>
            <Form.Group className="mt-2">
              <Form.Label>Пароль</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={
                  !!(formik.errors.password && formik.touched.password)
                }
                isValid={!!(!formik.errors.password && formik.touched.email)}
              />
              {formik.errors.password && (
                <Form.Control.Feedback type="invalid">
                  {formik.errors.password}
                </Form.Control.Feedback>
              )}
            </Form.Group>
            <Form.Group className="mt-2">
              <Form.Label>Подтвердите пароль</Form.Label>
              <Form.Control
                type="password"
                name="passwordConfirmation"
                value={formik.values.passwordConfirmation}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={
                  !!(
                    formik.errors.passwordConfirmation &&
                    formik.touched.passwordConfirmation
                  )
                }
                isValid={
                  !!(
                    !formik.errors.passwordConfirmation && formik.touched.email
                  )
                }
              />
              {formik.errors.passwordConfirmation && (
                <Form.Control.Feedback type="invalid">
                  {formik.errors.passwordConfirmation}
                </Form.Control.Feedback>
              )}
            </Form.Group>
          </Card.Body>
          <Card.Footer className="text-center">
            <Button
              isLoading={isLoading}
              type="submit"
              variant="success"
              className="w-100"
            >
              Создать аккаунт
            </Button>
            <Link to={ROUTES.SIGN_IN}>Войти</Link>
          </Card.Footer>
        </Form>
      </Card>
    </div>
  );
};

export default SignupPage;
