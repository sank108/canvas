
import './App.css';
import Canva from './components/Canva';

function App() {
  return (
    <div className="m-0 p-0 w-full h-screen flex justify-center items-center">
      <Canva width={window.innerWidth} height={window.innerHeight}/>
    </div>
  );
}

export default App;
