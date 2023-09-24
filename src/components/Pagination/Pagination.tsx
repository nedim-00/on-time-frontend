import LeftArrowIcon from '../svg/components/LeftArrowIcon';
import RightArrowIcon from '../svg/components/RightArrowIcon';

interface PaginationProps {
  decreasePageNumber: () => void;
  increasePageNumber: () => void;
  previousPage: boolean;
  nextPage: boolean;
  justify: string;
}

const Pagination = ({
  decreasePageNumber,
  increasePageNumber,
  previousPage,
  nextPage,
  justify,
}: PaginationProps) => {
  return (
    <div className={`flex justify-${justify} mt-5`}>
      <div
        onClick={decreasePageNumber}
        className="border-[		#D0D0D0] border-[2px]  bg-white border-r-[0px] rounded-l-xl flex justify-center items-center cursor-pointer h-10"
      >
        <LeftArrowIcon
          height={8}
          weight={8}
          color={`${previousPage ? '#4b5563' : '#E0E0E0'}`}
        />
        <span
          className={`${
            previousPage ? 'text-gray-600 font-medium' : 'text-[#E0E0E0] hidden'
          } mr-4`}
        >
          PREVIOUS
        </span>
      </div>
      <div
        onClick={increasePageNumber}
        className="border-[	#D0D0D0] border-[2px] bg-white  rounded-r-xl  flex justify-center items-center cursor-pointer h-10"
      >
        <span
          className={`${
            nextPage ? 'text-gray-600 font-medium' : 'text-[#E0E0E0] hidden'
          } ml-4`}
        >
          NEXT
        </span>
        <RightArrowIcon
          height={8}
          weight={8}
          color={`${nextPage ? '#4b5563' : '#E0E0E0'}`}
        />
      </div>
    </div>
  );
};

export default Pagination;
