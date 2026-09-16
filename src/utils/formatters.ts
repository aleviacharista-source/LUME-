export function formatIDR(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
    .format(amount)
    .replace(/\s+/g, '');
}

export function generateOrderNumber(): string {
  const timestamp = Date.now().toString().slice(-6);
  const randomLetters = Math.random().toString(36).substring(2, 5).toUpperCase();
  return `LME-${timestamp}-${randomLetters}`;
}
