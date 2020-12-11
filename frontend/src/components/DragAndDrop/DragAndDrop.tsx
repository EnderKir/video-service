import React, { ChangeEvent, memo } from 'react';
import { Button, Grid, Typography } from '@material-ui/core';

import './DragAndDrop.scss';

type DragAndDropType = {
  handleFileChange: (files: any) => void;
};

const DragAndDrop = ({ handleFileChange }: DragAndDropType) => {
  const dragEvent = (e: any) => {
    e.preventDefault();
  };

  const fileDrop = (e: any) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    handleFileChange(files);
  };

  const inputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    handleFileChange(files);
  };

  return (
    <Grid
      className={'drag-and-drop'}
      container
      alignContent={'center'}
      justify={'center'}
      direction={'column'}
      onDragOver={dragEvent}
      onDragEnter={dragEvent}
      onDragLeave={dragEvent}
      onDrop={fileDrop}>

      <Typography variant={'h3'} className={'text'}>Drag&Drop videos here</Typography>
      <Typography variant={'h5'} className={'text'}>or</Typography>

      <Button variant={'outlined'} component={'label'} color={'primary'}>
        Browse video
        <input type={'file'} name={'file'} accept={'.mp4'} onChange={inputChange} hidden />
      </Button>

    </Grid>
  );
};

export default memo(DragAndDrop);
