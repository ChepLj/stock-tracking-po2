import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

import { database, storage } from "../firebaseConfig";

function firebasePostMedia (image: any, childRef: string,fileName: string, callback :Function , progressCallback?: Function, metaData?: any) {
// Upload file and metadata to the object 'images/mountains.jpg'
const storageRef = ref(storage, childRef + fileName);
const uploadTask = uploadBytesResumable(storageRef, image, metaData);
// Listen for state changes, errors, and completion of the upload.
uploadTask.on('state_changed',
  (snapshot) => {
    
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    // const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    // console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        progressCallback?.(snapshot) //: show progress in Modal Upload
        // console.log('Upload is running');
        break;
    }
  }, 
  (error) => {
    // A full list of error codes is available at
    // https://firebase.google.com/docs/storage/web/handle-errors
    callback('Upload Failed', error)

    const title = 'Error'
    const message = "Can not post media !!! failed  " + error.code
    const okButtonTitle = "Back to Home"
    const cancelButtonTitle= 'Wait...'
    const callbackShowDialog = ()=>{
      window.location.replace('/')
    }
    // showConfirm(title, message,okButtonTitle,cancelButtonTitle, callbackShowDialog)
  }, 
  () => {
    // Upload completed successfully, now we can get the download URL
    
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      // console.log('File available at', downloadURL);
      
      callback('Upload completed successfully',downloadURL, fileName)
    });
  }
)
}



//! Export
export default firebasePostMedia