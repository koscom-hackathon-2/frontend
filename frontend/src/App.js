import Header from './components/Header';
import ChattingSideBar from './components/ChattingSideBar';
import React, {useState} from 'react';
import {Routes, Route, useLocation} from "react-router-dom";
import {TransitionGroup, CSSTransition} from "react-transition-group";
import Chatting from "./components/Chatting";
import Bookmark from "./components/Bookmark";
import Help from "./components/Help";

function App() {
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
                        <CSSTransition key={location.pathname} timeout={500}>
                            <Routes>
                                <Route path="/" element={chatting}/>
                                <Route path="/bookmark" element={bookmark}/>
                                <Route path="/help" element={help}/>
                            </Routes>
                        </CSSTransition>
                    </div>
                </div>
            </TransitionGroup>
        </div>
    );
}

export default App;
