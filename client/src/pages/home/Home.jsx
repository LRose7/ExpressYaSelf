import './home.css';
import Navbar from '../../components/navbar/Navbar';
import LeftSidebar from '../../components/leftsidebar/LeftSidebar';
import  Feed  from '../../components/feed/Feed';
import RightSidebar from '../../components/rightsidebar/RightSidebar';

const Home= () => {
    return (
        <>
            <Navbar />
            <div className="homeContainer">
                <LeftSidebar />
                <Feed />
                <RightSidebar />
            </div>
        </>
    )
}

export default Home