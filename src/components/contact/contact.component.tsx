import React, { useEffect, useState } from 'react';
import { Modal, Form, Row, Col, InputGroup, ModalProps } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Image from '../image/image.component';
import { useAppSelector, useAppDispatch } from '../../store';
import { IContact } from '../../store/slices/userSlice';
import {
  IAddContactArgs,
  addContact,
  modifyContact,
  delContact,
} from '../../controllers/contacts';
import Button from '../button/button.component';
import { fieldRequiredValidator } from '../../utils/validators';
import './contact.component.css';

export type ContactState = {
  show: boolean;
  id?: number | undefined;
};

export interface IContactProps extends ModalProps {
  state: ContactState;
}

const Contact = ({ state, onHide, ...otherProps }: IContactProps) => {
  const dispatch = useAppDispatch();
  const contact: undefined | IContact = useAppSelector((appstate) =>
    appstate.user.contacts.find((contact) => contact.id === state.id)
  );
  const { isLoading } = useAppSelector((state) => state.user);
  const [imageUrlTemp, setImageUrlTemp] = useState<string>('');
  useEffect(() => {
    setImageUrlTemp(contact ? contact.imageUrl : '');
  }, [state, contact]);
  const formik = useFormik({
    initialValues: {
      firstName: contact ? contact.firstName : '',
      lastName: contact ? contact.lastName : '',
      imageUrl: contact ? contact.imageUrl : '',
      email: contact ? contact.email : '',
      phone: contact ? contact.phone : '',
      telegram: contact ? contact.telegram : '',
    },
    validationSchema: Yup.object({
      firstName: fieldRequiredValidator,
    }),
    onSubmit: (args: IAddContactArgs) => {
      if (state.id !== undefined) {
        dispatch(modifyContact({ ...args, id: state.id }));
      } else {
        dispatch(addContact(args)).unwrap().then(onHide);
      }
    },
    enableReinitialize: true,
  });
  return (
    <Modal
      centered
      size="lg"
      animation={false}
      show={state.show}
      onHide={onHide}
      {...otherProps}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          {state.id ? 'Изменить контакт' : 'Добавить контакт'}
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={formik.handleSubmit}>
        <Modal.Body>
          <Row>
            <Col lg={2} className="text-center">
              <Image imageUrl={imageUrlTemp} size="100px" />
            </Col>
            <Col lg={10}>
              <Row>
                <Col sm={6}>
                  <Form.Group>
                    <Form.Label>Имя</Form.Label>
                    <Form.Control
                      type="text"
                      name="firstName"
                      value={formik.values.firstName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      isInvalid={
                        !!(formik.errors.firstName && formik.touched.firstName)
                      }
                    />
                  </Form.Group>
                </Col>
                <Col sm={6}>
                  <Form.Group>
                    <Form.Label>Фамилия</Form.Label>
                    <Form.Control
                      type="text"
                      name="lastName"
                      value={formik.values.lastName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      isInvalid={
                        !!(formik.errors.lastName && formik.touched.lastName)
                      }
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mt-2">
                <Col sm={12}>
                  <Form.Group>
                    <Form.Label>Ссылка на изображение</Form.Label>
                    <Form.Control
                      type="text"
                      name="imageUrl"
                      value={formik.values.imageUrl}
                      onChange={(e) => {
                        formik.handleChange(e);
                        setImageUrlTemp(e.currentTarget.value);
                      }}
                      onBlur={formik.handleBlur}
                      isInvalid={
                        !!(formik.errors.imageUrl && formik.touched.imageUrl)
                      }
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mt-2">
                <Col sm={12}>
                  <Form.Group>
                    <Form.Label>Почта</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      isInvalid={
                        !!(formik.errors.email && formik.touched.email)
                      }
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mt-2">
                <Col sm={6}>
                  <Form.Group>
                    <Form.Label>Телефон</Form.Label>
                    <Form.Control
                      type="text"
                      name="phone"
                      value={formik.values.phone}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      isInvalid={
                        !!(formik.errors.phone && formik.touched.phone)
                      }
                    />
                  </Form.Group>
                </Col>
                <Col sm={6}>
                  <Form.Group>
                    <Form.Label>Телеграм</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>@</InputGroup.Text>
                      <Form.Control
                        type="text"
                        name="telegram"
                        value={formik.values.telegram}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isInvalid={
                          !!(formik.errors.telegram && formik.touched.telegram)
                        }
                      />
                    </InputGroup>
                  </Form.Group>
                </Col>
              </Row>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          {state.id !== undefined ? (
            <>
              <Button
                isLoading={isLoading}
                variant="danger"
                type="button"
                onClick={() => {
                  if (state.id !== undefined) {
                    dispatch(delContact(state.id)).unwrap().then(onHide);
                  }
                }}
              >
                <i className="fa-solid fa-trash me-2"></i>
                Удалить
              </Button>
              <Button isLoading={isLoading} variant="warning" type="submit">
                <i className="fa-solid fa-pen-to-square me-2" />
                Изменить
              </Button>
            </>
          ) : (
            <Button isLoading={isLoading} variant="success" type="submit">
              <i className="fa-solid fa-user-plus me-2" />
              Добавить
            </Button>
          )}
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default Contact;
