import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useNavigate } from "react-router";

const schema = z.object({
  email: z.string().min(3, "El usuario debe tener al menos 3 caracteres"),
  password: z.string().min(4, "La contraseña debe tener al menos 4 caracteres"),
});

type FormData = z.infer<typeof schema>;

const URL_SERVER = import.meta.env.VITE_URL_SERVER || "http://localhost:3000";

export default function Login() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      const res = await axios.post(`${URL_SERVER}/api/users/login`, data);
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (error) {
      alert("Login incorrecto");
      console.error("Error during login:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("email")} placeholder="Usuario" />
      {errors.email && <span>{errors.email.message}</span>}
      <input
        type="password"
        {...register("password")}
        placeholder="Contraseña"
      />
      {errors.password && <span>{errors.password.message}</span>}
      <button type="submit">Entrar</button>
    </form>
  );
}
