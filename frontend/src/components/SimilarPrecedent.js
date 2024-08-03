import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/a11y-dark.css";
import React from "react";

const SimilarPresdent = React.memo(({generatedCode}) => {
    return (
        <div className="w-full overflow-x-hidden">
            <aside
                id="separator-sidebar"
                className="fixed top-12 right-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
                aria-label="Sidebar"
            >
                <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                    {generatedCode ?
                        <ul className="space-y-2 font-medium mt-2 mb-2">
                            <h1>Generated Code</h1>
                            <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                                {"```python\n" + generatedCode + "\n" + "```"}
                            </ReactMarkdown>
                        </ul>
                        : null
                    }
                </div>
            </aside>
        </div>
    );
})

export default SimilarPresdent;