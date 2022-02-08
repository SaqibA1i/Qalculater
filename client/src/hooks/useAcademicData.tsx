import { useQuery } from "react-query";
import axios from "axios";
import { QueryFunctionContext } from "react-query";

export default function useAcademicData(
  tokens:
    | {
        jwt_token: string;
        access_token: string;
      }
    | undefined
) {
  const fetchAcademicData = async () => {
    console.log(tokens);
    let dataToSend =
      tokens != undefined
        ? {
            id_token: tokens.jwt_token,
            access_token: tokens.access_token
          }
        : {};
    let response = await axios({
      method: "post",
      url: process.env.REACT_APP_SERVER_PROXY + "auth/login",

      data: dataToSend
    });
    return response;
  };
  return useQuery("academicData", fetchAcademicData);
}
