import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootStateType } from '../store';

export const getContacts = createAsyncThunk(
  'user/getContacts',
  async (args, { rejectWithValue, getState }) => {
    const { accessToken } = (getState() as RootStateType).user;
    try {
      const { data } = await axios.get('/contacts', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export interface IAddContactArgs {
  firstName: string;
  lastName: string;
  imageUrl: string;
  email: string;
  phone: string;
  telegram: string;
}

export const addContact = createAsyncThunk(
  'user/addContact',
  async (args: IAddContactArgs, { rejectWithValue, getState }) => {
    const { accessToken, id } = (getState() as RootStateType).user;
    try {
      const { data } = await axios.post(
        '/contacts',
        { ...args, userId: id },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export interface IModifyContactArgs extends IAddContactArgs {
  id: number;
}

export const modifyContact = createAsyncThunk(
  'user/modifyContact',
  async (
    { id: contactId, ...args }: IModifyContactArgs,
    { rejectWithValue, getState }
  ) => {
    const { accessToken, id } = (getState() as RootStateType).user;
    try {
      const { data } = await axios.put(
        `/contacts/${contactId}`,
        { ...args, userId: id },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const delContact = createAsyncThunk(
  'user/delContact',
  async (id: number, { rejectWithValue, getState }) => {
    const { accessToken } = (getState() as RootStateType).user;
    try {
      await axios.delete(`/contacts/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return id;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
