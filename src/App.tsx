import Login from './pages/Login/Login';
import './App.css';
import Dashboard from './pages/Dashboard/Dashboard';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import TOKEN from './helpers/api/token';
import RestaurantInformation from './pages/RestaurantInformation/RestaurantInformation';
import Register from './pages/Register/Register';
import { useDispatch } from 'react-redux';
import { useQuery } from 'react-query';
import { setUser } from './features/auth/userSlice';
import api from './helpers/api/api.factory';
import CreateRestaurant from './pages/CreateRestaurant/CreateRestaurant';
import Navbar from './components/Navbar/Navbar';
import Subscription from './pages/Subscription/Subscription';
import Payment from './pages/Payment/Payment';
import RestaurantsCard from './components/Restaurant/ChooseRestaurant';
import ReservationDetails from './pages/ReservationDetails/ReservationDetails';
import EditRestaurant from './pages/EditRestaurant/EditRestaurant';
import { UserResponse } from './interfaces/IUser';
import Profile from './pages/UserProfile/Profile';
import RestaurantReservations from './pages/RestaurantReservations/RestaurantReservations';
import UserReservations from './pages/UserReservations/UserReservations';
import { ApiResponse } from './interfaces/IApiResponse';

function App() {
  const [loggedUser, setLoggedUser] = useState<UserResponse>();

  const dispatch = useDispatch();

  const { refetch } = useQuery(
    ['get_user_info'],

    () => api.fetch('get_user_info'),
    {
      onSuccess: (response: ApiResponse<UserResponse>) => {
        dispatch(setUser(response.data));
        setLoggedUser(response.data);
      },
      onError: (err) => {},
    }
  );

  const redirectUserToLogin = () => {
    const path = window.location.pathname;
    if (!loggedUser && !TOKEN.get()) {
      if (path !== '/register' && path !== '/login') {
        window.location.pathname = '/login';
        if (path !== '/register' && path !== '/login') {
          window.location.pathname = '/login';
        }
      }
    }
  };

  return (
    <div className="App">
      <Router>
        <Routes>
          <>
            {loggedUser && (
              <Route element={<Navbar />}>
                <>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route
                    path="/dashboard/restaurant/:id"
                    element={<RestaurantInformation />}
                  />
                  <Route
                    path="/create-restaurant"
                    element={<CreateRestaurant />}
                  />
                  <Route
                    path="/discounts"
                    element={<RestaurantsCard pageType="Edit discounts" />}
                  />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/discounts/:id" />

                  <Route
                    path="/edit-restaurant"
                    element={<RestaurantsCard pageType="Edit restaurant" />}
                  />

                  <Route
                    path="/reservations"
                    element={<RestaurantsCard pageType="View reservations" />}
                  />

                  <Route
                    path="/reservations/:id"
                    element={<RestaurantReservations />}
                  />

                  <Route
                    path="/edit-restaurant/:id"
                    element={<EditRestaurant />}
                  />
                  <Route path="/subscription" element={<Subscription />} />
                  <Route
                    path="/my-reservations"
                    element={<UserReservations />}
                  />
                  <Route
                    path="/my-reservations/:id"
                    element={<ReservationDetails />}
                  />
                  <Route path="/subscription/payment" element={<Payment />} />
                </>
              </Route>
            )}
            <Route path="/register" element={<Register refetch={refetch} />} />
            <Route path="/login" element={<Login refetch={refetch} />} />
            <Route path="/" element={<Login refetch={refetch} />} />

            {redirectUserToLogin()}
          </>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
