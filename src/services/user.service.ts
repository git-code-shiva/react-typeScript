import axios from "axios";
import { constants } from "../config/constants";

export const deleteUser = async () => {
  try {
    const request = await axios.delete(`${constants.BASE_URL}`);
    return request.data;
  } catch (error: any) {
    return error.response.data;
  }
};
