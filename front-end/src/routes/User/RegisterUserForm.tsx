"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { InputMask } from "@react-input/mask";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { isValidCpf } from "../../lib/functionUtils/isValidCpf";
import { Textarea } from "../../components/ui/textarea";
import { useToast } from "../../hooks/use-toast";
import { createUser } from "../../services/userService";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ETEG - Registro de Usuário",
  description: "Cadastre suas informações para ser registrado na plataforma.",
};

const formSchema = z.object({
  name: z
    .string({ message: "Campo obrigatório" })
    .min(3, { message: "Nome é obrigatório" })
    .max(255),
  cpf: z
    .string({ message: "Campo obrigatório" })
    .refine((cpf) => isValidCpf(cpf), {
      message: "CPF inválido",
    }),
  email: z
    .string({ message: "Campo obrigatório" })
    .email({ message: "Email inválido" }),
  favoriteColor: z
    .string({ message: "Campo obrigatório" })
    .min(1, { message: "Selecione uma cor" }),
  observations: z
    .string()
    .max(255, { message: "Máximo de caracteres atigindo" })
    .optional(),
});

const userColors = [
  {
    value: "RED",
    label: "Vermelho",
  },
  { value: "ORANGE", label: "Laranja" },
  { value: "YELLOW", label: "Amarelo" },
  { value: "GREEN", label: "Verde" },
  { value: "BLUE", label: "Azul" },
  { value: "INDIGO", label: "Índigo" },
  { value: "VIOLET", label: "Violeta" },
];

export default function RegisterUserForm() {
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      observations: "",
    },
  });

  const onSubmit = async (values: CreateUserDto) => {
    try {
      const payload = {
        ...values,
        cpf: String(values.cpf).replace(/\D/g, ""),
      };

      await createUser(payload);

      toast({
        title: "Usuário registrado com sucesso",
      });

      return router.push("/users/register/success");
    } catch (error) {
      const getErrorMessage = (err: unknown) => {
        if (err instanceof AxiosError) {
          return err?.response?.data?.message || err?.message;
        }
        return "Tente novamente mais tarde...";
      };

      return toast({
        title: "Erro ao registrar o usuário",
        variant: "destructive",
        description: getErrorMessage(error),
      });
    }
  };

  return (
    <div className="flex items-center justify-center px-4 md:px-12 h-full">
      <Card className="max-w-[800px] w-full">
        <CardHeader>
          <CardTitle className="capitalize text-xl">
            Registro de usuário
          </CardTitle>
          <CardDescription className="text-lg">
            Insira as suas informações logo abaixo.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Digite o seu nome completo"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="cpf"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CPF</FormLabel>
                      <FormControl>
                        <InputMask
                          mask="___.___.___-__"
                          placeholder="999.999.999-99"
                          component={Input}
                          replacement={{ _: /\d/ }}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Digite o seu email"
                          type="email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="favoriteColor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cor Favorita</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione uma cor" />
                          </SelectTrigger>
                          <SelectContent>
                            {userColors?.map((color) => (
                              <SelectItem key={color.value} value={color.value}>
                                {color.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="observations"
                  render={({ field }) => (
                    <FormItem className="col-span-full">
                      <FormLabel>Observações</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tem alguma observação? Escreva aqui"
                          maxLength={255}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button
            onClick={form.handleSubmit(onSubmit)}
            className="w-full md:max-w-sm"
          >
            Salvar
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
