import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { axiosApi } from "@/libs/fetchData";
import { useEffect } from "react";
import { UserType } from "@/pages/register";
import { useDispatch } from "react-redux";
import { getNotify } from "@/stores/notificationReducer";
const schema = yup
  .object({
    username: yup.string().required(),
    password: yup.string(),
    retypePassword: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords does not match"),
    role: yup.string(),
  })
  .required();
type FormData = yup.InferType<typeof schema>;
type Props = {
  user: UserType;
};
export default function UpdateUser({ user }: Props) {
  const dispatch = useDispatch();
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: "all",
  });

  useEffect(() => {
    reset({ ...user });
  }, [user]);
  const onSubmit = async (data: FormData) => {
    try {
      const res = await axiosApi.put("users/update/" + user.id, data);
      dispatch(
        getNotify({ show: true, message: res.data.message, status: "success" })
      );
    } catch (error: any) {
      dispatch(
        getNotify({
          show: true,
          message: error.response.data.message,
          status: "success",
        })
      );
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        className="form-control mt-3"
        placeholder="username"
        {...register("username")}
      />
      {errors.username && (
        <span className="error">Field {errors.username.message}</span>
      )}
      <input
        className="form-control mt-3"
        placeholder="password"
        {...register("password")}
      />
      <input
        className="form-control mt-3"
        placeholder="Re-Type Password"
        {...register("retypePassword")}
      />
      {errors.retypePassword && (
        <span className="error">Field {errors.retypePassword.message}</span>
      )}

      <select className="form-select mt-3" {...register("role")}>
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>
      <input className="btn btn-outline-primary mt-3" type="submit" />
    </form>
  );
}
