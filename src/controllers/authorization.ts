import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export interface ISignInArguments {
  email: string;
  password: string;
}

export const signIn = createAsyncThunk(
  'user/signIn',
  async (args: ISignInArguments, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('/signin', args);
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data);
      }
      return rejectWithValue(error);
    }
  }
);

export interface ISignUpArguments {
  email: string;
  password: string;
}

export const signUp = createAsyncThunk(
  'user/signUp',
  async (args: ISignUpArguments, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('/signup', args);
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data);
      }
      return rejectWithValue(error);
    }
  }
);
