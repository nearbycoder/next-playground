import 'isomorphic-fetch';

export default async (uri, config = {}) => {
  try {
    const response = await fetch(`http://localhost:3000/${uri}`, config);
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};
