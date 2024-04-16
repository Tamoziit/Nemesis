import Sidebar from '../../components/sidebar/Sidebar';
import MessageContainer from '../../components/messages/MessageContainer';
import useConversation from '../../zustand/useConversation';

const Home = () => {
  const { selectedConversation } = useConversation();
  const isSmallScreen = window.innerWidth <= 650;

  return (
    <div className='flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
      {isSmallScreen ? (selectedConversation ? <MessageContainer /> : <Sidebar />) :
        <>
          <Sidebar />
          <MessageContainer />
        </>}
    </div>
  );
}

export default Home;
