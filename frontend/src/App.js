import React, {useState, useEffect} from 'react';
import {Routes, Route, useLocation, useNavigate} from "react-router-dom";
import {TransitionGroup, CSSTransition} from "react-transition-group";
import {v4 as uuidv4} from "uuid";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import Header from './components/Header';
import Bookmark from "./components/Bookmark";
import Help from "./components/Help";
import TypingAnimation from "./components/TypingAnimation";
import ChattingSideBar from './components/ChattingSideBar';
import Loader from "./components/Loader";
import komi from "./asset/komi.png";
import mark from "./asset/mark.svg";
import unmark from "./asset/unmark.svg";
import unmark_gray from "./asset/unmark_gray.svg";
import next from "./asset/next-button.png";
import chart1 from "./asset/chart1.svg";
import chart2 from "./asset/chart2.svg";
import chart3 from "./asset/chart3.svg";
import chart4 from "./asset/chart4.svg";
import "highlight.js/styles/a11y-dark.css";

function App() {
    const guideMsg = [
        "삼성전자 월말 종가 변화를 알려줘",
        "공휴일 전날의 네이버의 외국인 투자자 매도 매수 현황을 보여줘",
        "실적 발표 전날과 다음날의 네이버 주주 구성을 알려줘",
        "나스닥 지수와 SK텔레콤 주가의 상관관계를 알려줘"
    ];

    const location = useLocation();
    const bookmark = Bookmark();
    const help = Help();
    const [generatedCode, setGeneratedCode] = useState("");
    const [loading, setLoading] = useState(false);
    const [history, setHistory] = useState([]);
    const [message, setMessage] = useState("");
    const [sentMessage, setSentMessage] = useState("");
    const [aianswer, setAianswer] = useState("");
    const [responseImage, setResponseImage] = useState("");
    const [currentMark, setCurrentMark] = useState(false);
    const [uid, setUid] = useState("");
    const ans = "\n\n AI가 작성한 답변이며 실제와 다를 수 있으므로 참고 자료로만 활용하시고, 코스콤은 법적 책임을 지지 않는다는 점 참고바랍니다."

    const messagehandler = async (e, message) => {
        if (e) {
            e.preventDefault();
        }

        if (!loading) {
            if (sentMessage) {
                // history 쌓기
                const chat = {
                    "idx": uid,
                    "mark": currentMark,
                    "text": sentMessage,
                    "a": aianswer,
                    "img": responseImage
                };
                setHistory(prevItems => [...prevItems, chat]);
            }
            setLoading(true);
            setMessage("");
            setSentMessage(message);
            setAianswer("");
            setResponseImage("");
            setUid(uuidv4());
            setCurrentMark(false);
            try {
                if (message.trim().length <= 5) {
                    setAianswer("죄송합니다. 입력하신 \"" + message + "\"는 너무 짧아 정확한 답변을 제공하기 어려운 점 양해해주시기 바랍니다. 정확하고 효과적인 답변을 위해 더욱 구체적으로 질문해주시기 바랍니다.");
                } else {
                    const response = await fetch('http://103.244.111.246:8080/chat-completion', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({user_message: message}),
                    });

                    const data = await response.json();
                    if (data != null) {
                        if (data.generated_code === null || data.code_exec_result === null) {
                            setAianswer("죄송합니다. 주식 이외의 질문은 답변해 드리지 않는 점 참고 부탁드립니다. 어떤 도움이 필요하신가요?");
                        } else {
                            setGeneratedCode(data.generated_code);
                            setResponseImage(data.code_exec_result.image);
                            setAianswer(data.code_exec_result.text ? data.code_exec_result.text + ans : ans);
                        }
                    }
                }
            } catch (error) {
                console.error("에러 발생:", error);
            } finally {
                setLoading(false);
            }
        }
    };

    const removeItem = (txt) => {
        const tmp = history.map((item) => {
            if (item.idx === txt.idx) {
                item.mark = false;
            }
            return item;
        });
        setHistory(tmp);

        let list = JSON.parse(localStorage.getItem("list"));
        localStorage.setItem("list", JSON.stringify(list.filter(item => item.idx !== txt.idx)));
    }

    const addItem = (txt) => {
        const tmp = history.map((item) => {
            if (item.idx === txt.idx) {
                item.mark = true;
            }
            return item;
        });
        setHistory(tmp);

        let list = JSON.parse(localStorage.getItem("list"));
        list.push(txt);
        localStorage.setItem("list", JSON.stringify(list));
    }

    function clickGuideBox(msg, e) {
        setMessage(msg);
        messagehandler(e, msg);
    }

    let loc = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (loc.state) {
            handleEvent(loc.state.text);
        }

        // 새로 고침 시 상태를 제거
        const clearStateOnUnload = () => {
            navigate(location.pathname, {replace: true, state: null});
        };

        window.addEventListener('beforeunload', clearStateOnUnload);

        return () => {
            window.removeEventListener('beforeunload', clearStateOnUnload);
        };

    }, [loc.state, navigate]);

    const handleEvent = (text) => {
        clickGuideBox(text, null);
    };

    return (
        <div className="w-full overflow-x-hidden">
            <Header/>
            <TransitionGroup>
                <div className="flex h-screen antialiased text-gray-800">
                    <div className="flex flex-row w-full overflow-x-hidden">
                        <div className="flex flex-col py-8 pl-4 w-1/6 bg-white flex-shrink-0">
                            <ChattingSideBar/>
                        </div>
                        <CSSTransition key={location.pathname} timeout={500}>
                            <Routes>
                                <Route path="/"
                                       element={
                                           <div className="relative flex flex-col p-6 flex-auto">
                                               <div
                                                   className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 p-4 mt-12">
                                                   <div className="flex flex-col h-full overflow-x-auto mb-4">
                                                       {sentMessage || message || history[0] ? (
                                                           <div className="flex flex-col">
                                                               {/* old chat */}
                                                               {history.map(h => (
                                                                   <div className="grid grid-cols-12 gap-y-2">
                                                                       {h.text && (
                                                                           <div
                                                                               className="col-start-6 col-end-13 p-3 rounded-lg">
                                                                               <div
                                                                                   className="flex items-center justify-start flex-row-reverse">
                                                                                   <div
                                                                                       className="flex items-center justify-center h-10 w-10 rounded-full text-white bg-orange-600 flex-shrink-0">
                                                                                       U
                                                                                   </div>
                                                                                   <div
                                                                                       className="relative mr-3 text-lg bg-orange-200 py-2 px-4 shadow rounded-xl">
                                                                                       {h.text}
                                                                                   </div>
                                                                                   {h.mark ?
                                                                                       <button
                                                                                           className="bookmark-icon flex-shrink-0"
                                                                                           onClick={() => removeItem(h)}>
                                                                                           <img src={mark}/>
                                                                                       </button>
                                                                                       :
                                                                                       <button
                                                                                           className="bookmark-icon flex-shrink-0"
                                                                                           onClick={() => addItem(h)}>
                                                                                           <img src={unmark_gray}
                                                                                                onMouseOver={e => e.currentTarget.src = unmark}
                                                                                                onMouseOut={e => e.currentTarget.src = unmark_gray}
                                                                                           />
                                                                                       </button>
                                                                                   }
                                                                               </div>
                                                                           </div>
                                                                       )}
                                                                       {h.a && (
                                                                           <div
                                                                               className="col-start-1 col-end-8 p-3 rounded-lg">
                                                                               <div
                                                                                   className="flex flex-row items-center">
                                                                                   <img
                                                                                       className="flex items-center justify-center h-10 w-10 rounded-full flex-shrink-0"
                                                                                       src={komi}
                                                                                       alt=""/>

                                                                                   <div
                                                                                       className="relative ml-3 text-lg bg-white py-2 px-4 shadow rounded-xl">
                                                                                       {h.img ?
                                                                                           <img
                                                                                               src={`data:image/jpeg;base64,${h.img}`}/> :
                                                                                           <div></div>
                                                                                       }
                                                                                       {h.a ? h.a : <div/>}
                                                                                   </div>
                                                                               </div>
                                                                           </div>)}
                                                                   </div>
                                                               ))}
                                                               {/* new chat */}
                                                               <div className="grid grid-cols-12 gap-y-2">
                                                                   {sentMessage && (
                                                                       <div
                                                                           className="animate-fade-up animate-delay-100 col-start-6 col-end-13 p-3 rounded-lg">
                                                                           <div
                                                                               className="flex items-center justify-start flex-row-reverse">
                                                                               <div
                                                                                   className="flex items-center justify-center h-10 w-10 rounded-full text-white bg-orange-600 flex-shrink-0">
                                                                                   U
                                                                               </div>
                                                                               <div
                                                                                   className="animate-fade-up relative mr-3 text-lg bg-orange-200 py-2 px-4 shadow rounded-xl">
                                                                                   <TypingAnimation text={sentMessage}/>
                                                                               </div>
                                                                               {currentMark ?
                                                                                   <button
                                                                                       className="bookmark-icon flex-shrink-0"
                                                                                       onClick={() => {
                                                                                           setCurrentMark(false);
                                                                                           removeItem({
                                                                                               "idx": uid,
                                                                                               "mark": false,
                                                                                               "text": sentMessage
                                                                                           });
                                                                                       }}>
                                                                                       <img src={mark}/>
                                                                                   </button>
                                                                                   :
                                                                                   <button
                                                                                       className="bookmark-icon flex-shrink-0"
                                                                                       onClick={() => {
                                                                                           setCurrentMark(true);
                                                                                           addItem({
                                                                                               "idx": uid,
                                                                                               "mark": true,
                                                                                               "text": sentMessage
                                                                                           });
                                                                                       }}>
                                                                                       <img src={unmark_gray}
                                                                                            onMouseOver={e => e.currentTarget.src = unmark}
                                                                                            onMouseOut={e => e.currentTarget.src = unmark_gray}
                                                                                       />
                                                                                   </button>
                                                                               }
                                                                           </div>
                                                                       </div>
                                                                   )}
                                                                   {aianswer && (
                                                                       <div
                                                                           className="animate-fade-up animate-delay-100 col-start-1 col-end-8 p-3 rounded-lg">
                                                                           <div className="flex flex-row items-center">
                                                                               <img
                                                                                   className="flex items-center justify-center h-10 w-10 rounded-full flex-shrink-0"
                                                                                   src={komi}
                                                                                   alt=""/>
                                                                               <div
                                                                                   className="relative ml-3 text-lg bg-white py-2 px-4 shadow rounded-xl">
                                                                                   {responseImage ?
                                                                                       <img
                                                                                           src={`data:image/jpeg;base64,${responseImage}`}/> :
                                                                                       <div></div>
                                                                                   }
                                                                                   <TypingAnimation text={aianswer}/>
                                                                               </div>
                                                                           </div>
                                                                       </div>)}
                                                                   {loading && (<Loader/>)}
                                                               </div>
                                                           </div>
                                                       ) : (
                                                           <div className="guide-box">
                                                               <button onClick={(e) => {
                                                                   clickGuideBox(guideMsg[0], e);
                                                               }}>
                                                                   <div className="guide-card animate-fade-up">
                                                                       <div className="icon1">
                                                                           <img src={chart2}></img>
                                                                       </div>
                                                                       <div className="guide-text">{guideMsg[0]}</div>
                                                                       <div className="icon2">
                                                                           <img src={next}></img>
                                                                       </div>
                                                                   </div>
                                                               </button>
                                                               <button onClick={(e) => clickGuideBox(guideMsg[1], e)}>
                                                                   <div
                                                                       className="guide-card animate-fade-up animate-delay-100">
                                                                       <div className="icon1">
                                                                           <img src={chart3}></img>
                                                                       </div>
                                                                       <div className="guide-text">{guideMsg[1]}</div>
                                                                       <div className="icon2">
                                                                           <img src={next}></img>
                                                                       </div>
                                                                   </div>
                                                               </button>
                                                               <button onClick={(e) => clickGuideBox(guideMsg[2], e)}>
                                                                   <div
                                                                       className="guide-card animate-fade-up animate-delay-200">
                                                                       <div className="icon1">
                                                                           <img src={chart4}></img>
                                                                       </div>
                                                                       <div className="guide-text">{guideMsg[2]}</div>
                                                                       <div className="icon2">
                                                                           <img src={next}></img>
                                                                       </div>
                                                                   </div>
                                                               </button>
                                                               <button onClick={(e) => clickGuideBox(guideMsg[3], e)}>
                                                                   <div
                                                                       className="guide-card animate-fade-up animate-delay-300">
                                                                       <div className="icon1">
                                                                           <img src={chart1}></img>
                                                                       </div>
                                                                       <div className="guide-text">{guideMsg[3]}</div>
                                                                       <div className="icon2">
                                                                           <img src={next}></img>
                                                                       </div>
                                                                   </div>
                                                               </button>
                                                           </div>
                                                       )}
                                                   </div>
                                                   <form
                                                       className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4"
                                                       onSubmit={(e) => messagehandler(e, message)}
                                                       disabled={loading}>
                                                       <div>
                                                           <div
                                                               className="flex items-center justify-center text-gray-400 hover:text-gray-600">
                                                               <svg className="w-5 h-5"
                                                                    fill="none"
                                                                    stroke="currentColor"
                                                                    viewBox="0 0 24 24"
                                                                    xmlns="http://www.w3.org/2000/svg">
                                                                   <path
                                                                       strokeLinecap="round"
                                                                       strokeLinejoin="round"
                                                                       strokeWidth="2"
                                                                       d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                                                                   ></path>
                                                               </svg>
                                                           </div>
                                                       </div>

                                                       <div className="flex-grow ml-4">
                                                           <div className="relative w-full">
                                                               <input
                                                                   type="text"
                                                                   className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                                                                   placeholder='질문을 입력해주세요.'
                                                                   value={message}
                                                                   onChange={(e) => setMessage(e.target.value)}
                                                               />
                                                           </div>
                                                       </div>
                                                       <div className="ml-4">
                                                           <button type="submit"
                                                                   className="flex items-center justify-center bg-orange-600 hover:bg-orange-700 rounded-xl text-white px-4 py-1 flex-shrink-0">
                                                               <span>Send</span>
                                                               <span className="ml-2">
                                  <svg
                                      className="w-4 h-4 transform rotate-45 -mt-px"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                      xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                                    ></path>
                                  </svg>
                                </span>
                                                           </button>
                                                       </div>
                                                   </form>
                                               </div>
                                           </div>
                                       }/>
                                <Route path="/bookmark" element={bookmark}/>
                                <Route path="/help" element={help}/>
                            </Routes>
                        </CSSTransition>
                        <div className="flex flex-col py-8 w-1/4 bg-white flex-shrink-0">
                            <div className="h-full overflow-x-hidden">
                                <aside
                                    id="separator-sidebar"
                                    className="top-12 right-0 z-40 h-screen transition-transform -translate-x-full sm:translate-x-0"
                                    aria-label="Sidebar"
                                >
                                    <div
                                        className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                                        {generatedCode ?
                                            <div className="space-y-2 mt-2 mb-2 pl-1">
                                                <h1 className="text-2xl font-extrabold pt-4">🤖 Generated Code</h1>
                                                <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                                                    {"```python\n" + generatedCode + "\n" + "```"}
                                                </ReactMarkdown>
                                            </div>
                                            : null
                                        }
                                    </div>
                                </aside>
                            </div>
                        </div>
                    </div>
                </div>
            </TransitionGroup>
        </div>
    );
}

export default App;
