import './navbar.css';
import { Search, Person, Chat, Notifications } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const Navbar = () => {
    const { user } = useContext(AuthContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
        <div className="navbarContainer">
        <div className="navbarLeft">
            <Link to="/" style={{textDecoration:"none"}}>
                <span className='logo'>ExpressYaSelf</span>
            </Link>
        </div>
        <div className="navbarCenter">
            <div className="searchbar">
                <Search className='searchIcon' />
                <input placeholder="Search for friend, post or video" className="searchInput" />
            </div>
        </div>
        <div className="navbarRight">
            <div className="navbarLinks">
                <span className="navbarLink">Timeline</span>
            </div>
            <div className="navbarIcons">
                <div className="navbarIconItem">
                    <Person />
                    <span className="navbarIconBadge">1</span>
                </div>
            </div>
            <div className="navbarIcons">
                <Link to="/messenger" style={{textDecoration: "none"}}>
                    <div className="navbarIconItem">
                        <Chat />
                        <span className="navbarIconBadge">1</span>
                    </div>
                </Link>
            </div>
            <div className="navbarIcons">
                <div className="navbarIconItem">
                    <Notifications />
                    <span className="navbarIconBadge">1</span>
                </div>
            </div>
            <Link to={`/profile/${user.username}`}>
                <img 
                src={
                    user.profilePicture 
                    ? PF+user.profilePicture 
                    : PF+"people/noavatar.png"
                } 
                alt="profilePic" 
                className="navbarProfilePic" 
                />
            </Link>
        </div>
    </div>
    )
};

export default Navbar