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
            "text": "삼성전자의 지난 1년간 시가 총액 추이를 그려줘"
        },
        {
            "idx": uuidv4(),
            "mark": true,
            "text": "2024년 1월 2일의 KOSPI 200 ETF의 종목 구성을 pie chart로 그려줘"
        },
        {
            "idx": uuidv4(),
            "mark": true,
            "text": "현대자동차의 6개월동안의 종가, 저가, 고가를 모두 표현하는 box plot을 그려줘"
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

        navigate('/', {state: {"question": txt, "idx": false}, replace: true},);
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