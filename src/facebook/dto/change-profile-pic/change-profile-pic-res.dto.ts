export interface FirstStep {
  __ar: number;
  payload: Payload;
  dtsgToken: string;
  lid: string;
}

export interface Payload {
  fbid: string;
  profileID: string;
  imageURI: string;
  imageHeight: number;
  imageWidth: number;
}

export class ChangeFacebookProfilePicErrResponseDto {
  status: number;
  data: any;
  isError: boolean;

  constructor(status: number, isError: boolean, data: any) {
    this.isError = isError;
    this.status = status;
    this.data = data;
  }
}

export class ChangeFacebookProfilePicSuccessResponseDto implements FirstStep {
  __ar: number;
  payload: Payload;
  dtsgToken: string;
  lid: string;

  constructor(raw: string) {
    const data = raw.replace("for (;;);", "");
    const parsed = JSON.parse(data) as FirstStep;
    this.__ar = parsed.__ar;
    this.payload = parsed.payload;
    this.dtsgToken = parsed.dtsgToken;
    this.lid = parsed.lid;
  }
}
