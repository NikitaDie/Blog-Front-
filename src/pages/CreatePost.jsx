import React, { useEffect, useState } from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";
import MainContent from "../components/MainContent";
import Background from "../components/Background";
import { useNavigate, useParams } from "react-router-dom";
import { Bounce, toast, ToastContainer } from "react-toastify";
import {
    AdmonitionDirectiveDescriptor,
    headingsPlugin,
    listsPlugin,
    quotePlugin,
    thematicBreakPlugin,
    toolbarPlugin,
    MDXEditor,
    KitchenSinkToolbar,
    imagePlugin,
    linkPlugin,
    linkDialogPlugin,
    tablePlugin,
    frontmatterPlugin,
    codeBlockPlugin,
    codeMirrorPlugin,
    directivesPlugin,
    diffSourcePlugin,
    markdownShortcutPlugin
} from '@mdxeditor/editor';
import '@mdxeditor/editor/style.css';
import Separator from "../components/Separator";
import useAuth from "../hooks/useAuth";

function CreatePost() {
    const { id } = useParams();
    const { authed, userToken } = useAuth();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();
    const mdxEditorRef = React.useRef(null);

    useEffect(() => {
        if (id) {
            const fetchPost = async () => {
                try {
                    const response = await fetch(`/api/v1/posts/${id}`);
                    if (!response.ok) {
                        const errorData = await response.json();
                        toast.error(errorData.message || 'Failed to fetch post data');
                        return;
                    }
                    const postData = await response.json();
                    setTitle(postData.title);
                    setContent(postData.content || '');
                    if (mdxEditorRef.current && typeof postData.content === 'string') {
                        mdxEditorRef.current.setMarkdown(postData.content);
                    }
                } catch (error) {
                    toast.error('Error fetching post: ' + error.message);
                }
            };
            fetchPost();
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const postData = {
            title: title.trim(),
            content: content.trim()
        };
        const method = id ? 'PUT' : 'POST';
        const url = id ? `/api/v1/posts/${id}` : '/api/v1/posts';
        console.log(authed);
        console.log(`Bearer ${userToken}`);
        try {
            const response = await fetch(url, {
                method,
                headers: {
                    "Authorization": `Bearer ${userToken}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(postData)
            });
            if (response.ok) {
                toast.success(id ? 'The post was successfully updated!' : 'The post was successfully created!',
                    {
                    onClose: () => {
                        navigate('/');
                    }
                });
            } else {
                const errorData = await response.json();
                toast.error(errorData.message || 'Failed to send data');
            }
        } catch (error) {
            toast.error('Failed to send data: ' + error.message);
        }
    };

    return (
        <div>
            <Background>
                <Header buttonText="Start" linkPath="/home" />
                <MainContent pageHeader={id ? "Edit Post" : "Neuer Post"}>
                    <div className="flex-grow-1 d-flex flex-column h-100 w-100 overflow-y-auto">
                        <div className="flex-grow-1 h-100 d-flex flex-column m-2 p-1 mt-0 overflow-y-auto">
                            <div className="form-group mb-3">
                                <label className="fw-bold fs-5" htmlFor="TitleInput">Title</label>
                                <input
                                    id="TitleInput"
                                    type="text"
                                    className="form-control"
                                    placeholder="Title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>
                            <div className="flex-grow-1 h-100 d-flex flex-column overflow-y-auto">
                                <label className="fw-bold fs-5" htmlFor="ContentInput">Content</label>
                                <Separator />
                                <MDXEditor className="flex-grow-1 overflow-y-auto"
                                           markdown={content}
                                           placeholder="Einfügen"
                                           ref={mdxEditorRef}
                                           onChange={setContent}
                                           plugins={[
                                               toolbarPlugin({
                                                   toolbarContents: () => <KitchenSinkToolbar className="top-0 position-sticky" />
                                               }),
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
                                               codeMirrorPlugin({ codeBlockLanguages: { js: 'JavaScript', css: 'CSS', txt: 'text', tsx: 'TypeScript', } }),
                                               directivesPlugin({ directiveDescriptors: [AdmonitionDirectiveDescriptor] }),
                                               diffSourcePlugin({ viewMode: 'rich-text', diffMarkdown: 'boo' }),
                                               markdownShortcutPlugin()
                                           ]}
                                />
                            </div>
                            <button
                                type="submit"
                                onClick={handleSubmit}
                                className="btn btn-outline-dark align-self-end mb-4"
                            >
                                {id ? 'Update' : 'Posten'}
                            </button>
                            <Separator />
                        </div>
                    </div>
                </MainContent>
                <Footer/>
            </Background>
            <ToastContainer
                position="bottom-right"
                autoClose={3000}
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

export default CreatePost;
