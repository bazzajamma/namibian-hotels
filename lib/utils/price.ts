/**
 * Price formatting utilities
 */

export function formatPrice(amount: number, currency: string = 'NAD'): string {
  return new Intl.NumberFormat('en-NA', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatPriceWithDecimals(amount: number, currency: string = 'NAD'): string {
  return new Intl.NumberFormat('en-NA', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

