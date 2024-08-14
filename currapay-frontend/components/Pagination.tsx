import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { useMemo } from "react";
import classnames from "classnames";

const DOTS = "...";
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

    // Pages count is determined as siblingCount + firstPage + lastPage + currentPage + 2*DOTS
    const totalPageNumbers = 1 + 5;

    /*
      Case 1:
      If the number of pages is less than the page numbers we want to show in our
      paginationComponent, we return the range [1..totalPageCount]
    */
    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount);
    }

    /*
      Calculate left and right sibling index and make sure they are within range 1 and totalPageCount
    */
    const leftSiblingIndex = Math.max(currentPage - 1, 1);
    const rightSiblingIndex = Math.min(
      currentPage + 1,
      totalPageCount
    );

    /*
      We do not show dots just when there is just one page number to be inserted between the extremes of sibling and the page limits i.e 1 and totalPageCount. Hence we are using leftSiblingIndex > 2 and rightSiblingIndex < totalPageCount - 2
    */
    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots =
      rightSiblingIndex < totalPageCount - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;

    /*
      Case 2: No left dots to show, but rights dots to be shown
    */
    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftItemCount = 5;
      let leftRange = range(1, leftItemCount);

      return [...leftRange, DOTS, totalPageCount];
    }

    /*
      Case 3: No right dots to show, but left dots to be shown
    */
    if (shouldShowLeftDots && !shouldShowRightDots) {
      let rightItemCount = 5;
      let rightRange = range(
        totalPageCount - rightItemCount + 1,
        totalPageCount
      );
      return [firstPageIndex, DOTS, ...rightRange];
    }

    /*
      Case 4: Both left and right dots to be shown
    */
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

interface PaginationProps {
  onPageChange: any;
  totalCount: number;
  pageSize: number;
  currentPage: number;
  className: string;
}
export const Pagination = (props: PaginationProps) => {
  const paginationRange = usePagination(
    props.totalCount,
    props.pageSize,
    props.currentPage
  );

  // If there are less than 2 times in pagination range we will not render the component
  if (
    props.currentPage === 0 ||
    !paginationRange ||
    paginationRange.length < 2
  ) {
    return null;
  }

  const onNext = () => {
    props.onPageChange(props.currentPage + 1);
  };

  const onPrevious = () => {
    props.onPageChange(props.currentPage - 1);
  };

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
          return <li className="pagination-item dots">&#8230;</li>;
        }

        return (
          <li
            className={classnames("pagination-item", {
              selected: pageNumber === props.currentPage,
            })}
            onClick={() => props.onPageChange(pageNumber)}
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
