import { collection, getDocs, query, where } from "firebase/firestore";

import { db } from "../../../src/utils/firebase";

const handler = async (req, res) => {
  const { account } = req.query;

  const projectsRef = collection(db, "projects");

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

    const citiesArray = capitalCitiesArray.concat(italianCitiesArray);

    return citiesArray;
  }

  var d = [];
  //We call the asychronous function
  await getIsMemberOrCreator().then((result) => {
    result.forEach((docSnapshot) => {
      d.push({ id: docSnapshot.id, ...docSnapshot.data() });
    });
  });

  return res.json(d);
};

export default handler;
