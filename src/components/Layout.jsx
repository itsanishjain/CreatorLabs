import { useRouter } from "next/router";

import Navigation from "./Navigation";

const Layout = ({ children }) => {
  const router = useRouter();

  return (
    <div className="">
      {router.pathname !== "/[id]" && <Navigation />}
      {children}
    </div>
  );
};

export default Layout;
