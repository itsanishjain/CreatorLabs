import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { updateDoc, doc } from "firebase/firestore";
import toast from "react-hot-toast";

import { db } from "../utils/firebase";
import { uploadFile } from "../utils/helpers";
import Input from "../components/Input";
import Loader from "./Loader";

const ProjectInfo = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [isProjectInfoUpdated, setIsProjectInfoUpdated] = useState(false);

  const [project, setProject] = useState(data);

  const [imageFiles, setImageFiles] = useState({
    profileImageFile: null,
    bannerImageFile: null,

    profileImageFileChanged: false,
    bannerImageFileChanged: false,
  });

  const handleChange = (e) => {
    setIsProjectInfoUpdated(true);
    setProject((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageChange = (e) => {
    setIsProjectInfoUpdated(true);
    setImageFiles((prev) => ({
      ...prev,
      [e.target.name + "File"]: e.target.files[0],
      [e.target.name + "FileChanged"]: true,
    }));

    setProject((prev) => ({
      ...prev,
      [e.target.name]: URL.createObjectURL(e.target.files[0]),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isProjectInfoUpdated) return;

    setLoading(true);

    let imagesToUpload = {};

    if (imageFiles.profileImageFileChanged) {
      imagesToUpload["profileImage"] = await uploadFile(
        `projects/${data.id}`,
        imageFiles.profileImageFile,
        "profileImage"
      );
    }

    if (imageFiles.bannerImageFileChanged) {
      imagesToUpload["bannerImage"] = await uploadFile(
        `projects/${data.id}`,
        imageFiles.bannerImageFile,
        "bannerImage"
      );
    }

    const updatedProject = {
      ...project,
      ...imagesToUpload,
    };

    await updateDoc(doc(db, "projects", data.id), updatedProject)
      .then(() => {
        setProject(updatedProject);
        toast.success("Project Updated Successfully");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error :(");
      });

    setLoading(false);
  };

  return (
    <div className="flex flex-col md:grid md:grid-cols-3 max-w-6xl mx-auto">
      <div className="my-2 md:my-0">
        <Link href={`/${project.id}`}>
          <a className="bg-green-200  border-l-2 border-green-500 m-2 p-4 block text-black">
            Public URL
          </a>
        </Link>
      </div>
      <div className="col-span-2 rounded-md border-2 p-4 ">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input
            name="name"
            placeholder="Project name"
            inputTagType="smallInput"
            value={project.name}
            onChange={handleChange}
            required={true}
          />

          <Input
            name="description"
            placeholder="Project description"
            inputTagType="largeInput"
            onChange={handleChange}
            value={project.description}
            required={true}
          />
          <input
            type="file"
            accept="image/*"
            name="profileImage"
            onChange={handleImageChange}
            className="form-control mt-3 block text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />

          {project.profileImage && (
            <div className="w-full h-96 md:h-auto md:w-48">
              <Image
                src={project.profileImage}
                alt="profile image"
                width="100%"
                height="100%"
                layout="responsive"
              />
            </div>
          )}

          {/* <input
            type="file"
            accept="image/*"
            name="bannerImage"
            onChange={handleImageChange}
            className="form-control block text-sm mt-[-36px] text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          /> */}

          {/* {project.bannerImage && (
            <div className="w-full h-96 md:h-auto md:w-48">
              <Image
                src={project.bannerImage}
                alt="profile image"
                width="100%"
                height="100%"
                layout="responsive"
              />
            </div>
          )} */}

          <Input
            name="link"
            placeholder="Official link"
            inputTagType="smallInput"
            value={project.link}
            onChange={handleChange}
          />

          <div className="flex items-center">
            <input
              type="checkbox"
              name="isPrivate"
              value={project.isPrivate}
              onChange={handleChange}
              className="w-6 h-6 rounded-full"
            />
            <div className="flex flex-col ml-8">
              <span>Private</span>
              <small className="text-sm font-thin">
                it will not show your Project on main page of our website{" "}
              </small>
            </div>
          </div>

          {loading ? <Loader /> : <button>Save</button>}
        </form>
      </div>
    </div>
  );
};

export default ProjectInfo;
