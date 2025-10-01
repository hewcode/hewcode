import { Link } from '@inertiajs/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import clsx from 'clsx';
import { Button } from '../ui/button.jsx';
import useTranslator from '../../hooks/useTranslator.js';

const Pagination = ({ currentPage = 1, totalPages = 1, totalItems = 0, itemsPerPage = 20, onPageChange, showPagination = true }) => {
  const { __ } = useTranslator();

  if (!showPagination) return null;

  // unnecessary pagination if there's only one page
  if (totalPages <= 1) return null;

  // current URL + page=X
  const pageUrl = (page) => {
    const url = new URL(window.location.href);
    url.searchParams.set('page', page);

    return url.toString();
  };


  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="p-6 flex items-center justify-between">
      <div className="space-x-2 flex items-center">
        <Link
          href={pageUrl(currentPage - 1)}
          className={clsx(
            'px-3 py-1.5 text-sm font-medium text-gray-500 bg-white border-gray-300 rounded-lg hover:bg-gray-50 flex items-center border disabled:cursor-not-allowed disabled:opacity-50',
            {
              'cursor-not-allowed opacity-50': currentPage === 1,
            },
          )}
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          {__('hewcode.common.previous')}
        </Link>

        <div className="space-x-1 flex items-center">
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            let pageNum;
            if (totalPages <= 5) {
              pageNum = i + 1;
            } else if (currentPage <= 3) {
              pageNum = i + 1;
            } else if (currentPage >= totalPages - 2) {
              pageNum = totalPages - 4 + i;
            } else {
              pageNum = currentPage - 2 + i;
            }

            return (
              <Link
                key={pageNum}
                href={pageUrl(pageNum)}
                className={clsx('px-3 py-1.5 text-sm font-medium rounded-lg rounded-lg flex items-center border', {
                  'bg-black border-black text-white': pageNum === currentPage,
                  'bg-white border-gray-300 text-gray-700 hover:bg-gray-50': pageNum !== currentPage,
                })}
              >
                {pageNum}
              </Link>
            );
          })}
          {totalPages > 5 && currentPage < totalPages - 2 && (
            <>
              <span className="px-2 text-gray-500">...</span>
              <Link
                href={pageUrl(totalPages)}
                className="px-3 py-1.5 text-sm font-medium rounded-lg text-gray-700 hover:bg-gray-50 bg-white border-gray-300 rounded-lg hover:bg-gray-50 flex items-center border"
              >
                {totalPages}
              </Link>
            </>
          )}
        </div>

        <Link
          href={pageUrl(currentPage + 1)}
          className={clsx(
            'px-3 py-1.5 text-sm font-medium text-gray-500 bg-white border-gray-300 rounded-lg hover:bg-gray-50 flex items-center border disabled:cursor-not-allowed disabled:opacity-50',
            {
              'cursor-not-allowed opacity-50': currentPage === totalPages,
            },
          )}
        >
          {__('hewcode.common.next')}
          <ChevronRight className="h-4 w-4 ml-1" />
        </Link>
      </div>

      <div className="text-sm text-gray-700">
        {__('hewcode.common.showing_x_to_y_of_z_results', {
          from: startItem,
          to: endItem,
          total: totalItems,
        })}
      </div>
    </div>
  );
};

export default Pagination;
