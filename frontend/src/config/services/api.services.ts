import axios from 'axios';
import { API_URL } from '../constants/constants';

export const uploadData = (formData: FormData) => {
  return axios.post(`${API_URL}/upload`, formData);
};

export const getData = () => {
  return axios.get(`${API_URL}/video`);
};

export const deleteVideo = (id: string) => {
  return axios.delete(`${API_URL}/delete/${id}`);
};

