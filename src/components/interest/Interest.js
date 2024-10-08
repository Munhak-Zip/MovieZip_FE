import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const Interest = () => {
    const navigate = useNavigate();
    const [selectedGenre, setSelectedGenre] = useState(null);

    const genres = ["한국영화", "SF", "코미디", "해외 영화", "판타지", "로맨스", "애니메이션", "드라마", "스릴러", "액션", "영화", "호러", "다큐멘터리", "음악/뮤지컬", "단편영화"];

    const toggleGenreSelection = (genre) => {
        setSelectedGenre(genre === selectedGenre ? null : genre);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (selectedGenre) {
            try {
                const userIdString = localStorage.getItem('userId'); // localStorage에서 문자열로 가져옴
                const userId = parseInt(userIdString, 10); // 10진수로 변환 (Long값으로 간주)

                console.log("userId:::::"+ userId);
                if (!userId) {
                    console.error("User ID is null or undefined.");
                    return;
                }

                const interestDTO  = { userId: userId, genre: selectedGenre };
                console.log("Sending payload:", interestDTO);

                await axios.post('/addInterest', interestDTO);
                navigate('/'); 
            } catch (error) {
                console.error('Error adding interest:', error);
              
            }
        } else {
            alert("Please select a genre.");
        }
    };

    return (
        <div className="interest_wrap">
            <div className="interest_content_wrap">
                <div className="like">
                    <p>당신의 영화 취향을 하나 고르세요.</p>
                    <form onSubmit={handleSubmit}>
                        <div className="button_group">
                            {genres.map((genre, index) => (
                                <button
                                    key={index}
                                    type="button"
                                    className={`genre_button ${selectedGenre === genre ? 'selected' : ''}`}
                                    onClick={() => toggleGenreSelection(genre)}
                                >
                                    {genre}
                                </button>
                            ))}
                        </div>
                        <button className="change_btn" type="submit">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Interest;
