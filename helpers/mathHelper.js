export const fibonacci = (num) => {
    if (num <= 0) return 0;
    if (num === 1) return 1;
    return fibonacci(num - 1) + fibonacci(num - 2);
};

export const isPrime = (number) => {
  if (number <= 1) {
    return false; // Bilangan negatif, 0, dan 1 bukan bilangan prima
  }

  if (number <= 3) {
    return true; // 2 dan 3 adalah bilangan prima
  }

  if (number % 2 === 0 || number % 3 === 0) {
    return false; // Bilangan yang habis dibagi 2 atau 3 bukan bilangan prima
  }

  let i = 5;
  while (i * i <= number) {
    if (number % i === 0 || number % (i + 2) === 0) {
      return false; // Bilangan yang habis dibagi i atau i + 2 bukan bilangan prima
    }
    i += 6; // Selisih untuk mencari faktor prima selanjutnya
  }

  return true; // Jika
}