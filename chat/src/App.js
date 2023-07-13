import './App.css';
import { Route, Routes } from "react-router-dom"
import Join from "./component/Join/Join"
import Chat from './component/Chat/Chat';

function App() {

  

  return (
  <div className="App">
    <Routes>
      <Route path="/" element={<Join />} />
      <Route path="/chat" element={<Chat />} />
    </Routes>
</div>
)
}

  
    
  


export default App;
