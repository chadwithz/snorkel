export interface FirstStep {
  __ar: number;
  payload: Payload;
  dtsgToken: string;
  lid: string;
}

export interface Payload {
  video_id: string;
  start_offset: number;
  end_offset: number;
  skip_upload: boolean;
}


export class UpdateFacebookStatusWithVideoErrResponseDto {
  status: number;
  data: any;
  isError: boolean;

  constructor(status: number, isError: boolean, data: any) {
    this.isError = isError;
    this.status = status;
    this.data = data;
  }
}

export class UpdateFacebookStatusWithVideoResponseDto implements FirstStep {
  payload: Payload;
  dtsgToken: string;
  __ar: number;
  lid: string;

  constructor(raw: string) {
    const data = raw.replace("for (;;);", "");
    const parsed = JSON.parse(data) as FirstStep;
    this.lid = parsed.lid;
    this.__ar = parsed.__ar;
    this.dtsgToken = parsed.dtsgToken;
    this.payload = parsed.payload;
  }
}
