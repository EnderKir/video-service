import React, { memo, useCallback, useState } from 'react';
import { Button, Card, CardMedia, Grid } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

import { Form, Formik, Field } from 'formik';
import * as Yup from 'yup';

import Spinner from "../Spinner/Spinner";

import { MultilineTextField, OutlineTextField } from "../text-fields/text-fields";
import { uploadData } from '../../config/services/api.services';

const SaveVideoSchema = Yup.object().shape({
    title: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    description: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
});

type PropsType = {
    localFile: any;
};

type VideoDataType = {
  title: string,
  description: string,
};

function UploadForm({localFile}: PropsType) {
    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory();

    const saveVideo = (values: VideoDataType) => {
        const {title, description} = values;

        const formData = new FormData();
        formData.append('file', localFile);
        formData.append('videoTitle', title);
        formData.append('videoDesc', description);
        setIsLoading(true);
        uploadData(formData)
            .then(() => history.push('/'))
            .catch(() => setIsLoading(false));
    };

    const isDisabled = useCallback(() => {
        return !localFile || isLoading;
    }, [localFile, isLoading]);

    return (
        <Grid container spacing={10} alignContent={'center'} justify={'center'} direction={'column'}>
            <Grid item lg={6} md={6} sm={12} xs={12}>
                <Card>
                    <CardMedia component={'video'} src={URL.createObjectURL(localFile)} height={300} controls/>
                </Card>
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
                <Formik
                    initialValues={{
                        title: '',
                        description: '',
                    }}
                    onSubmit={saveVideo}
                    validateOnChange
                    validateOnBlur
                    validationSchema={SaveVideoSchema}
                >
                    <Form>
                        <Grid container direction="column" spacing={3}>
                            <Grid item xs={12}>
                                <Field
                                    name="title"
                                    type="text"
                                    label="Title of your video"
                                    placeholder="Title of your video"
                                    required
                                    component={OutlineTextField}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Field
                                    name="description"
                                    type="text"
                                    label="Description of your video"
                                    placeholder="Description of your video"
                                    rows={4}
                                    required
                                    component={MultilineTextField}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                {isLoading ?
                                    <Spinner /> : (
                                        <Button
                                            variant={'contained'}
                                            color={'primary'}
                                            type="submit"
                                            disabled={isDisabled()}>
                                            Upload Video
                                        </Button>
                                    )}
                            </Grid>
                        </Grid>
                    </Form>
                </Formik>
            </Grid>
        </Grid>
    )
}

export default memo(UploadForm);
