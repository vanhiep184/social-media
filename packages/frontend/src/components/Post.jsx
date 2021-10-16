import {
  Grid,
  IconButton,
  Typography,
  CardContent,
  Card,
  CardHeader,
  CardMedia,
  CardActions,
  Avatar,
  Button,
} from '@mui/material';
import React from 'react';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import { blue } from '@mui/material/colors';
import { parseDate } from '../utils/parseDate';
// import { likeOrDislikePost } from '../api';
// import { useDispatch } from 'react-redux';
// import { updateLike } from '../redux/postSlice';

export default function Post({ post, profile }) {
  // const dispatch = useDispatch();

  // const [anchorEl, setAnchorEl] = useState(null);
  // const open = Boolean(anchorEl);
  // const handleClick = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };
  // const handleClose = () => {
  //   setAnchorEl(null);
  // };
  // const { _id } = JSON.parse(localStorage.getItem('login'));
  // const handleLike = async (e) => {
  //   e.preventDefault();
  //   dispatch(updateLike({ id: post._id }));
  //   const response = await likeOrDislikePost({ id: post._id });
  //   if (response.message !== 'Post updated successfully.') {
  //     dispatch(updateLike({ id: post._id }));
  //   }
  // };

  // const [openModal, setOpenModal] = React.useState(false);
  // const handleModalClose = () => {
  //   setOpenModal(false);
  // };

  // const handleModalOpen = () => {
  //   setOpenModal(true);
  // };
  return (
    // <Link to={`/posts/${post._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
    // </Link>
    <Card
      style={{
        margin: '12px 4px',
        borderRadius: '12px',
        boxShadow: '0px 10px 10px -5px rgba(0, 0, 0, 0.1)',
      }}
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: blue[500] }} aria-label="recipe">
            {(post.username || 'R')?.[0]}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={post.username}
        subheader={parseDate(post.createdAt)}
      />
      <CardContent>
        <Typography variant="h6" color="text.primary">
          {post.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {post.content}
        </Typography>
      </CardContent>
      <CardMedia
        component="img"
        height="194"
        style={{
          width: '100%',
          height: '300px',
          objectFit: 'contain',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        image={post.images?.[0]?.url || 'https://images.unsplash.com/photo-1593642634367-d91a135587b5'}
        alt={post.images?.[0]?.alt}
      />
      <CardActions
        disableSpacing
        sx={{
          marginTop: '12px',
          borderTop: '1px solid #e0e0e0',
        }}
      >
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Button
              variant="text"
              startIcon={<ThumbUpAltIcon />}
              style={{
                textTransform: 'none',
                minWidth: '10rem',
                borderRadius: '10px',
                color: 'grey',
              }}
            >
              Like
            </Button>
          </Grid>
          <Grid item>
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
}
