import axios from "axios";

export const GET_modules = (courseId: string) => {
  return axios
    .get(`learningx/api/v1/courses/${courseId}/modules`)
    .then((res) => res.data);
};
