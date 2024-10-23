import React, {useEffect, useState} from 'react';
import Footer from "../components/Footer";
import Header from "../components/Header";
import Background from "../components/Background";
import MainContent from "../components/MainContent";
import {Link, useNavigate} from "react-router-dom";
import {FaEdit, FaTrashAlt} from "react-icons/fa";
import {Bounce, toast, ToastContainer} from "react-toastify";

function Home() {
    const [posts, setPosts] = useState([]);
    const [selectedOption, setSelectedOption] = useState("5");
    const navigate = useNavigate();

    const fetchPosts = async (option) => {
        try {
            const response = await fetch(`/api/v1/posts?limit=${option}`);
            if (!response.ok) {
                const errorData = await response.json();
                toast.error(errorData.message || 'Failed to fetch post data');
            }
            const data = await response.json();
            setPosts(data);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    useEffect(() => {
        fetchPosts(selectedOption);
    }, [selectedOption]);


    const handleSelectChange = (e) => {
        setSelectedOption(e.target.value);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}.${month}.${year}`;
    };

    function onEdit(postId) {
        console.log(postId);
        navigate(`/edit/${postId}`);
    }

    const onDelete = async (postId) => {
        const confirmed = window.confirm("Are you sure you want to delete this post?");
        if (!confirmed) return;

        //Optimistic UI update
        setPosts(posts.filter(post => post.id !== postId));

        try {
            const response = await fetch(`/api/v1/posts?id=${postId}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                toast.success( 'The post was successfully deleted!');
            } else {
                const errorData = await response.json();
                toast.error(errorData.message || 'Failed to delete the post!');
            }
        } catch (error) {
            toast.error('Failed to delete the post: ' + error.message);
            // Revert UI update if deletion failed
            await fetchPosts(selectedOption);
        }
    };

    return (
        <div>
            <Background>

                <Header buttonText="Neuer Post" linkPath="/new" />

                <MainContent pageHeader="Letzte Posts">
                    <select data-header="true"
                            className="form-select w-25 p-2 m-2"
                            aria-label="Select"
                            value={selectedOption}
                            onChange={handleSelectChange}>
                        <option value="5">Letzten 5</option>
                        <option value="10">Letzten 10</option>
                        <option value="0">Alle</option>
                    </select>

                    <div className="w-100 d-flex flex-column p-2 overflow-y-auto flex-grow-1 h-100">
                        {posts.map((post) => (
                            <Link to={`/post/${post.id}`} key={post.id} className="text-decoration-none text-dark">
                                <div key={post.id} className="mb-2 rounded p-3" style={{
                                    backgroundColor: 'Gainsboro',
                                }}>
                                    <div className="d-flex justify-content-between">
                                        <div>
                                            <h3 className="d-inline align-baseline"
                                                style={{marginRight: '1rem'}}>
                                                {post.title}
                                            </h3>
                                            <p className="d-inline align-baseline">{formatDate(post.created)}</p>
                                        </div>
                                        <div className="" role="group">
                                            <button type="button" className="btn btn-warning"
                                                    onClick={(e) => {
                                                        e.preventDefault(); onEdit(post.id);
                                                    }}
                                                    style={{
                                                        marginRight: '4px'
                                                    }}>
                                                <FaEdit style={{
                                                    marginBottom: "3px"
                                                }}/>
                                            </button>
                                            <button type="button" className="btn btn-danger"
                                                    onClick={(e) => {
                                                        e.preventDefault(); onDelete(post.id);
                                                    }}
                                                    style={{
                                                        marginRight: '0'
                                                    }}>
                                                <FaTrashAlt style={{
                                                    marginBottom: "3px"
                                                }}/>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </MainContent>

                <Footer />

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

export default Home;
