import './message.css';

const Message = ({ own }) => {
    return (
        <div className={own ? "message own" : "message"}>
            <div className="messageTop">
            <img src="https://www.naso.org/wp-content/uploads/2016/12/person-pointing.jpg" alt="userpic" className="messageImg" />
            <p className='messageText'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. </p>
            </div>
            <div className="messageBottom">1 hour ago</div>
        </div>
    );
};

export default Message