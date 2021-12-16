import './leftsidebar.css';
import { 
    RssFeed, 
    Bookmarks, 
    Help, 
    Work, 
    Event, 
    Group, 
    Chat, 
    School 
} from '@mui/icons-material';
import { Users } from '../../dummyData';
import Friend from '../friend/Friend';
 
export default function LeftSidebar() {
    return (
        <div className="leftSidebar">
           <div className="leftSidebarWrapper">
               <ul className="leftSidebarList">
                   <li className="leftSidebarListItem">
                        <RssFeed className="leftSidebarIcon" />
                        <span className="leftSidebarListItem">Feed</span>
                   </li>
                   <li className="leftSidebarListItem">
                        <Chat className="leftSidebarIcon" />
                        <span className="leftSidebarListItem">Chat</span>
                   </li>
                   <li className="leftSidebarListItem">
                        <Group className="leftSidebarIcon" />
                        <span className="leftSidebarListItem">Groups</span>
                   </li>
                   <li className="leftSidebarListItem">
                        <Bookmarks className="leftSidebarIcon" />
                        <span className="leftSidebarListItem">Bookmarks</span>
                   </li>
                   <li className="leftSidebarListItem">
                        <Help className="leftSidebarIcon" />
                        <span className="leftSidebarListItem">Questions</span>
                   </li>
                   <li className="leftSidebarListItem">
                        <Work className="leftSidebarIcon" />
                        <span className="leftSidebarListItem">Jobs</span>
                   </li>
                   <li className="leftSidebarListItem">
                        <Event className="leftSidebarIcon" />
                        <span className="leftSidebarListItem">Events</span>
                   </li>
                   <li className="leftSidebarListItem">
                        <School className="leftSidebarIcon" />
                        <span className="leftSidebarListItem">Courses</span>
                   </li>
               </ul>
               <button className="leftSidebarBtn">Show More</button>
               <hr className="leftSidebarHR"/>
               <ul className="leftSidebarFriendList">
                   {Users.map(u => (
                    <Friend key={u.id} user={u} />
                   ))}
               </ul>
           </div>
        </div>
    )
}
