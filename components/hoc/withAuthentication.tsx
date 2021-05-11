import { useRouter } from "next/router";
import { useContext } from "react";
import { AuthContext } from "../../components/context/AuthContext";
import PageLoading from "../UI/PageLoading/PageLoading";

import { isServer } from "../../helpers/isServer";
import PageError from "../page/PageError";

const withAuthentication = (WrappedComponent) => {
  const Page = () => {
    const { userLoading, user } = useContext(AuthContext);

    // placeholder hack
    if (!isServer()) {
      if (userLoading) {
        return <PageLoading />;
      }

      if (!user && !userLoading) {
        return <PageError />;
      }

      if (user) {
        return <WrappedComponent user={user} />;
      }
    } else {
      return <></>;
    }
  };

  return Page;
};

export default withAuthentication;
