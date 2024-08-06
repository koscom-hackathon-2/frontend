import mark from "../asset/mark.svg";
import unmark from "../asset/unmark.svg";
import unmark_gray from "../asset/unmark_gray.svg";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {v4 as uuidv4} from "uuid";

function Bookmark() {
    const list = JSON.parse(localStorage.getItem("list")) || [
        {
            "idx": uuidv4(),
            "mark": true,
            "text": "ACE AI 반도체 포커스(469150) ETF 종목 구성을 pie chart로 그려줘"
        },
        {
            "idx": uuidv4(),
            "mark": true,
            "text": "삼성전자의 개인/기관/외국인 투자자의 비율을 pie chart로 그려줘."
        },
        {
            "idx": uuidv4(),
            "mark": true,
            "text": "지난 일주일동안 유가증권시장에서 가장 많이 오른 종목 5개와 가장 많이 떨어진 종목 5개의 주가 변동 비율을 막대 그래프로 그려줘"
        },
        {
            "idx": uuidv4(),
            "mark": true,
            "text": "지난 1년간 KOSPI 200과 삼성전자 종가의 scatter plot을 그려줘. 그리고 상관관계를 계산해줘"
        },
        {
            "idx": uuidv4(),
            "mark": true,
            "text": "삼성전자, SK하이닉스, 현대자동차 시가총액을 막대 그래프로 그려줘"
        },
        {
            "idx": uuidv4(),
            "mark": true,
            "text": "네이버의 6개월 동안의 저가, 고가를 모두 표현하는 box plot을 그려줘"
        }
    ]

    localStorage.setItem("list", JSON.stringify(list));


    const [originList, setOriginList] = useState(JSON.parse(localStorage.getItem("list")));

    const removeItem = (txt) => {
        const tmp = originList.map((item) => {
            if (item.idx === txt.idx) {
                item.mark = false;
            }
            return item;
        });
        setOriginList(tmp);

        let copyList = JSON.parse(localStorage.getItem("list"));
        copyList = copyList.filter(item => item.idx !== txt.idx);

        localStorage.setItem("list", JSON.stringify(copyList));
    }

    const addItem = (txt) => {
        const tmp = originList.map((item) => {
            if (item.idx === txt.idx) {
                item.mark = true;
            }
            return item;
        });
        setOriginList(tmp);

        let copyList = JSON.parse(localStorage.getItem("list"));
        copyList.push(txt);
        localStorage.setItem("list", JSON.stringify(copyList));
    }

    const navigate = useNavigate();

    const handleClick = (txt) => {
        // 이동하면서 상태 전달
        navigate('/', {state: {txt}, replace: true},);
    };

    return <div className="flex flex-col flex-auto p-6">
        <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 p-4 mt-12 ">
            <div className="flex flex-col h-full overflow-x-auto mb-4 animate-fade-up animate-delay-100">
                <div className="flex flex-col">
                    <div className="title">BOOKMARK</div>
                    <div className="bookmark-box">
                        {
                            originList.map((txt, index) => (
                                <div className={"bookmark-card animate-fade-up animate-delay-" + index * 100}>
                                    {txt.mark ?
                                        <button className="bookmark-icon absolute" onClick={() => removeItem(txt)}>
                                            <img src={mark}/>
                                        </button> :
                                        <button className="bookmark-icon absolute" onClick={() => addItem(txt)}>
                                            <img src={unmark}
                                                 onMouseOver={e => e.currentTarget.src = unmark}
                                                 onMouseOut={e => e.currentTarget.src = unmark_gray}
                                            />
                                        </button>
                                    }
                                    <div
                                        className="text-lg pl-14 overflow-hidden inline-block text-ellipsis whitespace-nowrap"
                                        onClick={(e) => handleClick(txt.text)}>{txt.text}</div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    </div>;
}

export default Bookmark