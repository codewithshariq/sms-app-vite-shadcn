import { useLocation } from "react-router-dom";
import HeaderNavLink from "./header-nav-link";
import { useQuery } from "@tanstack/react-query";
import LinesAPI from "@/api/lines";
import { useLinesInfiniteQuery } from "@/components/usage-history/hooks/use-lines-infinite-query";
import { useReportedLinesInfiniteQuery } from "@/components/usage-history/hooks/use-reported-lines-infinite-query";

function HeaderNavLinks() {
  return (
    <nav className="h-full">
      <ul className="h-full flex space-x-[34px] items-center text-sm">
        <HeaderNavLinksContent />
      </ul>
    </nav>
  );
}

export function HeaderNavLinksContent() {
  const location = useLocation();

  const { data: response } = useQuery({
    queryKey: ["lines-active"],
    queryFn: async () => {
      const response = await LinesAPI.getActive({ page: 1 });
      return response.data;
    },
    refetchOnWindowFocus: false,
    retry: false,
  });

  const activeLinesCount = response?.data?.length || 0;

  const { data: linesReponse } = useLinesInfiniteQuery();

  const totalLinesHistory =
    (linesReponse?.pages[0]?.meta?.count ?? 0) * (linesReponse?.pages[0]?.meta?.pageCount ?? 0);

  const { data: reportedLinesResponse } = useReportedLinesInfiniteQuery();
  const totalReportedLinesHistory =
    (reportedLinesResponse?.pages[0].meta.count ?? 0) *
    (reportedLinesResponse?.pages[0]?.meta.pageCount ?? 0);

  const totalLinesAndReportedLinesCount = totalLinesHistory + totalReportedLinesHistory;

  return (
    <>
      <HeaderNavLink
        label="Active Numbers"
        featureActive={activeLinesCount > 0}
        featureActiveCount={activeLinesCount}
        linkActive={location.pathname === "/"}
        to="/"
      />

      <HeaderNavLink
        label="Usage History"
        featureActive={totalLinesAndReportedLinesCount > 0}
        featureActiveCount={totalLinesAndReportedLinesCount}
        linkActive={location.pathname === "/sms-call-history"}
        to="/sms-call-history"
      />

      <HeaderNavLink
        label="API Information"
        linkActive={location.pathname === "/api-information"}
        to="/api-information"
      />

      <HeaderNavLink
        label="Help Center"
        linkActive={location.pathname === "/help-center"}
        to="/help-center"
      />
    </>
  );
}

export default HeaderNavLinks;
