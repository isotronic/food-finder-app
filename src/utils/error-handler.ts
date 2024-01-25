export function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message;
  if (error instanceof GeolocationPositionError) return error.message;
  return String(error);
}
