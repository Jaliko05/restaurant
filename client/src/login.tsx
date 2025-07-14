import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useNavigate } from "react-router";

// Define el esquema de validación con Zod
const schema = z.object({
  username: z.string().min(3, "El usuario debe tener al menos 3 caracteres"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

type FormData = z.infer<typeof schema>;

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
      const res = await axios.post(
        "http://localhost:3001/api/auth/login",
        data
      );
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch {
      alert("Login incorrecto");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("username")} placeholder="Usuario" />
      {errors.username && <span>{errors.username.message}</span>}
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
