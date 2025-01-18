import { CookieMap } from 'cookiefile';
import { PathLike } from 'node:fs';

export function getCookieFromFile(path: PathLike = 'cookies') {
  const raw = new CookieMap(path.toString());
  const cookie = raw.toRequestHeader();
  return cookie.replace(/Cookie: /, '');
}
