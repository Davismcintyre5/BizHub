import currency from 'currency.js';
import { format as dfFormat, formatDistanceToNow, parseISO } from 'date-fns';

export function formatMoney(
  amount: number | string,
  currencyCode = 'KES',
  options?: { symbol?: string; precision?: number }
): string {
  const symbol =
    options?.symbol ??
    (currencyCode === 'KES'
      ? 'KSh '
      : currencyCode === 'USD'
      ? '$'
      : currencyCode === 'EUR'
      ? '€'
      : `${currencyCode} `);

  const c = currency(amount, {
    symbol,
    precision: options?.precision ?? 2,
    separator: ',',
    decimal: '.',
  });

  return c.format();
}

export function formatNumber(value: number, decimals = 0): string {
  return new Intl.NumberFormat('en-KE', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

export function formatPercent(value: number, decimals = 1): string {
  return `${value.toFixed(decimals)}%`;
}

export function formatDate(
  input: string | Date,
  pattern = 'dd MMM yyyy'
): string {
  const d = typeof input === 'string' ? parseISO(input) : input;
  if (Number.isNaN(d.getTime())) return '';
  return dfFormat(d, pattern);
}

export function formatDateTime(input: string | Date): string {
  return formatDate(input, 'dd MMM yyyy, HH:mm');
}

export function formatTime(input: string | Date): string {
  return formatDate(input, 'HH:mm');
}

export function formatRelative(input: string | Date): string {
  const d = typeof input === 'string' ? parseISO(input) : input;
  if (Number.isNaN(d.getTime())) return '';
  return formatDistanceToNow(d, { addSuffix: true });
}

export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes}m`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m === 0 ? `${h}h` : `${h}h ${m}m`;
}

export function formatPhone(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  if (digits.startsWith('254') && digits.length === 12) {
    return `+${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(
      6,
      9
    )} ${digits.slice(9)}`;
  }
  if (digits.startsWith('0') && digits.length === 10) {
    return `${digits.slice(0, 4)} ${digits.slice(4, 7)} ${digits.slice(7)}`;
  }
  return phone;
}

export function initials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 0) return '';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function truncate(text: string, max = 40): string {
  return text.length <= max ? text : `${text.slice(0, max - 1)}…`;
}