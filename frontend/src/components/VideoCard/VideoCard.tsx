import React from 'react';
import { Paper, Grid, Card, CardContent, CardMedia, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

import { Video } from '../../config/interfaces/Video';

import './VideoCard.scss';
import {
  ACTIVE_CARD_HEIGHT,
  ACTIVE_VIDEO_HEIGHT,
  API_URL,
  CARD_HEIGHT,
  TILE_SIZES,
  VIDEO_HEIGHT
} from '../../config/constants/constants';
import { deleteVideo } from '../../config/services/api.services';

type Props = {
  id: string;
  title: string,
  description: string,
  url: string,
  setActive: (value: Video | null) => void,
  isActive?: boolean,
  deleteFile: () => void
}

function VideoCard({ id, title, description, url, setActive, isActive = false, deleteFile }: Props) {
  const changeActive = () => setActive({id, title, description, url});

  const closeActiveVideo = (event: any) => {
    event.stopPropagation();
    setActive(null);
  };

  const deleteVideoFile = (event: any) => {
    event.stopPropagation();
    deleteVideo(id).then(() => deleteFile());
  };

  return (
    <Grid item xs={isActive ? TILE_SIZES.ACTIVE : TILE_SIZES.INACTIVE} onClick={changeActive} className={'video-card'}>
      <Paper className={'paper'} >
        <Card style={{height: (isActive ? ACTIVE_CARD_HEIGHT : CARD_HEIGHT), cursor: 'pointer'}} className={'card'}>
          {
            isActive
            ? <CloseIcon className={'icon'} onClick={closeActiveVideo}/>
            : <DeleteOutlineIcon className={'icon'} onClick={deleteVideoFile}/>
          }
          <CardMedia
            component={'video'}
            src={`${API_URL}/${url}`}
            title={title}
            height={isActive ? ACTIVE_VIDEO_HEIGHT : VIDEO_HEIGHT}
            className={'media'}
            controls={isActive}
          />
          <CardContent>
            <Typography gutterBottom variant={'h5'} component={'h2'}>{title}</Typography>
            <Typography variant={'body2'} color={'textSecondary'} component={'p'}>{description}</Typography>
          </CardContent>
        </Card>
      </Paper>
    </Grid>
  );
}

export default VideoCard;
