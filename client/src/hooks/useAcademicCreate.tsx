import { useMutation, UseMutationResult, useQueryClient } from "react-query";
import axios from "axios";
import { AcademicData, User } from "../TS types/Types";

export default function useAcademicCreate(
  newData: User
): UseMutationResult<any, unknown, void, void> {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    (newData) =>
      axios({
        method: "post",
        url: process.env.REACT_APP_SERVER_PROXY + "auth/login",

        data: newData
      }).then((res) => res.data),
    {
      onMutate: (newData) => {
        const prevPost = queryClient.getQueryData("academicData");
        console.log(prevPost);
      },
      onSuccess: () => queryClient.refetchQueries("academicData")
    }
  );
  return mutation;
}
