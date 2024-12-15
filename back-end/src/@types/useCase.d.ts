interface UseCase<Input, Response> {
  execute(input: Input): Response;
}
