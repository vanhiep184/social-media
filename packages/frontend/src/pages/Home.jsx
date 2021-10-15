import HomeIcon from "@mui/icons-material/Home";
import {
  CircularProgress,
  Grid,
  IconButton,
  Button,
  Hidden,
  ListItemIcon,
  ListItem,
  ListItemText,
  useTheme,
} from "@mui/material";
import { Box } from "@mui/system";
import { NavLink } from "react-router-dom";
import React, { useEffect } from "react";
import AssistantIcon from "@mui/icons-material/Assistant";
import Post from "../components/Post";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../redux/postSlice";
import AddPost from "../components/AddPost";

export default function Home() {
  const dispatch = useDispatch();
  const { status, posts } = useSelector((state) => state.post);
  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);
  const theme = useTheme();
  return (
    <Box>
      <Box borderBottom="1px solid #ccc" padding="4px">
        <Grid container justifyContent="center" alignItems="center">
          <Grid item>
            <NavLink
              to="/"
              style={{
                textDecoration: "none",
                color: "inherit",
                backgroundColor: "inherit",
              }}
            >
              <Button fullWidth border="8px">
                <HomeIcon fontSize="large" color="action" />
              </Button>
            </NavLink>
          </Grid>
        </Grid>
      </Box>
      <Box height="92vh" sx={{ overflowY: "scroll" }}>
        <AddPost />
        <Box textAlign="center" marginTop="1rem">
          {status === "loading" && (
            <CircularProgress size={20} color="primary" />
          )}
        </Box>
        {status === "success" &&
          posts.map((post) => <Post key={post._id} post={post} />)}
      </Box>
    </Box>
  );
}
