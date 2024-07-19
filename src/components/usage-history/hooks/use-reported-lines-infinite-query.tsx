import LinesAPI from "@/api/lines";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useReportedLinesInfiniteQuery = () => {
  return useInfiniteQuery({
    queryKey: ["lines-reported"],
    queryFn: async ({ pageParam }) => {
      const axiosResponse = await LinesAPI.getReported({ page: pageParam });
      return axiosResponse.data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      if (lastPage.data?.length === 0) return undefined;
      return lastPageParam + 1;
    },
    getPreviousPageParam: (firstPage, allPages, firstPageParam) => {
      if (firstPageParam <= 1) {
        return undefined;
      }
      return firstPageParam - 1;
    },
  });
};
