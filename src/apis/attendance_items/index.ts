import axios from "axios";

export const GET_attendance_items = (courseId: string) => {
  return axios
    .get(`/learningx/api/v1/courses/${courseId}/attendance_items/summary`)
    .then((res) => res.data);
};
