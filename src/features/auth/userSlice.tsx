import { createSlice } from '@reduxjs/toolkit';
import TOKEN from '../../helpers/api/token';
import { UserResponse } from '../../interfaces/IUser';
import { format } from 'date-fns';

export interface UserState {
  user: UserResponse;
}

const initialState: UserState = {
  user: {
    id: -1,
    firstName: '',
    lastName: '',
    email: '',
    image: '',
    phoneNumber: '',
    userRole: null,
    userStatus: null,
    dateJoined: format(new Date(), 'dd-MM-yyyy'),
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logoutUser: () => {
      TOKEN.remove();
      return initialState;
    },
  },
});

export const { logoutUser, setUser } = userSlice.actions;

export default userSlice.reducer;
