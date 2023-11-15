import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getBookings } from '../../services/apiBookings.js';
import { useSearchParams } from 'react-router-dom';
import { PAGE_SIZE } from '../../utils/constants.js';

function useBookings() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  // 1) FILTER
  // 1a) Get filter value from urlParams
  const filterValue = searchParams.get('status');
  // 2b) if filter is all, return nothing, if different, return a new object with a dynamic value
  const filter =
    !filterValue || filterValue === 'all' ? null : { field: 'status', value: filterValue };
  // { field: 'totalPrice', value: 5000, method: 'gte' };

  // 2) SORT
  // 2a) Get sort value from urlParams
  const sortByRaw = searchParams.get('sortBy') || 'startDate-desc';
  // 2b) if sortBy is empty | not defined, return nothing, if different, return a new object with a dynamic value
  // const sortByValues =
  //   sortBy === 'startDate-desc' ? null : { field: 'sortBy', value: sortByValues };
  const [field, direction] = sortByRaw.split('-');
  const sortBy = { field, direction };

  // 3) PAGINATION
  const page = !searchParams.get('page') ? 1 : Number(searchParams.get('page'));

  // QUERY
  const {
    isLoading,
    data: { data: bookings, count } = {},
    error,
  } = useQuery({
    queryKey: ['bookings', filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
  });

  // PRE_FETCHING
  const pageCount = Math.ceil(count / PAGE_SIZE);

  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ['bookings', filter, sortBy, page + 1],
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ['bookings', filter, sortBy, page - 1],
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
    });

  return { isLoading, error, bookings, count };
}

export default useBookings;
