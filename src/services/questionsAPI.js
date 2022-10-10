const QUESTION_API = 'https://opentdb.com/api.php?amount=5&token=';

const getQuestion = async () => {
  const token = localStorage.getItem('token');
  const link = `${QUESTION_API}${token}`;
  try {
    const response = await fetch(link);
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

export default getQuestion;
