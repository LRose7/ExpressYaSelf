import Chat from '../../components/chat/Chat';
import ChatOnline from '../../components/chatonline/ChatOnline';
import Message from '../../components/message/Message';
import Navbar from '../../components/navbar/Navbar';
import './messenger.css';

const Messenger = () => {
    return (
        <>
            <Navbar />
            <div className='messengerContainer'>
                <div className="chatMenu">
                    <div className="chatMenuWrapper">
                        <input type="text" placeholder='Search for friends' className="chatMenuInput" />
                        <Chat />
                        <Chat />
                        <Chat />
                        <Chat />
                    </div>
                </div>
                <div className="chatBox">
                    <div className="chatBoxWrapper">
                        <div className="chatBoxTop">
                            <Message />
                            <Message own={true} />
                            <Message />
                            <Message own={true} />  
                            <Message />
                            <Message />
                            <Message />
                            <Message /> 
                            <Message />
                            <Message />
                            <Message /> 
                            <Message />
                            <Message />                        
                            <Message />
                            <Message />
                            <Message />
                            <Message />
                            <Message />
                            <Message />
                            <Message />
                            <Message />
                            <Message />
                            <Message />
                            <Message />
                            <Message />
                        </div>
                        <div className="chatBoxBottom">
                            <textarea 
                            placeholder='write something...' 
                            name="" 
                            id="" 
                            cols="30" 
                            rows="10" 
                            className="chatMessageInput"
                            ></textarea>
                            <button className="chatSubmitBtn">Send</button>
                        </div>
                    </div>
                </div>
                <div className="chatOnline">
                    <div className="chatOnlineWrapper">
                        <ChatOnline />
                    </div>
                </div>
            </div>
        </>
       
    )
}

export default Messenger