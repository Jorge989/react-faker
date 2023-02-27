import customFetch from "../utils/axios";

export const registerUserThunk = async (url, user, thunkAPI) => {
  try {
    const resp = await customFetch.post(url, user);

    return resp.data;
  } catch (error) {
    throw new Error(error);
  }
};
