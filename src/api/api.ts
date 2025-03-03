import axios from "axios";

const baseURL = 'https://api.github.com';

export const getData = async (title: string) => {
  return await axios.get(`${baseURL}/search/repositories?q=${title}`);
}
