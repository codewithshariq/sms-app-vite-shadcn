import LinesAPI from "@/api/lines";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useLinesInfiniteQuery = () => {
  return useInfiniteQuery({
    queryKey: ["lines"],
    queryFn: async ({ pageParam }) => {
      const axiosResponse = await LinesAPI.get({ page: pageParam });
      console.log("axiosResponse", axiosResponse);
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
