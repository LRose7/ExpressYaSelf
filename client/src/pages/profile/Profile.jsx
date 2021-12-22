import './profile.css';
import Navbar from '../../components/navbar/Navbar';
import LeftSidebar from '../../components/leftsidebar/LeftSidebar';
import Feed from '../../components/feed/Feed';
import RightSidebar from '../../components/rightsidebar/RightSidebar';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';

export default function Profile() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [user, setUser] = useState({});
    const username = useParams().username;
    
    useEffect(() => {
        try {
            const fetchUser = async () => {
                const res = await axios.get(`/users?username=${username}`);
                setUser(res.data);
            };
            fetchUser();
        } catch (error) {
            console.log(error);
        }
    }, [username]);

    return (
        <>
            <Navbar />
            <div className="profileContainer">
                <LeftSidebar />
                <div className="profileRight">
                    <div className="profileRightTop">
                        <div className="profileCover">
                            <img 
                            className="profileCoverImg" 
                            src={user.coverPicture ? PF + user.coverPicture : PF + "people/noCover.jpg"}
                            alt=""  />
                            <img 
                            className="profileUserImg" 
                            src={user.profilePicture ? PF + user.coverPicture : PF + "people/noavatar.png"}
                            alt=""  />
                        </div>
                        <div className="profileInfo">
                            <h4 className="profileInfoName">{user.username}</h4>
                            <h4 className="profileInfoDesc">{user.descr}</h4>
                        </div>                       
                    </div>
                    <div className="profileRightBottom">
                        <Feed username={username}/>
                        <RightSidebar user={user} /> {/* this "profile" props indicates whether the rightSidebar will be in the profile page or the home page */}
                    </div>    
                </div>
            </div>
        </>
    )
}
