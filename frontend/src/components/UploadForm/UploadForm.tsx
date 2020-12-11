import React, { memo, useCallback, useRef, useState } from 'react';
import { Box, Button, Card, CardMedia, Grid } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

import CustomTextField from '../../config/utils/CustomTextField.util';
import { uploadData } from '../../config/services/api.services';

type PropsType = {
  localFile: any;
};

const inputProps = {
  style: {
    color: '#573e8c'
  }
};

function UploadForm({localFile}: PropsType) {
  const [isLoading, setIsLoading] = useState(false);
  const [isTitleInvalid, setIsTitleInvalid] = useState(false);
  const [isDescriptionInvalid, setIsDescriptionInvalid] = useState(false);
  const refTitle = useRef<any>('');
  const refDescription = useRef<any>('');
  const history = useHistory();

  const areFieldsValid = useCallback(() => {
    if (!refTitle.current.value) {
      setIsTitleInvalid(true);
    }

    if (!refDescription.current.value) {
      setIsDescriptionInvalid(true);
    }

    return refTitle.current.value && refDescription.current.value;
  }, [refTitle, refDescription]);

  const saveVideo = useCallback(() => {
    if (!areFieldsValid()) {
      return;
    }

    const formData = new FormData();
    formData.append('file', localFile);
    formData.append('videoTitle', refTitle.current.value);
    formData.append('videoDesc', refDescription.current.value);
    setIsLoading(true);
    uploadData(formData)
      .then(() => history.push('/'))
      .catch(() => setIsLoading(false));
  }, [areFieldsValid, localFile, refTitle, refDescription]);

  const isDisabled = useCallback(() => {
    return !localFile || isLoading;
  }, [localFile, isLoading]);

  return (
    <Grid container spacing={3} alignContent={'center'} justify={'center'} direction={'column'}>
      <Grid item lg={6} md={6} sm={12} xs={12}>
        <Card>
          <CardMedia component={'video'} src={URL.createObjectURL(localFile)} height={300} controls/>
        </Card>
      </Grid>
      <Grid item lg={6} md={6} sm={12} xs={12}>
        <Box display={'flex'} flexDirection={'column'} alignItems={'flex-start'}>
          <CustomTextField
            inputRef={refTitle}
            label={'Title of your video'}
            variant={'outlined'}
            fullWidth
            margin={'normal'}
            InputProps={inputProps}
            error={isTitleInvalid}
            helperText={isTitleInvalid && 'Title is required'}
          />
          <CustomTextField
            inputRef={refDescription}
            rows={4}
            multiline
            label={'Description of your video'}
            variant={'outlined'}
            fullWidth
            margin={'normal'}
            InputProps={inputProps}
            error={isDescriptionInvalid}
            helperText={isDescriptionInvalid && 'Description is required'}
          />
          <Button onClick={saveVideo}
                  variant={'contained'}
                  color={'primary'}
                  disabled={isDisabled()}>
            Upload Video
          </Button>
        </Box>
      </Grid>
    </Grid>
  )
}

export default memo(UploadForm);
