import axios from 'axios';

export var APIURL = 'https://api.apilayer.com/fixer/';
export var APIKEY = '1dJ9hbW2uV9mGK26hyjK1bNeYUH7klJ2';

function handleErrorObservable(error:any) {
   var response = error.message || error;
   let responseJson = { is_error: true, message: response };
   return responseJson;
}

export const PostAPI = async (URL:any, Data:any) => {
    try {
       const response = await axios.post(APIURL + URL, Data);
       return response.data;
    }
    catch (error) {
       handleErrorObservable(error);
    }
}

export const GetAPI = async (URL:any, props:any) => {
   try {
      const response = await axios.get(APIURL + URL);
      return response.data;
   }
   catch (error) {
      handleErrorObservable(error);
   }
}