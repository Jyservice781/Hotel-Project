
import './App.css';
import {Route, Routes} from "react-router-dom";
import ReplyList from "./reply/ReplyList";

function App() {
  return (
    <Routes>
        {/* hotel 의 id 값을 받아와야 함 */}
        <Route path={"/reply/selectList/"} element={<ReplyList/>}/>
    </Routes>
  );
}

export default App;
