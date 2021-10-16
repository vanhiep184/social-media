import { Button, Grid, Input, Avatar, Card } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { useDispatch, useSelector } from 'react-redux';
import { addPost } from '../api';
import { getPosts } from '../redux/postSlice';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../storage_initialize';
// Based on the default React Dropzone image thumbnail example
// The `thumbButton` style positions the edit button in the bottom right corner of the thumbnail
const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16,
};

const thumb = {
  position: 'relative',
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: 'border-box',
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden',
};

const img = {
  display: 'block',
  width: 'auto',
  height: '100%',
};

export default function AddPost() {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.post);

  const [files, setFiles] = useState([]);
  const [images, setImages] = useState([]);
  const [postText, setPostText] = useState('');
  const [postTitle, setPostTitle] = useState('');
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      setFiles(
        [...files]?.concat(
          acceptedFiles.map((file) => {
            const editedFile = Object.assign(file, {
              preview: URL.createObjectURL(file),
            });
            fileUploader(editedFile);
            return editedFile;
          })
        )
      );
    },
  });

  const fileUploader = (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'react-blog');
    formData.append('cloud_name', 'dzqjqxzjw');
    // Create the file metadata
    /** @type {any} */
    const metadata = {
      contentType: 'image/jpeg',
    };

    // Upload file and metadata to the object 'images/mountains.jpg'
    const storageRef = ref(storage, 'images/' + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file, metadata);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        // switch (snapshot.state) {
        //   case 'paused':
        //     console.log('Upload is paused');
        //     break;
        //   case 'running':
        //     console.log('Upload is running');
        //     break;
        // }
      },
      (error) => {
        console.error(error);
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
          setImages([
            ...images,
            {
              url: downloadURL,
              alt: file.name,
            },
          ]);
        });
      }
    );
  };
  const handleAddPost = async () => {
    const post = {
      posts: [...posts].concat({
        _id: Math.random().toString(),
        title: postTitle,
        username: 'coolguy123',
        content: postText,
        images: images,
        createdAt: new Date().toISOString(),
      }),
    };
    const data = await addPost(post);
    if (data) {
      dispatch(getPosts());
      setPostText('');
      setPostTitle('');
    }
  };

  const thumbs = files.map((file, index) => (
    <div style={thumb} key={file.name + index}>
      <div style={thumbInner}>
        <img src={file.preview} style={img} alt="" />
      </div>
    </div>
  ));
  useEffect(
    () => () => {
      // Make sure to revoke the Object URL to avoid memory leaks
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  return (
    <Box padding="1rem 1rem 0 1rem" border="1px solid #ccc" borderRadius="8px" margin="16px 4px 8px">
      <Grid container>
        <Grid item sx={{ paddingRight: '1rem' }}>
          <Avatar sx={{ bgcolor: 'f9f9f9' }} aria-label="recipe">
            R
          </Avatar>
        </Grid>
        <Grid item flexGrow="1">
          <Box padding=".5rem 0">
            <Input
              value={postTitle}
              onChange={(e) => setPostTitle(e.target.value)}
              rows="1"
              disableUnderline
              type="text"
              placeholder="Title"
              sx={{ width: '100%' }}
            />
          </Box>
          <Box padding=".5rem 0">
            <Input
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
              multiline
              rows="5"
              disableUnderline
              type="text"
              placeholder="Write something?"
              sx={{ width: '100%' }}
            />
          </Box>
          <Card
            className="container"
            {...getRootProps({ className: 'dropzone' })}
            elevation={0}
            style={{
              borderRadius: '8px',
              border: '1px dashed #ccc',
              backgroundColor: '#f9f9f9',
              height: '100px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <input {...getInputProps()} />
            <p
              style={{
                textAlign: 'center',
              }}
            >
              Drag 'n' drop some files here, or click to select files
            </p>
          </Card>
          <Card style={thumbsContainer} elevation={0}>
            {thumbs}
          </Card>
          <Box textAlign="right" paddingBottom=".5rem" paddingTop=".5rem" borderTop="1px solid #ccc">
            <Button
              onClick={handleAddPost}
              disabled={postTitle.length === 0}
              variant="contained"
              color="primary"
              sx={{
                borderRadius: '10px',
                fontSize: '12px',
                minWidth: '100px',
              }}
            >
              Post
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
