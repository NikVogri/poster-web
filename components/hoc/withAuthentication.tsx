import { useContext } from "react";
import { AuthContext } from "../../components/context/AuthContext";
import PageLoading from "../page/PageLoading";

import { isServer } from "../../helpers/isServer";
import PageError from "../page/PageError";

const withAuthentication = (WrappedComponent) => {
  const Page = () => {
    const { userLoading, user } = useContext(AuthContext);

    if (!isServer()) {
      if (userLoading) {
        return <PageLoading />;
      }

      if (user) {
        return <WrappedComponent user={user} />;
      }

      if (!user && !userLoading) {
        return <PageError />;
      }
    } else {
      return <></>;
    }
  };

  return Page;
};

export default withAuthentication;
