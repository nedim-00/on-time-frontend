import { useState } from 'react';
import { UserState } from '../../features/auth/userSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

interface SearchInputProp {
  handleSearch: (query: string) => void;
  handleLogOutModal: () => void;
}

const SearchInput = ({ handleLogOutModal, handleSearch }: SearchInputProp) => {
  const loggedUser: UserState = useSelector((state: RootState) => state.auth);
  const [search, setSearch] = useState('');

  let searchTimeout: any;
  const handleSearchQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);

    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      handleSearch(event.target.value);
    }, 500);
  };

  return (
    <>
      <div className="mt-4 md:mt-0 relative flex justify-between">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400 left-3"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          value={search}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleSearchQuery(e)
          }
          type="text"
          placeholder="Search"
          name="search"
          className="w-full sm:w-48 py-3 md:py-0 pl-12 pr-4 text-gray-500 border-[1px] border-solid border-gray-200 rounded-lg outline-none md:shadow-sm bg-white focus:bg-white focus:border-[#046C4E] focus:shadow-none focus:ring-[#046C4E]"
        />

        {loggedUser.user.image !== null ? (
          <img
            src={loggedUser.user.image}
            alt=""
            onClick={() => handleLogOutModal()}
            className="hidden sm:block bg-white border-[1px] rounded-lg mt-1 h-10 w-10 cursor-pointer ml-6 md:shadow-sm z-[51] object-cover "
          />
        ) : (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => handleLogOutModal()}
            className="hidden sm:block bg-white border-[1px] rounded-lg mt-1 h-10 w-10 cursor-pointer ml-6 md:shadow-sm z-[51]"
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
      </div>
      <hr className="h-px px-3 my-4 bg-gray-200 border-0 dark:bg-gray-700 md:hidden" />
    </>
  );
};

export default SearchInput;
