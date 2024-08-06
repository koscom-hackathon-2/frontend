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
import spread from "./asset/spread.png";
import scatter from "./asset/scatter.png";
import status from "./asset/status.png";
import toss from "./asset/toss.png";
import "highlight.js/styles/a11y-dark.css";

function App() {
    const guideMsg = JSON.parse(localStorage.getItem("guideMsg")) || [
        {
            "idx": uuidv4(),
            "question": "지난 5년간 장단기 금리 스프레드 차트 그려줘",
            "code_exec_result": {
                "image": spread,
                "text": "지난 2019년 08월 07일부터 2024년 08월 06일까지 5년 기간 동안의 3년 국고채와 10년 국고채의 스프레드를 그린 차트와 분석입니다. 장단기 금리 스프레드란 장기 국채 금리와 단기 국채 금리의 차이를 의미합니다. 일반적으로 10년 만기 국채 금리에서 3년 만기 국채 금리를 뺀 값을 사용합니다. 스프레드가 양수(Positive Spread)\n" +
                    "\n" +
                    "- 일반적으로 장기 금리가 단기 금리보다 높을 때 발생합니다.\n" +
                    "- 이는 경제가 성장할 것으로 예상되고, 인플레이션이 발생할 가능성이 있다는 신호로 해석됩니다.\n" +
                    "\n" +
                    "스프레드가 음수(Negative Spread) (역전된 수익률 곡선)\n" +
                    "\n" +
                    "- 일반적으로 단기 금리가 장기 금리보다 높을 때 발생합니다.\n" +
                    "- 이는 경제 침체의 신호로 해석될 수 있습니다. 투자자들은 단기적으로 높은 수익을 기대하며, 장기적으로는 경제 성장에 대한 신뢰가 낮기 때문입니다.\n" +
                    "\n" +
                    "2024년 08월 07일 기준 단기 국채 금리가 -0.386으로 장기 국채 금리 0.058 보다 낮으므로 경기 침체의 신호로 분석할 수 있습니다."
            }
        },
        {
            "idx": uuidv4(),
            "question": "소비자 심리지수와 KOSPI 200의 상관관계 그래프를 그려줘",
            "code_exec_result": {
                "image": scatter,
                "text": "2008년 08월부터 2024년 07월까지 국내 소비자 심리지수와 KOSPI 200 지수 사이의 상관관계 그래프와 분석입니다. \n" +
                    "\n" +
                    "소비자 심리지수(Consumer Sentiment Index)는 소비자들의 경제에 대한 신뢰와 기대를 측정하는 지표입니다. 이 지수는 경제 활동에 다양한 영향을 미치며, 여러 경로를 통해 경제 전반에 중요한 역할을 합니다. 소비자 심리지수가 높으면 소비자들은 경제 상황에 대해 긍정적으로 인식하고, 미래에 대한 기대가 밝다는 것을 의미합니다. 이는 소비자들이 더 많은 지출을 할 가능성이 높아져 소비 지출이 증가합니다. 또한 소비자들이 저축보다 지출을 선호하거나, 주식이나 부동산 등 투자에 더 적극적으로 나설 가능성이 높습니다.\n" +
                    "\n" +
                    "그러나 위의 자료 분석 결과, 소비자 심리지수와 KOSPI 200 간의 는 피어슨 상관계수는 0.051 에 불과한 것으로 드러났습니다. 이는 매우 낮은 상관관계를 가짐을 시사하며, KOSPI 200에 더욱 주요하게 영향을 끼치는 다른 변수의 존재를 암시합니다."
            }
        },
        {
            "idx": uuidv4(),
            "question": "우리나라 전체 증권사의 유가증권 보유액 현황을 보여줘",
            "code_exec_result": {
                "image": status,
                "text": "2024년 08월 07일 기준 우리나라 전체 증권사의 자산현황(유가증권)을 비교하여 top5 증권사의 유가증권 자산현황을 나타낸 차트와 분석입니다. (단위: 100만원)\n" +
                    "\n" +
                    "1위: 미래에셋증권 주식회사, 2위 한국투자증권, 3위: KB증권주식회사, 4위: 메리츠증권(주), 5위: 하나증권주식회사\n" +
                    "\n" +
                    "유가증권 계의 산출은 당기손익-공정가치측정증권, 기타포괄손익-공정가치측정증권, 상각후원가측정증권, 관계회사투자지분, 파생결합증권의 총액으로 산정됩니다."
            }
        },
        {
            "idx": uuidv4(),
            "question": "토스증권, 카카오페이증권, 현대차증권사의 증권거래  현황을 비교해서 보여줘",
            "code_exec_result": {
                "image": toss,
                "text": "금융감독원 금융통계정보시스템의 2024년 3월 공시 데이터에 따라, 토스증권 주식회사, 주식회사 카카오페이증권, 현대차증권주식회사의 증권거래 품목별 비율 현황 그래프입니다. \n" +
                    "\n" +
                    "토스증권 주식회사는 외화증권거래 100% 비율을 보이며, 카카오페이증권과 현대차증권은 모두 채무증권거래가 88.5%와 81.3%로 가장 높음을 확인할 수 있습니다. 다만, 단순히 비율로 비교하는 것은 위험합니다. 현대차증권의 전체 거래액은 250,932,807 백만원으로 카카오페이증권의 전체거래액 3,366,573 백만원의 75배 규모 차이를 보이고 있습니다. 세부지표 및 금액을 유의하여 투자에 참고하시길 바랍니다."
            }
        }
    ];

    localStorage.setItem("guideMsg", JSON.stringify(guideMsg));

    const location = useLocation();
    const bookmark = Bookmark();
    const help = Help();
    const [generatedCode, setGeneratedCode] = useState("");
    const [loading, setLoading] = useState(false);
    const [msgHistory, setMsgHistory] = useState([]);
    const [message, setMessage] = useState("");
    const [sentMessage, setSentMessage] = useState("");
    const [aianswer, setAianswer] = useState("");
    const [responseImage, setResponseImage] = useState("");
    const [responseImage2, setResponseImage2] = useState("");
    const [currentMark, setCurrentMark] = useState(false);
    const [uid, setUid] = useState("");
    const [news, setNews] = useState([]);

    const messagehandler = async (e, message, idx) => {
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
                    "img": responseImage,
                    "img2": responseImage2
                };
                setMsgHistory(prevItems => [...prevItems, chat]);
            }
            setLoading(true);
            setMessage("");
            setSentMessage(message);
            setAianswer("");
            setResponseImage("");
            setResponseImage2("");
            setUid(uuidv4());
            setCurrentMark(false);
            try {
                if (message.trim().length <= 5) {
                    setAianswer("죄송합니다. 입력하신 \"" + message + "\"는 너무 짧아 정확한 답변을 제공하기 어려운 점 양해해주시기 바랍니다. 정확하고 효과적인 답변을 위해 더욱 구체적으로 질문해주시기 바랍니다.");
                } else {
                    if (idx) {
                        const response = await fetch('http://localhost:8080/news', {
                            // mode: 'no-cors',
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({user_message: message}),
                        });

                        const newsData = await response.json();

                        const data = JSON.parse(localStorage.getItem("guideMsg"));
                        setGeneratedCode(data.filter(d => d.idx === idx).map(d => d.generated_code)[0]);
                        setResponseImage2(data.filter(d => d.idx === idx).map(d => d.code_exec_result.image)[0]);
                        setAianswer(data.filter(d => d.idx === idx).map(d => d.code_exec_result.text)[0]);
                        if (newsData.news_result !== undefined) {
                            setNews(newsData.news_result.news);
                        }
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
                            if (data.generated_code === null && data.code_exec_result === null) {
                                setAianswer("죄송합니다. 현재 해당 API에 접근할 수 없어 답변이 어려운 점 참고 부탁드립니다. 어떤 도움이 필요하신가요?");
                            } else {
                                setGeneratedCode(data.generated_code);
                                setResponseImage(data.code_exec_result.image);
                                setAianswer(data.code_exec_result.text);
                                if (data.news_result !== undefined) {
                                    setNews(data.news_result.news);
                                }
                            }
                        }
                    }
                }
            } catch (error) {
                setAianswer("죄송합니다. 현재 해당 API에 접근할 수 없어 답변이 어려운 점 참고 부탁드립니다. 어떤 도움이 필요하신가요?");
                console.error("에러 발생:", error);
            } finally {
                setLoading(false);
            }
        }
    };

    const removeItem = (txt) => {
        const tmp = msgHistory.map((item) => {
            if (item.idx === txt.idx) {
                item.mark = false;
            }
            return item;
        });
        setMsgHistory(tmp);

        let list = JSON.parse(localStorage.getItem("list"));
        localStorage.setItem("list", JSON.stringify(list.filter(item => item.idx !== txt.idx)));
    }

    const addItem = (txt) => {
        const tmp = msgHistory.map((item) => {
            if (item.idx === txt.idx) {
                item.mark = true;
            }
            return item;
        });
        setMsgHistory(tmp);

        let list = JSON.parse(localStorage.getItem("list"));
        list.push(txt);
        localStorage.setItem("list", JSON.stringify(list));
    }

    function clickGuideBox(msg, e) {
        setMessage(msg.question);
        messagehandler(e, msg.question, msg.idx);
    }

    let loc = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (loc.state) {
            handleEvent(loc.state);
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

    const handleEvent = (msg) => {
        clickGuideBox(msg, null);
    };

    function sleep(sec) {
        return new Promise(resolve => setTimeout(resolve, sec * 1000));
    }

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
                                                       {sentMessage || message || msgHistory[0] ? (
                                                           <div className="flex flex-col">
                                                               {/* old chat */}
                                                               {msgHistory.map(h => (
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
                                                                       {(h.a || h.img) && (
                                                                           <div
                                                                               className="col-start-1 col-end-8 p-3 rounded-lg">
                                                                               <div
                                                                                   className="flex flex-row items-center">
                                                                                   <img
                                                                                       className="items-center justify-center h-10 w-10 rounded-full flex-shrink-0"
                                                                                       src={komi}
                                                                                       alt=""/>
                                                                                   <div
                                                                                       className="relative ml-3 text-lg bg-white py-2 px-4 shadow rounded-xl">
                                                                                       {h.img ?
                                                                                           <img
                                                                                               src={`data:image/png;base64,${h.img}`}/> :

                                                                                           (h.img2 ?
                                                                                                   <img src={h.img2}/> :
                                                                                                   <div></div>
                                                                                           )
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
                                                                                   {sentMessage}
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
                                                                   {(aianswer || responseImage || responseImage2) && (
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
                                                                                           src={`data:image/png;base64,${responseImage}`}/> :

                                                                                       (responseImage2 ?
                                                                                               <img
                                                                                                   src={responseImage2}/> :
                                                                                               <div></div>
                                                                                       )
                                                                                   }
                                                                                   <TypingAnimation text={aianswer}/>
                                                                               </div>
                                                                           </div>
                                                                       </div>
                                                                   )
                                                                   }
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
                                                                           <img src={chart3}></img>
                                                                       </div>
                                                                       <div
                                                                           className="guide-text">{guideMsg[0].question}</div>
                                                                       <div className="icon2">
                                                                           <img src={next}></img>
                                                                       </div>
                                                                   </div>
                                                               </button>
                                                               <button onClick={(e) => clickGuideBox(guideMsg[1], e)}>
                                                                   <div
                                                                       className="guide-card animate-fade-up animate-delay-100">
                                                                       <div className="icon1">
                                                                           <img src={chart1}></img>
                                                                       </div>
                                                                       <div
                                                                           className="guide-text">{guideMsg[1].question}</div>
                                                                       <div className="icon2">
                                                                           <img src={next}></img>
                                                                       </div>
                                                                   </div>
                                                               </button>
                                                               <button onClick={(e) => clickGuideBox(guideMsg[2], e)}>
                                                                   <div
                                                                       className="guide-card animate-fade-up animate-delay-200">
                                                                       <div className="icon1">
                                                                           <img src={chart2}></img>
                                                                       </div>
                                                                       <div
                                                                           className="guide-text">{guideMsg[2].question}</div>
                                                                       <div className="icon2">
                                                                           <img src={next}></img>
                                                                       </div>
                                                                   </div>
                                                               </button>
                                                               <button onClick={(e) => clickGuideBox(guideMsg[3], e)}>
                                                                   <div
                                                                       className="guide-card animate-fade-up animate-delay-300">
                                                                       <div className="icon1">
                                                                           <img src={chart4}></img>
                                                                       </div>
                                                                       <div
                                                                           className="guide-text">{guideMsg[3].question}</div>
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
                                                       onSubmit={(e) => messagehandler(e, message, null)}
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
                                               <p className="text-center text-gray-400 py-2 text-sm">* AI가 작성한
                                                   답변이며 실제와 다를 수 있으므로 참고 자료로만 활용하시고,
                                                   S-TALK는 법적 책임을 지지 않는다는 점 참고바랍니다.</p>
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
                                    {news.length !== 0 ?
                                        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                                            <ul className="space-y-2 font-medium mt-2 mb-2">
                                                <h5 className="mb-2 pt-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">📰
                                                    News</h5>
                                                {news.map((n) => (
                                                    <div
                                                        className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                                        <h4 className="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">{n.title}</h4>
                                                        <p className="font-small text-gray-700 dark:text-gray-400">{n.source}, {n.date}</p>
                                                        <a href={n.link} target="_blank"
                                                           rel="noopener noreferer nofollow"
                                                           className="mt-2 inline-flex items-center px-2 py-1.5 text-sm font-medium text-center text-white bg-orange-500 rounded-lg hover:bg-orange-300 focus:ring-4 focus:outline-none focus:ring-orange-500 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:orange-800">
                                                            Read more
                                                            <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true"
                                                                 xmlns="http://www.w3.org/2000/svg" fill="none"
                                                                 viewBox="0 0 14 10">
                                                                <path stroke="currentColor" strokeLinecap="round"
                                                                      strokeLinejoin="round"
                                                                      strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                                                            </svg>
                                                        </a>
                                                    </div>
                                                ))}
                                            </ul>
                                        </div> : <div></div>
                                    }
                                    <div
                                        className="h-full px-3 py-4 overflow-y bg-gray-50 dark:bg-gray-800">
                                        {generatedCode ?
                                            <div className="space-y-2 mt-2 mb-2 pl-1">
                                                <h1 className="text-2xl font-extrabold pt-4">🤖 Generated Code</h1>
                                                <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                                                    {"```python\n" + generatedCode + "\n" + "```"}
                                                </ReactMarkdown>
                                            </div>
                                            : <div></div>
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
