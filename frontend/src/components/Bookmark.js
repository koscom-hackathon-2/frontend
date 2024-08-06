import mark from "../asset/mark.svg";
import unmark from "../asset/unmark.svg";
import unmark_gray from "../asset/unmark_gray.svg";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {v4 as uuidv4} from "uuid";

function Bookmark() {
    const list = JSON.parse(localStorage.getItem("list")) || [
        // {
        //     "idx": uuidv4(),
        //     "mark": true,
        //     "text": "나스닥 지수와 SK텔레콤 주가의 상관관계를 알려줘"
        // },
        // {
        //     "idx": uuidv4(),
        //     "mark": true,
        //     "text": "삼성전자 월말 종가 변화를 알려줘"
        // },
        // {
        //     "idx": uuidv4(),
        //     "mark": true,
        //     "text": "공휴일 전날의 네이버의 외국인 투자자 매도 매수 현황을 보여줘"
        // },
        // {
        //     "idx": uuidv4(),
        //     "mark": true,
        //     "text": "실적 발표 전날과 다음날의 네이버 주주 구성을 알려줘"
        // }
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
                                        <button className="bookmark-icon" onClick={() => removeItem(txt)}>
                                            <img src={mark}/>
                                        </button> :
                                        <button className="bookmark-icon" onClick={() => addItem(txt)}>
                                            <img src={unmark}
                                                 onMouseOver={e => e.currentTarget.src = unmark}
                                                 onMouseOut={e => e.currentTarget.src = unmark_gray}
                                            />
                                        </button>
                                    }
                                    <div
                                        className="text-lg overflow-hidden inline-block text-ellipsis whitespace-nowrap"
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