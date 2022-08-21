import { collection, getDocs, query, where } from "firebase/firestore";

import { db } from "../../../src/utils/firebase";
import { redis, setKey } from "../../../src/utils/redis";

const handler = async (req, res) => {
  const { account } = req.query;
  var isRedisWorking = true;

  const cacheRef = `dashboard:${account}`;
  const cachedData = await redis
    .get(cacheRef)
    .then((res) => JSON.parse(res))
    .catch(() => (isRedisWorking = false));

  if (isRedisWorking && cachedData) return res.json(cachedData);

  const projectsRef = collection(db, "projects");

  // const q1 = query(projectsRef, where("creator", "==", account));
  // const q2 = query(projectsRef, where("users", "array-contains", account));

  async function getIsMemberOrCreator() {
    const isCapital = query(projectsRef, where("creator", "==", account));
    const isItalian = query(
      projectsRef,
      where("users", "array-contains", account)
    );

    const [capitalQuerySnapshot, italianQuerySnapshot] = await Promise.all([
      await getDocs(isCapital),
      await getDocs(isItalian),
    ]);

    const capitalCitiesArray = capitalQuerySnapshot.docs;
    const italianCitiesArray = italianQuerySnapshot.docs;


    console.log({ capitalCitiesArray });
    console.log({ italianCitiesArray });

    const citiesArray = capitalCitiesArray.concat(italianCitiesArray);

    return citiesArray;
  }

  var d = [];
  //We call the asychronous function
  await getIsMemberOrCreator().then((result) => {
    result.forEach((docSnapshot) => {
      console.log(docSnapshot.data());
      // return docSnapshot.data();
      d.push(docSnapshot.data());
    });
  });

  return res.json(d);

  // return getDocs(q2)
  //   .then(async (snapshot) => {
  //     const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

  //     console.log(data);

  //     // if (isRedisWorking) await setKey(cacheRef, data);

  //     // return res.json(data);
  //     return res.json(data);
  //   })
  //   .catch((err) => err);
};

export default handler;
