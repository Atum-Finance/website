export function cn(
  ...classes: Array<string | false | null | undefined>
): string {
  return classes.filter(Boolean).join(" ");
}

export function isConfiguredUrl(url: string | undefined | null): url is string {
  if (!url) return false;
  const trimmed = url.trim();
  return trimmed.length > 0 && trimmed !== "#";
}
