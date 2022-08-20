import { createSlice } from '@reduxjs/toolkit';
import { signUp, signIn } from '../../controllers/authorization';
import {
  getContacts,
  addContact,
  modifyContact,
  delContact,
} from '../../controllers/contacts';

export interface IContact {
  id: number;
  firstName: string;
  lastName: string;
  imageUrl: string;
  phone: string;
  email: string;
  telegram: string;
}

export const enum EUserErrorType {
  SIGN_UP = '@EUserErrorType/SignUp',
  SIGN_IN = '@EUserErrorType/SignIn',
  GET_CONTACTS = '@EUserErrorType/GetContacts',
  ADD_CONTACT = '@EUserErrorType/AddContact',
  MODIFY_CONTACT = '@EUserErrorType/ModifyContact',
  DEL_CONTACT = '@EUserErrorType/DelContact',
}

export interface IUserError {
  type: EUserErrorType;
  explanation?: string | undefined;
}

export interface IUserState {
  email: null | string;
  accessToken: null | string;
  id: null | number;
  isLoading: boolean;
  error: IUserError | null;
  contacts: IContact[];
}

const initialState: IUserState = {
  email: null,
  accessToken: null,
  id: null,
  isLoading: false,
  error: null,
  contacts: [],
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signOut(state) {
      state.id = null;
      state.email = null;
      state.isLoading = false;
      state.error = null;
      state.accessToken = null;
      state.contacts = [];
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Sign Up
      .addCase(signUp.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signUp.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.email = payload.user.email;
        state.accessToken = payload.accessToken;
        state.id = payload.user.id;
      })
      .addCase(signUp.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = {
          type: EUserErrorType.SIGN_UP,
          explanation: payload as string,
        };
      })
      // Sign In
      .addCase(signIn.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signIn.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.email = payload.user.email;
        state.accessToken = payload.accessToken;
        state.id = payload.user.id;
      })
      .addCase(signIn.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = {
          type: EUserErrorType.SIGN_IN,
          explanation: payload as string,
        };
      })
      // Get Contacts
      .addCase(getContacts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getContacts.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.contacts = payload;
      })
      .addCase(getContacts.rejected, (state) => {
        state.isLoading = false;
        state.error = {
          type: EUserErrorType.GET_CONTACTS,
        };
      })
      // Add Contact
      .addCase(addContact.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addContact.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.contacts = [...state.contacts, payload];
      })
      .addCase(addContact.rejected, (state) => {
        state.isLoading = false;
        state.error = {
          type: EUserErrorType.ADD_CONTACT,
        };
      })
      // Modify Contact
      .addCase(modifyContact.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(modifyContact.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.contacts = state.contacts.map((contact) =>
          contact.id !== payload.id ? contact : payload
        );
      })
      .addCase(modifyContact.rejected, (state) => {
        state.isLoading = false;
        state.error = {
          type: EUserErrorType.MODIFY_CONTACT,
        };
      })
      // Del Contact
      .addCase(delContact.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(delContact.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.contacts = state.contacts.filter(
          (contact) => contact.id !== payload
        );
      })
      .addCase(delContact.rejected, (state) => {
        state.isLoading = false;
        state.error = {
          type: EUserErrorType.DEL_CONTACT,
        };
      });
  },
});

const userReducer = userSlice.reducer;

export const { signOut, clearError } = userSlice.actions;

export default userReducer;
