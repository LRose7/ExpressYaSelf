import './rightsidebar.css';
import { Cake, Add, Remove } from '@mui/icons-material';
import { Users } from '../../dummyData';
import Online from '../online/Online';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import { Link } from 'react-router-dom';


export default function RightSidebar({ user }) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [friends, setFriends] = useState([]);
    const { user: currentUser, dispatch } = useContext(AuthContext);
    const [followed, setFollowed] = useState(currentUser.followings.includes(user?._id));

    useEffect(() => {
        const getFriends = async () => {
            try {
                const friendList = await axios.get("/users/friends/" + user._id);
                setFriends(friendList.data);
            } catch (error) {
                console.log(error);
            }
        };
        getFriends();
    },[user]);

    const handleFollow = async () => {
        try {
            if (followed) {
                await axios.put(`/users/${user._id}/unfollow`, { userId: currentUser._id });
                dispatch({ type: "UNFOLLOW", payload: user._id });
            } else {
                await axios.put(`/users/${user._id}/follow`, { userId: currentUser._id });
                dispatch({ type: "FOLLOW", payload: user._id });
            }
            setFollowed(!followed);
        } catch (error) {
            console.log(error);
        }
    };

    const HomeRightSidebar = () => {
        return (
            <>
                <div className="birthdayContainer">
                    <Cake className="birthdayImg" />
                    <span className="birthdayText"><b>Brandy Wine</b> and <b>3 others friends</b> have a birthday today</span>
                </div>
                {/* Advertisements to make some money! */}
                <img src={PF+"ad.jpg"} className="rightSidebarAd" alt="sidebarad"/>
                <h4 className="rightSidebarTitle">Online Friends</h4>
                <ul className="rightSidebarFriendList">
                {Users.map(u => (
                    <Online key={u.id} user={u} />
                ))}
                </ul>
            </>
        );
    };

    const ProfileRightSidebar = () => {
        return (
            <>
            { user.username !== currentUser.username && (
                <button className="rightSidebarFollowbtn" onClick={handleFollow}>
                { followed ? "Unfollow" : "Follow" }
                { followed ? <Remove /> : <Add/> }
                </button>
            )}
                <h4 className="rightSidebarTitle">User Information</h4>
                <div className="rightSidebarInfo">
                    <div className="rightSidebarInfoItem">
                        <span className="rightSidebarInfoKey">City:</span>
                        <span className="rightSidebarInfoValue">{user.city}</span>
                    </div>
                    <div className="rightSidebarInfoItem">
                        <span className="rightSidebarInfoKey">From:</span>
                        <span className="rightSidebarInfoValue">{user.from}</span>
                    </div>
                    <div className="rightSidebarInfoItem">
                        <span className="rightSidebarInfoKey">Relationship:</span>
                        <span className="rightSidebarInfoValue">
                            {user.relationship ===1 
                            ? "Single" 
                            : user.relationship ===2 
                            ? "Married" 
                            : "unknown"}
                        </span>
                    </div>
                    <h4 className="rightSidebarTitle">User Friends</h4>
                    <div className="rightSidebarFollowings">
                        {friends.map(friend => (
                            <Link to={ "/profile/" + friend.username } style={{ textDecoration: "none" }}>
                                <div className="rightSidebarFollowing">
                                    <img src={
                                        friend.profilePicture 
                                        ? PF + friend.profilePicture 
                                        : PF + "people/noavatar.png"
                                    } alt="friendimg" 
                                    className="rightSidebarFollowingImg" 
                                    />
                                    <span className="rigthSidebarFollowingName">{friend.username}</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </>
        );
    };


    return (
        <div className="rightSidebarContainer">
            <div className="rightSidebarWrapper">
                {user ? <ProfileRightSidebar/> : <HomeRightSidebar/>}
            </div>
        </div>
    );
};
