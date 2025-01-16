import { CookieMap } from 'cookiefile';
import { PathLike } from 'node:fs';
import axios from 'axios';

interface DTSG {
  __ar: number;
  payload: {
    token: string;
    valid_for: number;
    expires: number;
  }
}

export function getCookieFromFile(path: PathLike = 'cookies') {
  const raw = new CookieMap(path.toString());
  const cookie = raw.toRequestHeader();
  return cookie.replace(/Cookie: /, '');
}

export function getProfileID() {
  const cookie = getCookieFromFile();
  const profileID = cookie.match(/c_user=(\d+)/);
  return profileID ? profileID[1] : '';
}

export async function generateDTSG() {
  const response = await axios.get('https://www.facebook.com/ajax/dtsg/', {
    params: {
      '__a': 'true'
    },
    headers: {
      'cookie': getCookieFromFile()
    }
  });
  const formatted = response.data.replace('for (;;);', '');
  const json = JSON.parse(formatted) as DTSG;
  return json;
}
