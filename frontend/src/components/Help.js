import guide from "../asset/guide.png";
import fnq from "../asset/fnq.png";
import notice from "../asset/notice.png";
import React from "react";

function Help() {
    return <div className="flex flex-col flex-auto p-6">
        <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 p-4 mt-12">
            <div className="flex flex-col h-full overflow-x-auto mb-4 animate-fade-up animate-delay-100">
                <div className="flex flex-col">
                    <span className="title">HELP</span>

                    <div className="container">
                        <a href="https://www.koscom.co.kr/portal/main/contents.do?menuNo=200612" className="card">
                            <div className="title">GUIDE</div>
                            <img src={guide} className="icon"></img>
                            <div className="subscript">기초 가이드를 확인하세요.</div>
                        </a>
                        <a href="https://www.koscom.co.kr/portal/main/contents.do?menuNo=200612" className="card">
                            <div className="title">F&Q</div>
                            <img src={fnq} className="icon"></img>
                            <div className="subscript">자주 묻는 질문을 모아놨어요.</div>
                        </a>
                        <a href="https://www.koscom.co.kr/portal/main/contents.do?menuNo=200612" className="card">
                            <div className="title">NOTICE</div>
                            <img src={notice} className="icon"></img>
                            <div className="subscript">공지사항을 확인하세요.</div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>;
}

export default Help