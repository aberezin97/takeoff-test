import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ROUTES from './routes';
import './App.css';

import ContactsPage from './pages/contacts/contacts.page';
import SigninPage from './pages/signin/signin.page';
import SignupPage from './pages/signup/signup.page';

function App() {
  return (
    <div>
      <Routes>
        <Route path={ROUTES.APP} element={<ContactsPage />} />
        <Route path={ROUTES.SIGN_IN} element={<SigninPage />} />
        <Route path={ROUTES.SIGN_UP} element={<SignupPage />} />
      </Routes>
    </div>
  );
}

export default App;
