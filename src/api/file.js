import axios from "axios";

async function uploadfile() {}

async function deleteFile(name) {
  const resp = await axios.delete(`http://tink.com:31695/files/${name}`);
  return resp;
}

async function getFiles() {
  const resp = await axios.get("http://tink.com:31695/files");
  return resp;
}

export { uploadfile, getFiles, deleteFile };
