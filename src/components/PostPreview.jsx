import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { jwtDecode } from 'jwt-decode';
import useAuth from "../hooks/useAuth";

const PostPreview = ({ post, onDelete }) => {
    const { authed, userToken } = useAuth();
    const navigate = useNavigate();

    const getUserLoginFromToken = (token) => {
        try {
            const decodedToken = jwtDecode(token);
            return decodedToken.sub;
        } catch (error) {
            console.error("Invalid token:", error);
            return null;
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}.${month}.${year}`;
    };

    const onEdit = (postId) => {
        navigate(`/edit/${postId}`);
    };

    return (
        <Link to={`/post/${post.id}`} className="text-decoration-none text-dark">
            <div className="mb-2 rounded p-3" style={{ backgroundColor: 'Gainsboro' }}>
                <div className="d-flex justify-content-between">
                    <div>
                        <h3 className="align-baseline" style={{ marginRight: '1rem' }}>
                            {post.title}
                        </h3>
                        <div className="d-flex">
                            <div className="d-flex flex-column">
                                <p className="m-0">Author: {post.creator.username}</p>
                                <p className="m-0">E-mail: {post.creator.login}</p>
                            </div>
                            <p>Last updated at: {formatDate(post.created)}</p>
                        </div>
                    </div>
                    {authed && userToken && getUserLoginFromToken(userToken) === post.creator.login && (
                        <div role="group">
                            <button
                                type="button"
                                className="btn btn-warning"
                                onClick={(e) => {
                                    e.preventDefault();
                                    onEdit(post.id);
                                }}
                                style={{ marginRight: '4px' }}
                            >
                                <FaEdit style={{ marginBottom: "3px" }} />
                            </button>
                            <button
                                type="button"
                                className="btn btn-danger"
                                onClick={(e) => {
                                    e.preventDefault();
                                    onDelete(post.id);
                                }}
                                style={{ marginRight: '0' }}
                            >
                                <FaTrashAlt style={{ marginBottom: "3px" }} />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </Link>
    );
};

export default PostPreview;
