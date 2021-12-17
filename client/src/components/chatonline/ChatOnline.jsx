import './chatonline.css';

const ChatOnline = () => {
    return (
        <div className="chatOnline">
            <div className="chatOnlineFriend">
                <div className="chatOnlineImgContainer">
                    <img 
                    src="https://static.independent.co.uk/s3fs-public/indy100/WyhbaWgdxZ/2701-15abj8l.jpg" 
                    alt="friendimg" 
                    className="chatOnlineImg" 
                    />
                    <div className="chatOnlineBadge"></div>
                </div>
                <span className="chatOnlineName">Fred Mertz</span> 
            </div>

            <div className="chatOnlineFriend">
                <div className="chatOnlineImgContainer">
                    <img 
                    src="https://static.independent.co.uk/s3fs-public/indy100/WyhbaWgdxZ/2701-15abj8l.jpg" 
                    alt="friendimg" 
                    className="chatOnlineImg" 
                    />
                    <div className="chatOnlineBadge"></div>
                </div>
                <span className="chatOnlineName">Fred Mertz</span> 
            </div>

            <div className="chatOnlineFriend">
                <div className="chatOnlineImgContainer">
                    <img 
                    src="https://static.independent.co.uk/s3fs-public/indy100/WyhbaWgdxZ/2701-15abj8l.jpg" 
                    alt="friendimg" 
                    className="chatOnlineImg" 
                    />
                    <div className="chatOnlineBadge"></div>
                </div>
                <span className="chatOnlineName">Fred Mertz</span> 
            </div>
        </div>
    );
};

export default ChatOnline