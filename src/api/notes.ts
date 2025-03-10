import {AxiosError} from 'axios';
import { api } from '.';
import type { Note } from '../models/Note';

export async function getNotes(accessToken: string): Promise<Note[] | null> {
  try {
    const response = await api.get('/notes', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log('Notes:', response.data);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error('Failed to get notes:', error.response?.data || error.message);
    } else {
      console.error('Failed to get notes:', (error as Error).message || error);
    }
    return null;
  }
}

export async function createNote(accessToken: string, title: string, content: string): Promise<Note> {
  try {
    const response = await api.post('/notes', { title, content }, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log('Note created:', response.data);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error('Failed to create notes:', error.response?.data || error.message);
      throw error.response?.data || error.message;
    } else {
      console.error('Failed to create notes:', (error as Error).message || error);
      throw (error as Error).message || error;
    }
  }
}

export async function deleteNote(accessToken: string, noteId: number) {
  try {
    await api.delete(`/notes/${noteId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log('Note deleted');
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error('Failed to delete notes:', error.response?.data || error.message);
    } else {
      console.error('Failed to delete notes:', (error as Error).message || error);
    }
  }
}