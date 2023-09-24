export const ENDPOINTS = {
  register_user: {
    uri: '/users/register',
    method: 'POST',
  },
  login_user: {
    uri: '/users/login',
    method: 'POST',
  },
  get_user_info: {
    uri: '/users/information',
    method: 'GET',
  },
  get_restaurants: {
    uri: '/restaurants',
    method: 'GET',
  },
  create_restaurant: {
    uri: '/restaurants',
    method: 'POST',
  },
  get_restaurant: {
    uri: '/restaurants/{id}',
    method: 'GET',
  },
  update_user_role: {
    uri: '/users/update-role',
    method: 'PATCH',
  },

  get_user_reservations: {
    uri: '/reservations/user',
    method: 'GET',
  },
  get_restaurant_reservations: {
    uri: '/reservations/restaurant',
    method: 'GET',
  },
  update_user: {
    uri: '/users/{id}',
    method: 'PUT',
  },
  get_owned_restaurants: {
    uri: '/restaurants/owned-restaurants',
    method: 'GET',
  },
  get_popular_restaurants: {
    uri: '/restaurants/popular',
    method: 'GET',
  },
  get_searched_restaurants: {
    uri: '/restaurants/search',
    method: 'GET',
  },
  get_next_reservation: {
    uri: '/reservations/next',
    method: 'GET',
  },
  post_reservation: {
    uri: '/reservations',
    method: 'POST',
  },
  cancel_reservation: {
    uri: '/reservations/status',
    method: 'PATCH',
  },
  get_reservation_details: {
    uri: '/reservations/{id}',
    method: 'GET',
  },
  edit_restaurant: {
    uri: '/restaurants/{id}',
    method: 'PUT',
  },
  delete_restaurant: {
    uri: '/restaurants/owner',
    method: 'DELETE',
  },
};

export type ApiEndpoint = keyof typeof ENDPOINTS;
