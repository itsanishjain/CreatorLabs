import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { getDoc, doc } from "firebase/firestore";

import { db } from "../../../src/utils/firebase";
import { UserContext } from "../../../src/context/UserContext";
import ProjectInfo from "../../../src/components/ProjectInfo";
import RegisterUserList from "../../../src/components/RegisterUserList";
import WalletRequirement from "../../../src/components/WalletRequirement";

const Tab = ({ tabName, data }) => {
  const tab = {
    projectInfo: <ProjectInfo data={data} />,
    // walletRequirement: <WalletRequirement data={data} />,
    // registerUserList: <RegisterUserList users={data.users} />,
  };

  return <>{tab[tabName]}</>;
};

const Settings = ({ data }) => {
  const { isLoggedIn, account } = useContext(UserContext);

  const [activeTab, setActiveTab] = useState("projectInfo");

  const router = useRouter();

  const getClassNames = (tabName) => {
    const tabClassName = {
      active:
        "text-center block border border-green-500 rounded py-2 px-4 bg-green-500 hover:bg-green-700 text-white",
      inactive: "text-center text-black block rounded py-2 px-4",
    };

    return tabName === activeTab ? tabClassName.active : tabClassName.inactive;
  };

  useEffect(() => {
    if (!isLoggedIn) return router.push("/login");
    if (account !== data.creator) return router.push("/dashboard");
  }, [account, data.creator, isLoggedIn, router]);

  return (
    <div className="mt-8">
      <ul className="flex mb-8 max-w-3xl mx-auto p-2 w-64 ">
        <li
          onClick={() => setActiveTab("projectInfo")}
          className="flex-1 mr-2  cursor-pointer text-black"
        >
          <a className={getClassNames("projectInfo")}>Project Info</a>
        </li>
        {/* <li
          onClick={() => setActiveTab("walletRequirement")}
          className="flex-1 mr-2  cursor-pointer text-black"
        >
          <a className={getClassNames("walletRequirement")}>
            Wallet Requirements
          </a>
        </li>
        <li
          onClick={() => setActiveTab("registerUserList")}
          className="flex-1 mr-2 cursor-pointer text-black"
        >
          <a className={getClassNames("registerUserList")}>Registered Users</a>
        </li> */}
      </ul>

      <Tab tabName={activeTab} data={data} />
    </div>
  );
};

export const getServerSideProps = async (ctx) => {
  const { id } = ctx.params;

  let data = {};

  await getDoc(doc(db, "projects", id))
    .then(async (res) => {
      data = { id: res.id, ...res.data() };
    })
    .catch((err) => err);

  return { props: { data } };
};

export default Settings;
