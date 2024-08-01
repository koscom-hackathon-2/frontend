import React, {useState, useEffect} from "react";
import komi from "../asset/komi.png";

function Loader() {
    const phrases = [
        "정보를 로딩 중 입니다... 잠시만 기다려 주세요.",
        "답변을 수집 중 입니다. 잠시만 기다려주세요.",
        "답변을 생성하는데 최대 30초 정도의 시간이 걸립니다."
    ];

    const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
    const [visibleText, setVisibleText] = useState("");

    const typingDelay = 100;
    const nextPhraseDelay = 6000; // 6초

    useEffect(() => {
        const typeText = (currentIndex, currentText) => {
            if (currentIndex < currentText.length) {
                setVisibleText(currentText.substring(0, currentIndex + 1));
                setTimeout(() => typeText(currentIndex + 1, currentText), typingDelay);
            } else {
                setTimeout(() => {
                    setCurrentPhraseIndex((prevIndex) => (prevIndex + 1) % phrases.length);
                    setVisibleText("");
                }, nextPhraseDelay);
            }
        };

        const currentPhrase = phrases[currentPhraseIndex];
        typeText(0, currentPhrase);
    }, [currentPhraseIndex]);

    return (
        <div className="animate-fade-up animate-delay-100 col-start-1 col-end-8 p-3 rounded-lg">
            <div className="flex flex-row items-center">
                <img
                    className="flex items-center justify-center h-10 w-10 rounded-full flex-shrink-0"
                    src={komi}
                    alt=""/>
                <div className="relative justify-center ml-3 text-lg bg-white py-2 px-4 shadow rounded-xl">
                    <div className="flex justify-center items-center">
                        <div>{visibleText}</div>
                        <img
                            className="h-4 w-4"
                            src="https://icons8.com/preloaders/preloaders/1488/Iphone-spinner-2.gif"
                            alt=""
                        />
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Loader;
