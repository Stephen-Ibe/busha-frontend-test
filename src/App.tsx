import MainContent from './components/blocks/MainContent';
import SideBar from './components/blocks/Sidebar';
import TopNav from './components/blocks/TopNav';

function App() {
  return (
    <>
      <TopNav />
      <div className='main mx-auto container'>
        <SideBar />
        <MainContent />
      </div>
    </>
  );
}

export default App;
