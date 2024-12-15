export function isValidCpf(cpf: string): boolean {
  cpf = cpf.replace(/\D/g, '');

  if (cpf.length !== 11) return false;

  const invalidCpfPatterns = [
    '00000000000',
    '11111111111',
    '22222222222',
    '33333333333',
    '44444444444',
    '55555555555',
    '66666666666',
    '77777777777',
    '88888888888',
    '99999999999',
  ];

  if (invalidCpfPatterns.includes(cpf)) return false;

  const cpfArray = cpf.split('').map(Number);

  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += cpfArray[i] * (10 - i);
  }
  let firstCheckDigit = (sum * 10) % 11;
  if (firstCheckDigit === 10) firstCheckDigit = 0;
  if (firstCheckDigit !== cpfArray[9]) return false;

  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += cpfArray[i] * (11 - i);
  }
  let secondCheckDigit = (sum * 10) % 11;
  if (secondCheckDigit === 10) secondCheckDigit = 0;
  if (secondCheckDigit !== cpfArray[10]) return false;

  return true;
}
