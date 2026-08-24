export type ProtectionDurationDays = 7 | 14 | 30 | 60 | 90;

export const protectionDurations: readonly ProtectionDurationDays[] = [
  7, 14, 30, 60, 90,
] as const;
