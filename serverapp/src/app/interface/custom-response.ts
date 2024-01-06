import { Server } from './server';

// maps the backend response object
export interface CustomResponse {
  timeStamp: Date;
  statusCode: number;
  status: string;
  reason: string;
  message: string;
  developerMessage: string;
  data: { servers?: Server[]; server?: Server }; // optional parameters which means its possible we may not have this value
}
