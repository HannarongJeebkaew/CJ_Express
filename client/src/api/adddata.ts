
import axios from 'axios';



export const getdata = async (token:string) => {
  return axios
  .get(import.meta.env.VITE_REACT_APP_API+"/product",{
    headers: {
      authtoken: token,
    },
  }) ;
};

export const adddata = async (product:any,token:string) => {
  const response = await axios
  .post(import.meta.env.VITE_REACT_APP_API+"/product/", product,{
    headers: {
      authtoken: token,
    },
  });
  return response;
};
export const editdata = async (product:any,_id:any,token:string) => {
    const response = await axios
    .put(import.meta.env.VITE_REACT_APP_API+"/product/" + _id, product,{
        headers: {
          authtoken: token,
        },
      });
    return response;
  };
