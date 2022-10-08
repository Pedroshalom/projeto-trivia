const TOKEN_API = 'https://opentdb.com/api_token.php?command=request';

const getToken = async () => {
  try {
    const response = await fetch(TOKEN_API);
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

export default getToken;
