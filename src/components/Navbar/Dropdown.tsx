import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { UserState, logoutUser } from '../../features/auth/userSlice';
import { useNavigate } from 'react-router-dom';

interface DropDownProp {
  logoutModal: boolean;
  handleLogOutModal: () => void;
}

const DropDown = ({ logoutModal, handleLogOutModal }: DropDownProp) => {
  const loggedUser: UserState = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogOut = () => {
    navigate('/login');
    dispatch(logoutUser());
  };

  return (
    <>
      {logoutModal && (
        <div className=" absolute  right-4 sm:right-4 mt-14 sm:top-3  md:right-6 md:top-6 z-50">
          <div className="w-0 h-0 border-x-[transparent] border-x-[10px] border-b-[15px] border-b-[#00cc9c] mr-3"></div>
          <div className="h-[310px] w-[250px] rounded-xl bg-white shadow-lg absolute right-0 overflow-clip">
            <div className="w-full h-full wave flex justify-center align-middle flex-col">
              <div className=" mb-2 bg-[#F3F3F3] w-12 h-12 self-center align-center rounded-full flex justify-center items-center hover:cursor-pointer">
                <div className=" bg-[#F3F3F3] w-[45px] h-[45px] rounded-full flex justify-center items-center">
                  <span className="text-[#157635] text-xl font-medium">
                    {loggedUser.user.firstName[0].concat(
                      loggedUser.user.lastName[0]
                    )}
                  </span>
                </div>
              </div>

              <h2 className="text-center text-white">
                {loggedUser.user.firstName} {loggedUser.user.lastName}
              </h2>

              <span className="text-center text-xs text-white">
                {loggedUser.user.email}
              </span>
            </div>

            <div className="mt-12 absolute px-8 w-full ">
              <div
                className="flex items-center gap-4 cursor-pointer justify-between w-full"
                onClick={() => {
                  handleLogOutModal();
                  navigate('/profile');
                }}
              >
                <div className="flex items-center">
                  <svg
                    viewBox="0 0 20 20"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#000000"
                    className="h-4 w-4 mr-4"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <g
                        id="Page-1"
                        stroke="none"
                        strokeWidth="1"
                        fill="none"
                        fillRule="evenodd"
                      >
                        <g
                          id="Dribbble-Light-Preview"
                          transform="translate(-180.000000, -2159.000000)"
                          fill="#000000"
                        >
                          <g
                            id="icons"
                            transform="translate(56.000000, 160.000000)"
                          >
                            <path
                              d="M134,2008.99998 C131.783496,2008.99998 129.980955,2007.20598 129.980955,2004.99998 C129.980955,2002.79398 131.783496,2000.99998 134,2000.99998 C136.216504,2000.99998 138.019045,2002.79398 138.019045,2004.99998 C138.019045,2007.20598 136.216504,2008.99998 134,2008.99998 M137.775893,2009.67298 C139.370449,2008.39598 140.299854,2006.33098 139.958235,2004.06998 C139.561354,2001.44698 137.368965,1999.34798 134.722423,1999.04198 C131.070116,1998.61898 127.971432,2001.44898 127.971432,2004.99998 C127.971432,2006.88998 128.851603,2008.57398 130.224107,2009.67298 C126.852128,2010.93398 124.390463,2013.89498 124.004634,2017.89098 C123.948368,2018.48198 124.411563,2018.99998 125.008391,2018.99998 C125.519814,2018.99998 125.955881,2018.61598 126.001095,2018.10898 C126.404004,2013.64598 129.837274,2010.99998 134,2010.99998 C138.162726,2010.99998 141.595996,2013.64598 141.998905,2018.10898 C142.044119,2018.61598 142.480186,2018.99998 142.991609,2018.99998 C143.588437,2018.99998 144.051632,2018.48198 143.995366,2017.89098 C143.609537,2013.89498 141.147872,2010.93398 137.775893,2009.67298"
                              id="profile-[#1341]"
                            ></path>
                          </g>
                        </g>
                      </g>
                    </g>
                  </svg>
                  <div>Profile</div>
                </div>

                <div>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 rotate-[-90deg] ml-[5px]"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <path
                        d="M5.70711 9.71069C5.31658 10.1012 5.31658 10.7344 5.70711 11.1249L10.5993 16.0123C11.3805 16.7927 12.6463 16.7924 13.4271 16.0117L18.3174 11.1213C18.708 10.7308 18.708 10.0976 18.3174 9.70708C17.9269 9.31655 17.2937 9.31655 16.9032 9.70708L12.7176 13.8927C12.3271 14.2833 11.6939 14.2832 11.3034 13.8927L7.12132 9.71069C6.7308 9.32016 6.09763 9.32016 5.70711 9.71069Z"
                        fill="#0F0F0F"
                      ></path>
                    </g>
                  </svg>
                </div>
              </div>

              <div
                className="flex items-center gap-4 cursor-pointer justify-between w-full mt-4"
                onClick={() => handleLogOut()}
              >
                <div className="flex items-center">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 mr-3"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M2 6.5C2 4.01472 4.01472 2 6.5 2H12C14.2091 2 16 3.79086 16 6V7C16 7.55228 15.5523 8 15 8C14.4477 8 14 7.55228 14 7V6C14 4.89543 13.1046 4 12 4H6.5C5.11929 4 4 5.11929 4 6.5V17.5C4 18.8807 5.11929 20 6.5 20H12C13.1046 20 14 19.1046 14 18V17C14 16.4477 14.4477 16 15 16C15.5523 16 16 16.4477 16 17V18C16 20.2091 14.2091 22 12 22H6.5C4.01472 22 2 19.9853 2 17.5V6.5ZM18.2929 8.29289C18.6834 7.90237 19.3166 7.90237 19.7071 8.29289L22.7071 11.2929C23.0976 11.6834 23.0976 12.3166 22.7071 12.7071L19.7071 15.7071C19.3166 16.0976 18.6834 16.0976 18.2929 15.7071C17.9024 15.3166 17.9024 14.6834 18.2929 14.2929L19.5858 13L11 13C10.4477 13 10 12.5523 10 12C10 11.4477 10.4477 11 11 11L19.5858 11L18.2929 9.70711C17.9024 9.31658 17.9024 8.68342 18.2929 8.29289Z"
                        fill="#0F1729"
                      ></path>
                    </g>
                  </svg>
                  <div>Logout</div>
                </div>

                <div>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 rotate-[-90deg] ml-[5px]"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <path
                        d="M5.70711 9.71069C5.31658 10.1012 5.31658 10.7344 5.70711 11.1249L10.5993 16.0123C11.3805 16.7927 12.6463 16.7924 13.4271 16.0117L18.3174 11.1213C18.708 10.7308 18.708 10.0976 18.3174 9.70708C17.9269 9.31655 17.2937 9.31655 16.9032 9.70708L12.7176 13.8927C12.3271 14.2833 11.6939 14.2832 11.3034 13.8927L7.12132 9.71069C6.7308 9.32016 6.09763 9.32016 5.70711 9.71069Z"
                        fill="#0F0F0F"
                      ></path>
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DropDown;
