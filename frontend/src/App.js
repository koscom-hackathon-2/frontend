import Header from './components/Header';
import ChattingSideBar from './components/ChattingSideBar';
import SimilarPrecedent from './components/SimilarPrecedent';
import React, {useState} from 'react';
import {Routes, Route, useLocation} from "react-router-dom";
import {TransitionGroup, CSSTransition} from "react-transition-group";
import Chatting from "./components/Chatting";
import Bookmark from "./components/Bookmark";
import Help from "./components/Help";

function App() {
    const [precedents, setPrecedents] = useState(null);
    const location = useLocation();
    const bookmark = Bookmark();
    const help = Help();
    const chatting = Chatting();

    return (
        <div className="w-full overflow-x-hidden">
            <Header/>
            <TransitionGroup>
                <div className="flex h-screen antialiased text-gray-800">
                    <div className="flex flex-row w-full overflow-x-hidden">
                        <div className="flex flex-col py-8 pl-4 w-64 bg-white flex-shrink-0">
                            <ChattingSideBar/>
                        </div>
                        <CSSTransition key={location.pathname} timeout={5000}>
                            <Routes>
                                <Route path="/" element={chatting}/>
                                <Route path="/bookmark" element={bookmark}/>
                                <Route path="/help" element={help}/>
                            </Routes>
                        </CSSTransition>
                        <div className="flex flex-col py-8 w-64 bg-white flex-shrink-0">
                            <SimilarPrecedent precedents={precedents}/>
                        </div>
                    </div>
                </div>
            </TransitionGroup>
        </div>
    );
}

export default App;
