import { v4 as uuidv4 } from "uuid";

const useIdentity = () => {
  const STORAGE_NAME = "finder-identity";
  const item = localStorage.getItem(STORAGE_NAME) as string;

  if (!item) {
    const uid = uuidv4();
    localStorage.setItem(STORAGE_NAME, uid);
    return uid as string;
  }

  return item as string;
};

export default useIdentity;
