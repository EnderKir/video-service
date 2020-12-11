import React, { useState } from 'react';
import DragAndDrop from '../../components/DragAndDrop/DragAndDrop';
import UploadForm from '../../components/UploadForm/UploadForm';

function UploadPage() {
  const [isFileUpload, setIsFileUpload] = useState(false);
  const [file, setFile] = useState();

  const fileChange = (files: any) => {
    setIsFileUpload(true);
    setFile(files[0]);
  };

  return !isFileUpload ? <DragAndDrop handleFileChange={fileChange}/> : <UploadForm localFile={file}/>;
}

export default UploadPage;
