import './friend.css';

export default function Friend({ user }) {

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    return (
        <li className="leftSidebarFriend">
            <img className="leftSidebarFriendImg" src={PF+user.profilePicture} alt="friendimg" />
            <span className="leftSidebarFriendName">{user.username}</span>
        </li>
    );
}
