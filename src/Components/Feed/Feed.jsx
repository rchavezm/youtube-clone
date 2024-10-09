import React, { useEffect, useState } from 'react';
import './Feed.css';
import moment from 'moment';  // Add this import
import { Link } from 'react-router-dom';
import { API_KEY, value_converter } from '../../data'; // Ensure `value_converter` is imported

const Feed = ({category}) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);  // Error handling

    const fetchData = async () => {
        try {
            const videoList_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&chart=mostPopular&maxResults=50&regionCode=US&videoCategoryId=${category}&key=${API_KEY}`;
            const response = await fetch(videoList_url);
            const result = await response.json();
            if (response.ok) {
                setData(result.items || []);
            } else {
                setError(result.error.message);
            }
        } catch (err) {
            setError(err.message);
        }
    }

    useEffect(() => {
        fetchData();
    }, [category]);

    if (error) return <div>Error: {error}</div>;  // Display error if occurs

    return (
        <div className="feed">
            {data.length === 0 ? <p>Loading...</p> : data.map((item, index) => (
                <Link to={`/video/${item.snippet.categoryId}/${item.id}`} className="card" key={index}>
                    <img src={item.snippet.thumbnails.medium.url} alt={item.snippet.title} />
                    <h2>{item.snippet.title}</h2>
                    <h3>{item.snippet.channelTitle}</h3>
                    <p>{value_converter(item.statistics.viewCount)} views &bull; {moment(item.snippet.publishedAt).fromNow()}</p>
                </Link>
            ))}
        </div>
    );
};

export default Feed;
