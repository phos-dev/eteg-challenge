import { Metadata } from "next";
import RegisterUserForm from "../../../routes/User/RegisterUserForm";

export const metadata: Metadata = {
  title: "ETEG - Registro de Usuário",
  description: "Cadastre suas informações para ser registrado na plataforma.",
};

export default function Home() {
  return <RegisterUserForm />;
}
