import { Role } from '@app/model/Role';
export interface User {
  id: number;
  name: string;
  email: string;
  roles?: Role[]
}