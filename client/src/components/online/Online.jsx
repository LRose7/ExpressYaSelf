import './online.css';

export default function Online({ user }) {

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    
    return (
        <li className="rightSidebarFriend">
            <div className="rightSidebarProfileImgContainer">
                <img 
                className="rightSidebarProfileImg"
                src={PF+user.profilePicture}
                alt="rightprofileimg" 
                />
                <span className="rightSidebarOnline"></span>
            </div>
            <span className="rightSidebarUsername">{user.username}</span>
        </li>
    );
}
