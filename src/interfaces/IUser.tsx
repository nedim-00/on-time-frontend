import { UserRole } from '../enums/UserRole';
import { UserStatus } from '../enums/UserStatus';

export interface UserResponse {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  image: string | null;
  phoneNumber: string | null;
  userRole: UserRole | null;
  userStatus: UserStatus | null;
  dateJoined: Date | string;
}

export interface BasicUserInformationResponse {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  image: string | null;
  phoneNumber: string | null;
  dateJoined: Date;
}

export interface UpdatedUserResponse extends UserResponse {
  token: string;
}
