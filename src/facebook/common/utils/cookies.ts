import axios from "axios";
import { getCookieFromFile } from "src/utils/cookies";

interface DTSG {
  __ar: number;
  payload: {
    token: string;
    valid_for: number;
    expires: number;
  }
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


