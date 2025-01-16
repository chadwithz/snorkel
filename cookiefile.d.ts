declare module 'cookiefile' {
  class CookieMap {
    constructor(filePath: string);
    get(key: string): string | undefined;
    set(key: string, value: string): void;
    toRequestHeader(): string;
  }

  export { CookieMap };
}

