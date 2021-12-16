import './post.css';
import { MoreVert, Favorite, ThumbUpAlt, Comment } from '@mui/icons-material';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { format } from 'timeago.js';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

export default function Post({ post }) {
    const [like, setLike] = useState(post.likes.length);
    const [isLiked, setIsLiked] = useState(false);
    const [heart, setHeart] = useState(post.hearts.length);
    const [isHearted, setIsHearted] = useState(false);
    const [user, setUser] = useState({});
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const { user: currentUser } = useContext(AuthContext);

    useEffect(() => {
        setIsLiked(post.likes.includes(currentUser._id))
    }, [currentUser._id, post.likes]);

    useEffect(() => {
        setIsHearted(post.hearts.includes(currentUser._id))
    }, [currentUser._id, post.hearts]);

    useEffect(() => {
        try {
            const fetchUser = async () => {
                const res = await axios.get(`/users?userId=${post.userId}`);
                setUser(res.data)
            };
            fetchUser();
        } catch (error) {
            console.log(error);
        }
    }, [post.userId]);

    const likeHandler = () => {
        try {
            axios.put("/posts/" + post._id + "/like", { userId: currentUser._id });
        } catch (error) { }
        setLike(isLiked ? like-1 : like + 1)
        setIsLiked(!isLiked)
    };

    const heartHandler = () => {
        try {
            axios.put("/posts/" + post._id + "/heart", { userId: currentUser._id });
        } catch (error) {}
        setHeart(isHearted ? heart-1 : heart + 1)
        setIsHearted(!isHearted)
    };

    return (
        <div className="postContainer">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <Link to={`profile/${user.username}`}>
                        <img 
                        className="postProfileImg" 
                        // src={Users.filter(u => u.id === post.userId)[0].profilePicture}
                        src={user.profilePicture ? PF + user.profilePicture : PF + "people/noavatar.png"}
                        alt="" 
                        />
                        </Link>
                        <span 
                        className="postUsername"
                        >
                        {/* {Users.filter(u => u.id === post.userId)[0].username} */}
                        {user.username}
                        </span>
                        <span className="postDate">{format(post.createdAt)}</span>
                    </div>
                    <div className="postTopRight">
                        <MoreVert />
                    </div>
                </div>
                <div className="postCenter">
                    <span className="postText">{post?.desc}</span>
                    <img src={PF+post.img} alt="postimg" className="postImg" />
                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        <ThumbUpAlt htmlColor='blue' className="likeIcon" onClick={likeHandler} />
                        <span className="postLikeCounter">{like}</span>
                        <Favorite htmlColor='red' className="likeIcon" onClick={heartHandler} />
                        <span className="postHeartCounter">{heart}</span>
                        
                    </div>
                    <div className="postBottomRight">
                        <Comment className="postCommentImg" />
                        <span className="postCommentText">{post.comment} comments</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
