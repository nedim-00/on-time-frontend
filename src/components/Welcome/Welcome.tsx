import { useEffect } from 'react';
import { Divider } from '../Divider/Divider';
import { TwButton } from '../TwButton/TwButton';

interface WelcomeProp {
  modalOpen: boolean;
  modalState: (state: boolean) => void;
}

const Welcome = ({ modalOpen, modalState }: WelcomeProp) => {
  const showModal = () => {
    setTimeout(() => modalState(true), 2000);
  };

  useEffect(() => {
    showModal();

    return () => {
      showModal();
    };
  }, []);

  return (
    <>
      {modalOpen && (
        <div className="fixed bg-black/60 w-full h-full z-[20] flex justify-center items-center px-4">
          <div
            className="fixed w-full h-full"
            onClick={() => modalState(false)}
          ></div>
          <div className="bg-white py-4 px-6 rounded-lg max-w-[500px] z-[21]">
            <h1 className="text-2xl font-medium mb-2">Welcome to On Time</h1>
            <Divider />
            <p className="mt-4">
              This is a centralized restaurant reservation system where users
              can choose a restaurant from diverse selection to make a
              reservation.
            </p>

            <h2 className="text-xl mt-3 font-medium">📌 Instructions</h2>
            <p className="mt-2">
              You can create your own account and explore functionalities, but
              there is also a way to use premade accounts for user and
              restaurant owner, where the reservations are already created.
            </p>

            <div className="md:flex justify-between mb-4">
              <div>
                <h2 className="text-lg mt-3 font-medium">🧑 User Account</h2>
                <div className="mt-2">
                  <p>
                    Email:{' '}
                    <span className="bg-gray-200 py-1 px-3 rounded-lg text-sm">
                      user@user.com
                    </span>
                  </p>
                  <p className="mt-2">
                    Password:{' '}
                    <span className="bg-gray-200 py-1 px-3 rounded-lg text-sm ">
                      user9999
                    </span>
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-lg mt-3 font-medium">
                  💼 R. Owner Account
                </h2>
                <div className="mt-2">
                  <p>
                    Email:{' '}
                    <span className="bg-gray-200 py-1 px-3 rounded-lg text-sm">
                      r.owner@ontime.com
                    </span>
                  </p>
                  <p className="mt-2">
                    Password:{' '}
                    <span className="bg-gray-200 py-1 px-3 rounded-lg text-sm ">
                      owner999
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <Divider />

            <p className="text-sm mt-3">
              🚩 You can click on the{' '}
              <span className="bg-gray-200 py-1 px-2 rounded-md">💡</span> to
              see this modal again.
            </p>

            <div className="text-center ">
              <TwButton
                type="submit"
                variation="primary"
                className="w-full disabled:bg-stone-400 mt-4 md:w-40 md:h-10 "
                color="#147234"
                onClick={() => modalState(false)}
              >
                Close
              </TwButton>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Welcome;
