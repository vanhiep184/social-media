import { Button, Grid, Input, Avatar } from '@mui/material';

import { styled } from '@mui/material/styles';
import { Box, useTheme } from '@mui/system';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPost } from '../api';
import { getPosts } from '../redux/postSlice';

import PhotoCamera from '@mui/icons-material/PhotoCamera';
import IconButton from '@mui/material/IconButton';
const IInput = styled('input')({
  display: 'none',
});
export default function AddPost() {
  const dispatch = useDispatch();
  const { status, posts } = useSelector((state) => state.post);
  const theme = useTheme();
  const [postText, setPostText] = useState('');
  const handleAddPost = async () => {
    const post = {
      posts: [...posts].concat({
        _id: Math.random().toString(),
        title: 'My First Post',
        username: 'coolguy123',
        content: postText,
        images: [
          {
            url: 'https://picsum.photos/200/300',
            alt: 'A picture of a cat',
          },
        ],
        createdAt: new Date().toISOString(),
      }),
    };
    const data = await addPost(post);
    if (data) {
      dispatch(getPosts());
      setPostText('');
    }
  };
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
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
              multiline
              rows="2"
              disableUnderline
              type="text"
              placeholder="What's up?"
              sx={{ width: '100%' }}
            />
          </Box>
          <label htmlFor="icon-button-file">
            <IInput accept="image/*" id="icon-button-file" type="file" />
            <IconButton color="primary" aria-label="upload picture" component="span">
              <PhotoCamera />
            </IconButton>
          </label>
          <Box textAlign="right" paddingBottom=".5rem" paddingTop=".5rem" borderTop="1px solid #ccc">
            <Button
              onClick={handleAddPost}
              disabled={postText.length === 0}
              variant="contained"
              color="primary"
              sx={{
                borderRadius: theme.shape.borderRadius,
                fontSize: '12px',
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
