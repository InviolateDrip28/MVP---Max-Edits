import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { useMemo } from "react";
import classnames from "classnames";

const DOTS = "...";
// siblingCount = number of options that show up next to the current page when there are dots
// don't forsee this changing but if it does, add it as a prop and adjust the math.
const siblingCount = 1; 
const range = (start: number, end: number) => {
  let length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};

const usePagination = (
  totalCount: number,
  pageSize: number,
  currentPage: number
) => {
  const paginationRange = useMemo(() => {
    const totalPageCount = Math.ceil(totalCount / pageSize);

    //Pages count is determined as siblingCount + firstPage + lastPage + currentPage + 2*DOTS
    const totalPageNumbers = siblingCount + pageSize;

    //Number of pages is less than the page numbers we want to show, we return range [1..totalPageCount]
    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount);
    }
    
    //Calculate left and right sibling index and make sure they are within 1 and totalPageCount
    const leftSiblingIndex = Math.max(currentPage - 1, 1);
    const rightSiblingIndex = Math.min(
      currentPage + 1,
      totalPageCount
    );

    //Calculate if we should show dots
    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots =
      rightSiblingIndex < totalPageCount - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;

    //Case 2: No left dots, but show rights dots
    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftItemCount = pageSize;
      let leftRange = range(1, leftItemCount);

      return [...leftRange, DOTS, totalPageCount];
    }

    //Case 3: No right dots, but show left dots
    if (shouldShowLeftDots && !shouldShowRightDots) {
      let rightItemCount = pageSize;
      let rightRange = range(
        totalPageCount - rightItemCount + 1,
        totalPageCount
      );
      return [firstPageIndex, DOTS, ...rightRange];
    }

    //Case 4: Show both left and right dots
    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [
        firstPageIndex,
        DOTS,
        ...middleRange,
        DOTS,
        lastPageIndex,
      ];
    }
  }, [totalCount, pageSize, currentPage]);

  return paginationRange;
};

/** Reusable pagination page component */
interface PaginationProps {
  onPageChange: any;
  totalCount: number;
  pageSize: number;
  currentPage: number;
  className?: string;
}
export const Pagination = (props: PaginationProps) => {
  const paginationRange = usePagination(
    props.totalCount,
    props.pageSize,
    props.currentPage
  );

  //If there are less than 2 items we will not render the component
  if (
    props.currentPage === 0 ||
    !paginationRange ||
    paginationRange.length < 2
  ) {
    return null;
  }

  const onNext = () => {
    props.onPageChange(props.currentPage + 1);
    window.scrollTo(0, 0)
  };

  const onPrevious = () => {
    props.onPageChange(props.currentPage - 1);
    window.scrollTo(0, 0)
  };

  const onPageChange = (pageNumber: string | number) => {
    props.onPageChange(pageNumber), window.scrollTo(0, 0)
  }

  let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <ul className={`pagination-container ${props.className}`}>
      <button
        className={"px-8 disabled:cursor-default"}
        disabled={props.currentPage === 1}
        onClick={onPrevious}
      >
        <ChevronLeftIcon className="h-5 w-5 stroke-2" />
      </button>
      {paginationRange.map((pageNumber) => {
        if (pageNumber === DOTS) {
          return <li key={pageNumber} className="pagination-item dots">&#8230;</li>;
        }

        return (
          <li
            className={classnames("pagination-item", {
              selected: pageNumber === props.currentPage,
            })}
            onClick={() => onPageChange(pageNumber)}
            key={pageNumber}
          >
            {pageNumber}
          </li>
        );
      })}
      <button
        className="px-8 hover:text-accent disabled:cursor-default disabled:hover:text-primary"
        disabled={props.currentPage === lastPage}
        onClick={onNext}
      >
        <ChevronRightIcon className="h-5 w-5 stroke-2" />
      </button>
    </ul>
  );
};
