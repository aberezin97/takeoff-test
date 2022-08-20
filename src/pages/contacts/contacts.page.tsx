import React, { useState, useEffect } from 'react';
import {
  Container,
  Navbar,
  Form,
  Button,
  InputGroup,
  ListGroup,
} from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../../store';
import { Navigate } from 'react-router-dom';
import ContactPreview from '../../components/contact-preview/contact-preview.component';
import Contact, {
  ContactState,
} from '../../components/contact/contact.component';
import { getContacts } from '../../controllers/contacts';
import ROUTES from '../../routes';
import { signOut } from '../../store/slices/userSlice';
import './contacts.page.css';

const ContactsPage = () => {
  const dispatch = useAppDispatch();
  const { contacts, accessToken } = useAppSelector((state) => state.user);
  const [contactState, setContactState] = useState<ContactState>({
    show: false,
  });
  const [searchText, setSearchText] = useState<string>('');
  useEffect(() => {
    dispatch(getContacts());
  }, []);
  return accessToken !== null ? (
    <div>
      <Contact
        state={contactState}
        onHide={() => setContactState({ ...contactState, show: false })}
      />
      <Navbar bg="white" variant="light">
        <Container>
          <Navbar.Brand>
            <i className="fa-solid fa-address-book fa-xl me-2" />
            <span>Контакты</span>
          </Navbar.Brand>
          <Button
            variant="light"
            onClick={() => {
              dispatch(signOut());
            }}
          >
            <i className="fa-solid fa-arrow-right-from-bracket" />
          </Button>
        </Container>
      </Navbar>
      <Container className="mt-2">
        <InputGroup className="controls">
          <Button
            variant="success"
            onClick={() => setContactState({ show: true })}
          >
            <i className="fa-solid fa-user-plus" />
          </Button>
          <Form.Control
            type="text"
            placeholder="Поиск..."
            value={searchText}
            onChange={(e) => setSearchText(e.currentTarget.value)}
          />
        </InputGroup>
        <ListGroup className="contacts">
          {contacts
            .filter((contact) =>
              `${contact.firstName} ${contact.lastName}`
                .toLocaleLowerCase()
                .includes(searchText.toLocaleLowerCase())
            )
            .map((contact) => (
              <ContactPreview
                key={contact.id}
                firstName={contact.firstName}
                lastName={contact.lastName}
                imageUrl={contact.imageUrl}
                onClick={() => {
                  setContactState({ show: true, id: contact.id });
                }}
              />
            ))}
        </ListGroup>
      </Container>
    </div>
  ) : (
    <Navigate to={ROUTES.SIGN_IN} />
  );
};

export default ContactsPage;
