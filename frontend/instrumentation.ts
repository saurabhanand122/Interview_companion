export async function register() {
  // Sentry removed. No-op register kept for compatibility.
  return;
}

export const onRequestError = (error: unknown) => {
  // Fallback: log request-level errors
  // eslint-disable-next-line no-console
  console.error("Request error:", error);
};
