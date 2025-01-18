export function parseCookieString(cookieString: string): Record<string, string> {
  return cookieString.split(";").reduce((acc, pair) => {
    const [key, value] = pair.split("=").map(part => part.trim());
    if (key && value) {
      acc[key] = value;
    }
    return acc;
  }, {} as Record<string, string>);
}


