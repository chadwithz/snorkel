export class DeleteFacebookStatusResponseErrDto {
  status: number;
  data: any;
  isError: boolean;

  constructor(status: number, isError: boolean, data: any) {
    this.isError = isError;
    this.status = status;
    this.data = data;
  }
}

