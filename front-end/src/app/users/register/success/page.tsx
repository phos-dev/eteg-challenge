import { Metadata } from "next";
import RegisterUserSuccess from "../../../../routes/User/RegisterUserSuccess";

export const metadata: Metadata = {
  title: "ETEG - Sucesso",
  description: "Usuário registrado, agradecemos pelo seu tempo.",
};

export default function UserRegistrationSuccessPage() {
  return <RegisterUserSuccess />;
}
