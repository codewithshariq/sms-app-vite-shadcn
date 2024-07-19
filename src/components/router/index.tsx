import { BrowserRouter, Route, Routes } from "react-router-dom";

import RootLayout from "@/components/templates/root-layout";

import ErrorLayout from "../templates/error-layout";

import { ActiveNumbersPage } from "@/pages/active-numbers/active-numbers.page";
import { TypographyH1 } from "../ui/typography";
import { UsageHistoryPage } from "@/pages/usage-history/usage-history.page";
import BuyCreditsPage from "@/pages/buy-credits/buy-cridits.page";

// import AccountPage from "@/components/pages/account";
// import SmsCallHistoryPage from "@/components/pages/sms-call-history";
// import ProfilePage from "@/components/pages/account/profile";
// import SavedPaymentMethodsPage from "@/components/pages/account/saved-payment-methods";
// import EditCardPage from "@/components/pages/account/saved-payment-methods/edit";
// import AddNewCardPage from "@/components/pages/account/add-new-card";

// import AdminUsersPage from "../pages/admin-users";
// import SubUserHistoryPage from "../pages/users/history";
// import TransactionsPage from "../pages/transactions";
// import TransactionForm from "../organisms/TransactionForm";

// const Layout = () => {
//   const { isLogged, authLoading } = useAuthState();

//   const authLoadedAndAuthenticated = isLogged && !authLoading;

//   return authLoadedAndAuthenticated ? (
//     <RootLayout />
//   ) : authLoading === true ? (
//     <div className="grid place-content-center w-full h-full">
//       <LoadingSpinner size={60} />
//     </div>
//   ) : (
//     <Navigate to="/auth/sign-in" />
//   );
// };

const AppRouter = () => {
  // const { init } = useAuthState();

  // useEffect(() => {
  //   init();
  // }, [init]);

  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="auth" element={<AuthLayout />}>
          <Route index={true} path="sign-in" element={<SignInPage />} />
          <Route path="sign-up" element={<SignUpPage />} />
          <Route path="confirm-email" element={<ConfirmEmailPage />} />
          <Route path="pass-restore" element={<PassRestorePage />} />
          <Route path="oauth-success" element={<OauthSuccessPage />} />
        </Route>

        <Route path="users" element={<AuthLayout />}>
          <Route path="activate/:token" element={<ConfirmSignUpPage />} />
          <Route path="pass-restore/:token" element={<ConfirmPasswordRestorePage />} />
        </Route> */}

        <Route path="/" element={<RootLayout />}>
          {/* Authenticated only routes */}
          <Route index={true} element={<ActiveNumbersPage />} />
          <Route path="buy-credits" element={<BuyCreditsPage />} />

          {/* <Route path="admin-users" element={<AdminUsersPage />} /> */}

          {/* Common auth routes */}
          <Route path="sms-call-history" element={<UsageHistoryPage />} />
          <Route path="api-information" element={<TypographyH1>Api information</TypographyH1>} />
          <Route path="help-center" element={<TypographyH1>Help center</TypographyH1>} />
          {/* <Route path="sms-call-history" element={<SmsCallHistoryPage />} />
            <Route path="/user/:id/history" element={<SubUserHistoryPage />} />
            <Route path="transactions" element={<TransactionsPage />}>
              <Route path=":user_id" element={<TransactionForm />} />
            </Route> */}

          {/* <Route path="account" element={<AccountPage />}>
              <Route index element={<Navigate to="/account/profile" />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="payment-methods" element={<SavedPaymentMethodsPage />} />
            </Route> */}
          {/* <Route path="account/payment-methods/:id" element={<EditCardPage />} />
            <Route path="account/add-new-card" element={<AddNewCardPage />} /> */}
        </Route>

        {/* 404 Not found */}
        <Route path="*" element={<ErrorLayout code={404}>Not Found</ErrorLayout>} />
        {/* 403 Forbidden resource */}
        <Route
          path="403"
          element={<ErrorLayout code={403}>You don't have access to view this page</ErrorLayout>}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
