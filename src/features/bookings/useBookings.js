import { useQuery } from '@tanstack/react-query';
import { getBookings } from '../../services/apiBookings.js';
import { useSearchParams } from 'react-router-dom';

function useBookings() {
  const [searchParams] = useSearchParams();

  // 1) FILTER
  // 1a) Get filter value from urlParams
  const filterValue = searchParams.get('status');
  // 2b) if filter is all, return nothing, if different, return a new object with a dynamic value
  const filter =
    !filterValue || filterValue === 'all' ? null : { field: 'status', value: filterValue };
  // { field: 'totalPrice', value: 5000, method: 'gte' };

  // 2) FILTER
  // 2a) Get sort value from urlParams
  const sortByRaw = searchParams.get('sortBy') || 'startDate-desc';
  // 2b) if sortBy is empty | not defined, return nothing, if different, return a new object with a dynamic value
  // const sortByValues =
  //   sortBy === 'startDate-desc' ? null : { field: 'sortBy', value: sortByValues };
  const [field, direction] = sortByRaw.split('-');
  const sortBy = { field, direction };

  const {
    isLoading,
    data: bookings,
    error,
  } = useQuery({
    queryKey: ['bookings', filter, sortBy],
    queryFn: () => getBookings({ filter, sortBy }),
  });
  return { isLoading, error, bookings };
}

export default useBookings;
