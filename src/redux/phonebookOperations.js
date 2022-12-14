import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://62fa2d6f3c4f110faa93bb55.mockapi.io';

export const getContacts = createAsyncThunk(
  'phonebook/getContacts',
  async (_, { rejectWithValue }) => {
    try {
      const contacts = await axios.get('/contacts');
      return contacts.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addContact = createAsyncThunk(
  'phonebook/addContact',
  async (contact, { rejectWithValue, dispatch }) => {
    try {
      await axios.post('/contacts', contact);
      dispatch(getContacts());
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  'phonebook/deleteContact',
  async (id, { rejectWithValue, dispatch }) => {
    try {
      await axios.delete(`/contacts/${id}`);
      dispatch(getContacts());
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
