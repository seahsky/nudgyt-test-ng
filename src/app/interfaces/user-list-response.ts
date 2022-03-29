import { User } from './user';

export interface UserListResponse {
  data: User[];
  page: number;
  totalCount: number;
}
