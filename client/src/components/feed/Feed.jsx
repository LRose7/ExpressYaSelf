import { useEffect, useState } from 'react';
import Post from '../post/Post';
import Share from '../share/Share';
import './feed.css';
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

export default function Feed({ username }) {
    const [posts, setPosts] = useState([]);
    const { user } = useContext(AuthContext);


    useEffect(() => {
        try {
            const fetchPosts = async () => {
                const res = username
                ? await axios.get("/posts/profile/" + username)
                : await axios.get("/posts/timeline/" + user._id);
                setPosts(
                    res.data.sort((p1, p2) => {
                    return new Date(p2.createdAt) - new Date(p1.createdAt);
                    })
                );
            };
            fetchPosts();
        } catch (error) {
            console.log(error);
        }
    }, [username, user._id]);

    return (
        <div className="feed">
            <div className="feedWrapper">
                { (!username || username === user.username) && <Share />}
                { posts.map(p => (
                    <Post key={p._id} post={p}/>
                ))} 
            </div>
        </div>
    )
}
