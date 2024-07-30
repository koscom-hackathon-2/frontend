function Bookmark() {
    return <div className="flex flex-col flex-auto p-6">
        <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 p-4 mt-12 ">
            <div className="flex flex-col h-full overflow-x-auto mb-4 animate-fade-up animate-delay-100">
                <div className="flex flex-col">
                    <div className="title">BOOKMARK</div>
                    <div className="bookmark-box">
                        <div className="bookmark-card">
                            <div>질문</div>
                        </div>
                        <div className="bookmark-card">
                            <div>질문</div>
                        </div>
                        <div className="bookmark-card">
                            <div>질문</div>
                        </div>
                        <div className="bookmark-card">
                            <div>질문</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>;
}

export default Bookmark