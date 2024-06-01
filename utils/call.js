const fnc = async (text)=> {
 const axios = require('axios');

const options = {
  method: 'POST',
  url: 'https://chatgpt-42.p.rapidapi.com/gpt4',
  headers: {
    'content-type': 'application/json',
    'X-RapidAPI-Key': process.env.RAPIDKEY,
    'X-RapidAPI-Host': 'chatgpt-42.p.rapidapi.com'
  },
  data: {
    messages: [
      {
        role: 'user',
        content: text
      }
    ],
    web_access: false
  }
};

try {
	const response = await axios.request(options);
	return response.data;
} catch (error) {
	return "error"
}
}


module.exports = {fnc};