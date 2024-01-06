import { Status } from '../enum/status.enum';

// maps the server object from backend for the frontend
export interface Server {
  id: number;
  ipAddress: string;
  name: string;
  memory: string;
  type: string;
  imageUrl: string;
  status: Status;
}
