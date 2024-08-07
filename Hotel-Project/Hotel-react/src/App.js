import React from "react";
import './App.css';
import {Route, Routes} from "react-router-dom";
import Write from "./reply/Write";
import Update from "./reply/Update";
import ReplyList from "./reply/ReplyList";
import ReplyList2 from "./reply/ReplyList2";

function App() {
  return (
    <div>
      <Routes>
          <Route path={"/reply/write/:hotelId"} element={<Write/>}/>
          <Route path={"/reply/update/:id"} element={<Update/>}/>
          <Route path={"/reply/replyList"} element={<ReplyList/>}/>
          <Route path={"/reply/replyList2/:hotelId"} element={<ReplyList2/>}/>
      </Routes>
    </div>
  );
}

export default App;
