import React, {useEffect, useState} from 'react';
import Footer from "../components/Footer";
import Header from "../components/Header";
import Background from "../components/Background";
import MainContent from "../components/MainContent";
import {toast} from "react-toastify";
import useAuth from "../hooks/useAuth";
import PostPreview from "../components/PostPreview";

function Home() {
    const [posts, setPosts] = useState([]);
    const { userToken } = useAuth();
    const [selectedOption, setSelectedOption] = useState("0");

    const fetchPosts = async (option) => {
        try {
            const response = await fetch(`/api/v1/posts?limit=${option}`);
            if (!response.ok) {
                const errorData = await response.json();
                toast.error(errorData.message || 'Failed to fetch post data');
            }
            const data = await response.json();
            setPosts(data);
            console.log(data);
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


    const onDelete = async (postId) => {
        const confirmed = window.confirm("Are you sure you want to delete this post?");
        if (!confirmed) return;

        //Optimistic UI update
        setPosts(posts.filter(post => post.id !== postId));

        try {
            const response = await fetch(`/api/v1/posts/${postId}`, {
                headers: {
                    "Authorization": `Bearer ${userToken}`,
                },
                method: 'DELETE'
            });
            if (response.ok) {
                toast.success( 'The post was successfully deleted!');
            } else {
                const errorData = await response.json();
                throw Error(errorData.message);
            }
        } catch (error) {
            await fetchPosts(selectedOption);
            toast.error('Failed to delete the post. ' + error.message);
            // Revert UI update if deletion failed
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
                            <PostPreview key={post.id} post={post} onDelete={onDelete}/>
                        ))}
                    </div>
                </MainContent>

                <Footer />

            </Background>
        </div>
    );
}

export default Home;
