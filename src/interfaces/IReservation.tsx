import { ReservationStatus } from '../enums/Reservation';
import { Restaurant } from './IRestaurantDetails';
import { BasicUserInformationResponse } from './IUser';

export interface Reservation {
  id: number;
  numberOfGuests: number;
  reservationStatus: ReservationStatus;
  specialComment: string;
  date: Date;
  startTime: string;
  endTime: string;
  restaurant: Restaurant;
}

export interface RestaurantReservation extends Reservation {
  user: BasicUserInformationResponse;
}
