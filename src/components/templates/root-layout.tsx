import { Link, Outlet, useNavigate } from "react-router-dom";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getUser } from "@/api/users";
import useUserState from "@/store/slices/userSlice";
import { useCallback, useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { getAuthTokens } from "@/api/auth";
import { useToast } from "@/utils/toaster/use-toast";
import { Button } from "@/components/ui/button";
import { TruverifiLogo } from "../ui/svgs";
import HeaderNavLinks, {
  HeaderNavLinksContent,
} from "@/components/layout/top-header-navbar/header-nav-links";
import HeaderCredits from "@/components/layout/top-header-navbar/header-credits";
import HeaderProfile, {
  HeaderProfilePopoverContent,
} from "@/components/layout/top-header-navbar/header-profile";
import { TypographyLogo, TypographyMuted } from "../ui/typography";

import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import Sidebar from "../layout/sidebar";
import ThemeSwitch from "../theme/theme-switch";

const URL = import.meta.env.VITE_API_BASE_URL;

const useSocket = () => {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const tokens = getAuthTokens();
    if (socketRef.current || !tokens) return;
    const socket = io(URL, {
      extraHeaders: {
        Authorization: "Bearer " + tokens.accessToken,
      },
    });
    socketRef.current = socket;
  }, []);

  return socketRef.current;
};

function RootLayout() {
  const { updateUser } = useUserState();
  const { toast, dismiss } = useToast();
  const toastIdRef = useRef<string | undefined>(undefined);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const socket = useSocket();

  useQuery({
    queryKey: ["get-me"],
    queryFn: async () => {
      const response = await getUser();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      updateUser(response.data as any);
      return response.data;
    },
  });

  const handleViewSms = useCallback(() => {
    dismiss(toastIdRef.current);
    toastIdRef.current = undefined;
    queryClient.refetchQueries({ queryKey: ["lines-sms"] }).then(() => navigate("/"));
  }, [dismiss, navigate, queryClient]);

  const handleNotification = useCallback(() => {
    const t = toast({
      title: "New SMS!",
      description: (
        <div>
          <span>You've just received a new SMS</span>
          <Button className="mt-2 !py-1" onClick={handleViewSms}>
            View
          </Button>
        </div>
      ),
      duration: 1000 * 60 * 60,
    });
    toastIdRef.current = t.id;
  }, [handleViewSms, toast]);

  useEffect(() => {
    if (!socket || socket.connected) return;
    socket.on("connect", function () {
      console.log("WS connection established");
    });

    socket.on("sms", function () {
      handleNotification();
    });

    socket.on("disconnect", function () {
      console.log("Disconnected");
    });
  }, [handleNotification, socket, toast]);

  return (
    <>
      <Header />
      <div className="flex flex-col h-screen">
        <div className="container space-x-4 flex flex-1">
          <div className="grid grid-cols-1 xl:grid-cols-[316px_1036px] h-full pt-14 w-full gap-6">
            <Sidebar />

            <Outlet />
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}

function Header() {
  const { ...user } = useUserState();

  return (
    <header className="fixed left-0 right-0 top-0 z-20 border-b  bg-dark  h-14 backdrop-blur">
      <div className="container flex items-center h-full">
        <div className="flex items-center space-x-8">
          <div className="flex space-x-2 items-center">
            <TruverifiLogo className="h-[2rem] w-[2rem]" />
            <TypographyLogo className="leading-5 text-[1rem]">truverifi</TypographyLogo>
          </div>

          <ThemeSwitch />
        </div>

        <div className="hidden lg:flex flex-1 items-center justify-center">
          <HeaderNavLinks />
        </div>

        <div className="hidden lg:flex justify-center items-center">
          <div className="flex-1 flex justify-end items-center space-x-1">
            <HeaderProfile fullName={user.fullName || ""} />
            <HeaderCredits balance={user.balance || 0} />
          </div>
        </div>

        <div className="lg:hidden flex-1 justify-end flex">
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="outline">Menu</Button>
            </DrawerTrigger>
            <DrawerContent>
              <div className="mx-auto w-full max-w-sm flex flex-col space-y-2">
                <HeaderNavLinksContent />
                <HeaderCredits balance={user.balance || 0} />

                <HeaderProfilePopoverContent />
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer
      className={`h-[52px] py-2 dark:bg-container_same_bg
    `}
    >
      <div className="container flex items-center h-full">
        <div className="flex space-x-4 items-center">
          <Link to="/help-center">
            <TypographyMuted>Help Center</TypographyMuted>
          </Link>
          <Link to="/terms-and-privacy">
            <TypographyMuted>Terms & Privacy</TypographyMuted>
          </Link>
        </div>

        <div className="flex-1 flex items-center justify-center">
          <TruverifiLogo />
        </div>

        <div className="flex justify-end">
          <TypographyMuted>
            © {new Date().getFullYear()} truverifi. All rights reserved.
          </TypographyMuted>
        </div>
      </div>
    </footer>
  );
}

export default RootLayout;
