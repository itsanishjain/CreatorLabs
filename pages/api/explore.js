import { collection, getDocs, query } from "firebase/firestore";

import { db } from "../../src/utils/firebase";

const handler = async (req, res) => {
  const projectsRef = collection(db, "projects");
  const q = query(projectsRef);

  return getDocs(q)
    .then(async (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

      return res.json(data);
    })
    .catch((err) => err);
};

export default handler;
