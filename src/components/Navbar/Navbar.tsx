import { useEffect, useState } from 'react';
import logoWithText from '../svg/logoWithText.svg';
import { useDispatch, useSelector } from 'react-redux';
import { UserState, logoutUser } from '../../features/auth/userSlice';
import { RootState } from '../../store';
import { Outlet, useNavigate } from 'react-router-dom';
import logoWithText2 from '../svg/logoOnlyText2.svg';
import logoWithoutText from '../svg/logoWithoutText.svg';
import comingSoon from '../../assets/images/coming-soon.png';
import reservationAsset from '../../assets/images/reservation.svg';
import DropDown from './Dropdown';
import { UserRole } from '../../enums/UserRole';

const Navbar = () => {
  const [sidebarStatus, setSidebarStatus] = useState<boolean>(
    window.innerWidth > 640
  );
  const [smallScreen, setSmallScreen] = useState<boolean>(false);
  const [logoutModal, setLogoutModal] = useState(false);
  const loggedUser: UserState = useSelector((state: RootState) => state.auth);
  const [restaurantDropdown, setRestaurantDropdown] = useState(false);
  const allowedRoles = [
    UserRole.RegularRestaurantOwner,
    UserRole.PremiumRestaurantOwner,
    UserRole.UltimateRestaurantOwner,
    UserRole.Admin,
  ];

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleResize = () => {
    if (window.innerWidth < 640) {
      setSmallScreen(true);
      setSidebarStatus(false);
    } else {
      setSmallScreen(false);
      setSidebarStatus(true);
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleLogOutModal = () => {
    setLogoutModal((status) => !status);
  };

  const handleLogOut = () => {
    navigate('/login');
    dispatch(logoutUser());
  };

  const navigateTo = (page: string) => {
    navigate('/' + page);
    if (smallScreen) setSidebarStatus(false);
  };

  return (
    <>
      {sidebarStatus && smallScreen && (
        <div
          className="bg-black h-full w-full z-[60] fixed opacity-50"
          onClick={() => setSidebarStatus((status) => !status)}
        ></div>
      )}

      <div className="flex justify-between items-center sm:hidden h-[70px] shadow-md">
        <button
          data-drawer-target="separator-sidebar"
          data-drawer-toggle="separator-sidebar"
          aria-controls="separator-sidebar"
          type="button"
          onClick={() => setSidebarStatus((status) => !status)}
          className="inline-flex items-center p-2  ml-3 text-sm text-gray-500 rounded-lg  hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        >
          <span className="sr-only">Open sidebar</span>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clipRule="evenodd"
              fillRule="evenodd"
              d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
            ></path>
          </svg>
        </button>

        <div className="flex items-center">
          <img
            src={logoWithoutText}
            className="w-10 h-12 pt-1 rounded-full mr-1"
            alt="LOGOONY TEXT"
            style={{ marginLeft: 0 }}
            onClick={() => navigateTo('dashboard')}
          />
          <img
            src={logoWithText2}
            alt="LOGOONY TEXT"
            style={{ marginLeft: 0 }}
            onClick={() => navigateTo('dashboard')}
          />
        </div>
        {loggedUser.user.image !== null ? (
          <img
            src={loggedUser.user.image}
            alt=""
            onClick={() => handleLogOutModal()}
            className="mr-4 border-[1px] rounded-lg h-10 w-10 cursor-pointer ml-6 md:shadow-sm z-[51] object-cover"
          />
        ) : (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => handleLogOutModal()}
            className="mr-4 bg-white border-[1px] rounded-lg h-10 w-10 cursor-pointer ml-6 md:shadow-sm z-[51]"
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
                d="M6 8C6 4.68629 8.68629 2 12 2C15.3137 2 18 4.68629 18 8C18 11.3137 15.3137 14 12 14C8.68629 14 6 11.3137 6 8Z"
                fill="#00cc9c"
              ></path>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.43094 16.9025C7.05587 16.2213 9.2233 16 12 16C14.771 16 16.9351 16.2204 18.5586 16.8981C20.3012 17.6255 21.3708 18.8613 21.941 20.6587C22.1528 21.3267 21.6518 22 20.9592 22H3.03459C2.34482 22 1.84679 21.3297 2.0569 20.6654C2.62537 18.8681 3.69119 17.6318 5.43094 16.9025Z"
                fill="#00cc9c"
              ></path>
            </g>
          </svg>
        )}

        <DropDown
          handleLogOutModal={handleLogOutModal}
          logoutModal={logoutModal}
        />
      </div>

      <aside
        id="separator-sidebar"
        className={`fixed top-0 left-0 z-[70] w-64 h-screen transition-transform shadow-md ${
          !sidebarStatus ? '-translate-x-full' : '-translate-x-0 '
        } `}
      >
        <div className="h-full px-3 py-3 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <img
            src={logoWithText}
            className={
              smallScreen ? 'w-24 mx-auto mb-6 mt-2' : 'w-32 mx-auto mb-8 mt-2'
            }
            alt="logo"
          />
          <ul className="space-y-2 font-medium">
            <li
              onClick={() => navigateTo('dashboard')}
              className="hover:cursor-pointer"
            >
              <div className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                <svg
                  aria-hidden="true"
                  className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                  <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                </svg>
                <span className="ml-3">Dashboard</span>
              </div>
            </li>
            <li
              onClick={() => navigateTo('my-reservations')}
              className="hover:cursor-pointer"
            >
              <div className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                <svg
                  aria-hidden="true"
                  className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
                </svg>
                <span className="flex-1 ml-3 whitespace-nowrap">
                  My reservations
                </span>
              </div>
            </li>

            {allowedRoles.includes(loggedUser.user.userRole!) && (
              <li className="hover:cursor-pointer">
                <div
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => setRestaurantDropdown((status) => !status)}
                >
                  <svg
                    aria-hidden="true"
                    className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"></path>
                  </svg>
                  <span className="flex-1 ml-3 whitespace-nowrap">
                    Restaurant
                  </span>
                </div>

                {restaurantDropdown && (
                  <div>
                    <div
                      className="ml-3"
                      onClick={() => navigateTo('create-restaurant')}
                    >
                      <div className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                        <svg
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                          className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                          ></path>
                        </svg>
                        <span className="flex-1 ml-2 whitespace-nowrap">
                          Add restaurant
                        </span>
                      </div>
                    </div>
                    <div
                      className="ml-3"
                      onClick={() => navigateTo('edit-restaurant')}
                    >
                      <div className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                        <svg
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                          className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
                          ></path>
                        </svg>
                        <span className="flex-1 ml-2 whitespace-nowrap">
                          Edit restaurant
                        </span>
                      </div>
                    </div>
                    <div
                      className="ml-3"
                      // onClick={() => navigateTo('discounts')}
                    >
                      <div className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                        <svg
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                          className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
                          ></path>
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          ></path>
                        </svg>
                        <span className="flex-1 ml-2 whitespace-nowrap">
                          Manage discounts
                        </span>

                        <img
                          src={comingSoon}
                          className="h-[50px] rotate-12 absolute right-0 mr-8"
                          alt=""
                        />
                      </div>
                    </div>
                    <div
                      className="ml-3"
                      onClick={() => navigateTo('reservations')}
                    >
                      <div className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                        <img
                          className="flex-shrink-0 w-6 h-6 opacity-50"
                          src={reservationAsset}
                          alt=""
                        />

                        <span className="flex-1 ml-2 whitespace-nowrap">
                          View reservations
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </li>
            )}

            <li onClick={handleLogOut} className="hover:cursor-pointer">
              <div className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                <svg
                  aria-hidden="true"
                  className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="flex-1 ml-3 whitespace-nowrap">Log out</span>
              </div>
            </li>
          </ul>
          <ul className="pt-4 mt-4 space-y-2 font-medium border-t border-gray-200 dark:border-gray-700">
            <li
              onClick={() => navigateTo('subscription')}
              className="hover:cursor-pointer"
            >
              <div className="flex items-center p-2 text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group">
                <svg
                  aria-hidden="true"
                  className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:group-hover:text-white dark:text-gray-400"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="gem"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="M378.7 32H133.3L256 182.7L378.7 32zM512 192l-107.4-141.3L289.6 192H512zM107.4 50.67L0 192h222.4L107.4 50.67zM244.3 474.9C247.3 478.2 251.6 480 256 480s8.653-1.828 11.67-5.062L510.6 224H1.365L244.3 474.9z"
                  ></path>
                </svg>
                <span className="ml-4">Subscription</span>
              </div>
            </li>
          </ul>
        </div>
      </aside>

      <div className=" sm:p-4 sm:pt-0 sm:pr-0 pt-0 pb-4 lg:p-0 sm:ml-64">
        <Outlet />
      </div>
    </>
  );
};

export default Navbar;
