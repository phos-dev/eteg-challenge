import { CheckCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import Link from "next/link";

export default function RegisterUserSuccess() {
  return (
    <div className="h-full flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold text-green-600">
            Sucesso!
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-4">
          <CheckCircle className="w-16 h-16 text-green-500" />
          <p className="text-center text-gray-600">
            Sua ação foi concluída com sucesso. Obrigado por usar nosso serviço!
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link href="/users/register">
            <Button>Voltar para a tela de cadastro</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
