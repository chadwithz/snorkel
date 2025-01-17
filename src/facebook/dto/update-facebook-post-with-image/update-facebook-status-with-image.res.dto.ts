export interface FirstStep {
  __ar: number;
  payload: Payload;
  dtsgToken: string;
  lid: string;
}

export interface Payload {
  isSpherical: boolean;
  height: number;
  imageSrc: string;
  mediaLocation: null;
  originalPhotoID: string;
  photoID: string;
  sphericalPhotoID: string;
  thumbSrc: string;
  width: number;
  mediaTakenTime: null;
}

export class UpdateFacebookStatusWithImageResponseDto implements FirstStep {
  payload: Payload;
  lid: string;
  __ar: number;
  dtsgToken: string;

  constructor(raw: string) {
    const data = raw.replace("for (;;);", "");
    const parsed = JSON.parse(data) as FirstStep;
    this.payload = parsed.payload;
    this.lid = parsed.lid;
    this.__ar = parsed.__ar;
    this.dtsgToken = parsed.dtsgToken;
  }
}

export class UpdateFacebookStatusWithImageErrDto {
  status: number;
  data: any;
  isError: boolean;

  constructor(status: number, isError: boolean, data: any) {
    this.isError = isError;
    this.status = status;
    this.data = data;
  }
}

