import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from "../components/Header";
import MainContent from "../components/MainContent";
import Footer from "../components/Footer";
import Background from "../components/Background";
import {Bounce, toast, ToastContainer} from "react-toastify";
import {
    AdmonitionDirectiveDescriptor,
    codeBlockPlugin, codeMirrorPlugin, diffSourcePlugin, directivesPlugin,
    frontmatterPlugin,
    headingsPlugin, imagePlugin,
    KitchenSinkToolbar, linkDialogPlugin, linkPlugin,
    listsPlugin, markdownShortcutPlugin,
    MDXEditor,
    quotePlugin, tablePlugin, thematicBreakPlugin,
    toolbarPlugin
} from "@mdxeditor/editor";

function Post() {
    const { id } = useParams();
    const [post, setPost] = useState({});
    const mdxEditorRef = React.useRef(null);

    const fetchPost = async (postId) => {
        try {
            const response = await fetch(`/api/v1/posts/${postId}`);
            if (!response.ok) {
                const errorData = await response.json();
                toast.error(errorData.message || 'Failed to fetch post data');
            }
            const postData = await response.json();
            setPost(postData);
            if (mdxEditorRef.current) {
                mdxEditorRef.current.setMarkdown(postData.content);
            }
        } catch (error) {
            toast.error('Failed to send data: ' + error.message);
        }
    };

    useEffect(() => {
        fetchPost(id);
    }, [id]);

    return (
        <div>
            <Background>
                <Header buttonText="Start" linkPath="/" />
                <MainContent pageHeader={post.title || 'Loading...'}>
                    <div className="w-100">
                        <MDXEditor
                            className="h-100"
                            markdown=""
                            readOnly={true}
                            ref={mdxEditorRef}
                            plugins={[
                                listsPlugin(),
                                quotePlugin(),
                                headingsPlugin(),
                                linkPlugin(),
                                linkDialogPlugin(),
                                imagePlugin(),
                                tablePlugin(),
                                thematicBreakPlugin(),
                                frontmatterPlugin(),
                                codeBlockPlugin({ defaultCodeBlockLanguage: 'txt' }),
                                codeMirrorPlugin({
                                    codeBlockLanguages: {
                                        js: 'JavaScript',
                                        css: 'CSS',
                                        xml: 'XML',
                                        markdown: 'Markdown',
                                        python: 'Python',
                                        ruby: 'Ruby',
                                        txt: 'Text',
                                        tsx: 'TypeScript',
                                    }
                                }),
                                directivesPlugin({ directiveDescriptors: [AdmonitionDirectiveDescriptor] }),
                                diffSourcePlugin({ viewMode: 'rich-text', diffMarkdown: 'boo' }),
                                markdownShortcutPlugin()
                            ]}
                        />
                        {/*<MDEditor.Markdown className="m-4 mt-2" source={post.content} style={{ whiteSpace: 'pre-wrap' }} />*/}
                    </div>
                </MainContent>
                <Footer />
            </Background>

            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                closeOnClick
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />
        </div>
    );
}

export default Post;