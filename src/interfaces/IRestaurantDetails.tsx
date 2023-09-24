import { City } from '../enums/City';
import { MenuItemCategory } from '../enums/MenuItemCategory';
import { Municipality } from '../enums/Municipality';
import { RestaurantStatus } from '../enums/RestaurantStatus';
import IMenu from './IMenu';

export default interface IRestaurantDetails {
  id: string;
  name: string;
  address: string;
  description: string;
  menu: IMenu[];
  images: string[];
}

export interface Restaurant {
  id: number;
  name: string;
  description: string;
  image: string;
  phoneNumber: string;
  address: string;
  city: City;
  municipality: Municipality;
  openTime: string;
  closeTime: string;
  restaurantStatus: RestaurantStatus;
  userId: number;
  menus: [
    {
      name: string;
      menuItems: MenuItem[];
    }
  ];
  tables: Table[];
}

export interface MenuItem {
  name: string;
  price: number;
  image: string;
  category: MenuItemCategory;
}

export interface Table {
  capacity: number;
}
