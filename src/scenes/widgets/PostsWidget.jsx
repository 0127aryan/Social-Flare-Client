import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import PostWidget from './PostWidget'

const PostsWidget = ({ userId, isProfile = false}) => {
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts);
    const token = useSelector((state) => state.token);

    const getPosts = async() => {
        const response = await fetch("https://social-flare-server.vercel.app/posts", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`},
        });
        const data = await response.json();
        dispatch(setPosts({posts: data}));
    }

    const getUserPosts = async() => {
        const response = await fetch(`https://social-flare-server.vercel.app/${userId}/posts`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`},
        });
        const data = await response.json();
        dispatch(setPosts({posts: data}));
    };
    useEffect(() => {
        if(isProfile) {
            getUserPosts();
        } else {
            getPosts();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return(
        <>
            {posts.map(
                ({
                    _id,
                    userId,
                    firstName,
                    lastName,
                    location,
                    description,
                    picturePath,
                    userPicturePath,
                    likes,
                    comments,
                }) => (
                    <PostWidget 
                    key={_id}
                    postId={_id}
                    postUserId={userId}
                    name={`${firstName} ${lastName}`}
                    location={location}
                    description={description}
                    picturePath={picturePath}
                    userPicturePath={userPicturePath}
                    likes={likes}
                    comments={comments}
                     />
                )
            )}
        </>
    )
}

export default PostsWidget;