import { useNavigate } from 'react-router-dom';
import tick from '../../assets/images/tick.svg';
import { UserState } from '../../features/auth/userSlice';
import { RootState } from '../../store';
import { useSelector } from 'react-redux';
import enumKeys from '../../helpers/key-list';
import { UserRole } from '../../enums/UserRole';

const Subscription = () => {
  const navigate = useNavigate();
  const loggedUser: UserState = useSelector((state: RootState) => state.auth);

  return (
    <>
      {loggedUser.user.userRole === UserRole.RegularRestaurantOwner ? (
        <div className="mt-8 mx-4">
          <h2 className="font-medium text-2xl ">Subscription</h2>
          <h3 className="mt-4">
            <b>{enumKeys(UserRole)[loggedUser.user.userRole - 1]}</b>{' '}
            subscription is active!
          </h3>
        </div>
      ) : (
        <div>
          <div className="mt-8 mx-6">
            <div className="mb-4 md:mb-6 my-8">
              <h2 className="text-2xl">Subscription</h2>
              <p className=" md:block text-sm text-gray-500">
                To register your restaurants, please complete the payment
                process.
              </p>
            </div>

            <div className="bg-white mt-8 rounded-lg sm:max-w-[500px] sm:mr-4 ">
              <div className="pt-7 pl-3 flex items-center h-[50px] relative">
                <span className="absolute top-5 font-normal text-lg text-[#9D9D9D]">
                  $
                </span>
                <span className="text-3xl font-semibold left-2px ml-4 pr-1">
                  150
                </span>
                <span className="font-normal text-lg text-[#9D9D9D]">
                  /month
                </span>
              </div>
              <div className="mt-4 ml-5">
                <h3 className="flex mb-2">
                  <img src={tick} alt="" className="mr-2 " />1 resturant
                </h3>
                <h3 className="flex mb-2">
                  <img src={tick} alt="" className="mr-2 " /> Unlimited support
                </h3>
                <h3 className="flex pb-6">
                  <img src={tick} alt="" className="mr-2 " /> 5 staff members
                  per restaurant
                </h3>
              </div>
            </div>

            <button
              className="mt-9 bg-[#157635] w-full sm:w-80 rounded-lg text-white h-12 text-lg hover:cursor-pointer"
              onClick={() => navigate('/subscription/payment')}
            >
              Proceed to payment
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Subscription;
