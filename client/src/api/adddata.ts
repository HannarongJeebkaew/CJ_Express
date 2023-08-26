
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // แก้ไขเป็น URL ของ Backend ของคุณ
});

export const getdata = async (token:string) => {
  return axios
  .get("http://localhost:5000/api/product",{
    headers: {
      authtoken: token,
    },
  }) ;
};

export const adddata = async (product:any,token:string) => {
  const response = await axios
  .post("http://localhost:5000/api/product/", product,{
    headers: {
      authtoken: token,
    },
  });
  return response;
};
export const editdata = async (product:any,_id:any,token:string) => {
    const response = await axios
    .put("http://localhost:5000/api/product/" + _id, product,{
        headers: {
          authtoken: token,
        },
      });
    return response;
  };
