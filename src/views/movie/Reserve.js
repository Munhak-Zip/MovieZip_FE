import React, { useEffect, useState } from "react";
import '../../resources/css/Movie/Reserve.css';
import axios from 'axios';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Payment from "./Payment";
const Reserve = () => {
    const navigate = useNavigate();
    const { mvId } = useParams();
    const location = useLocation();
    const { selectedSubRegion, selectedDate, startTime, endTime, seats, mvTitle, mvImg } = location.state || {}; // mvTitle과 mvImg 추가
    const [selectedSeat, setSelectedSeat] = useState(null);
    const [date, setDate] = useState(selectedDate || '');
    const [time, setTime] = useState('');
    const [movieDetails, setMovieDetails] = useState(location.state || null);
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
    const openPaymentModal = () => setIsPaymentModalOpen(true);
    const closePaymentModal = () => setIsPaymentModalOpen(false);


    useEffect(() => {
        if (!movieDetails) {
            axios.get(`/movie/showReserveForm/${mvId}`)
                .then(response => {
                    const movieData = response.data;
                    movieData.openDate = movieData.openDate.split(' ')[0];
                    setMovieDetails(movieData);
                })
                .catch(error => {
                    console.error('Request failed:', error);
                });
        }
    }, [mvId, movieDetails]);

    function Seat() {
        const rows = Math.ceil(seats / 20); // 필요한 행 수를 seats 수에 따라 결정
        const cols = Math.min(seats, 20); // 열 수는 최대 20개까지
        const rowLabels = 'ABCDEFGHIJ'.split(''); // 최대 10개의 행에 대한 라벨 설정
        let tableRows = [];

        function handleSeatClick(seatId) {
            setSelectedSeat(seatId);
        }

        for (let row = 0; row < rows; row++) {
            let tableCells = [];
            for (let col = 1; col <= cols; col++) {
                let seatNumber = row * 20 + col; // 전체 좌석 번호 계산
                if (seatNumber > seats) break; // 현재 좌석 번호가 전체 좌석 수를 넘으면 중단
                let seatId = `${rowLabels[row]}-${col}`;

                // A-5 다음에 빈 칸 추가
                if (col === 6) {
                    tableCells.push(
                        <td key={`${seatId}-space1`} className="empty-cell"></td>
                    );
                }

                tableCells.push(
                    <td
                        key={seatId}
                        className={selectedSeat === seatId ? 'selected' : ''}
                        onClick={() => handleSeatClick(seatId)}
                    >
                        {seatId}
                    </td>
                );

                // A-15 다음에 빈 칸 추가
                if (col === 15) {
                    tableCells.push(
                        <td key={`${seatId}-space2`} className="empty-cell"></td>
                    );
                }
            }
            tableRows.push(<tr key={row}>{tableCells}</tr>);
        }

        return (
            <div>

            <div className="seatTable">
                <table>
                    <tbody>
                        {tableRows}
                        </tbody>
                    </table>
            </div>
    </div>
        );
    }

    function handleReservation() {
        if (!selectedSeat) {
            alert("좌석을 선택해주세요.");
        } else {
            setIsPaymentModalOpen(true);
        }
    }

    if (!movieDetails) {
        return <div>Loading...</div>;
    }

    return (
        <div>
        <div className="reserve-div1">
            <div className='movie-container'>
                <br/><br/>
                {mvTitle} <br/><br/>
                <div className="reserve-imgMovie">
                    <img src={mvImg} width={180} height={250} alt={movieDetails.mvTitle}/>
                </div>
                <br/><br/>
                극장 : CGV {selectedSubRegion} <br/><br/>
                날짜 : {selectedDate} <br/><br/>
                시간 : {startTime} ~ {endTime} <br/><br/>
                좌석 수 : {seats}석 <br/><br/>
                선택 좌석 : {selectedSeat} <br/><br/>
            </div>
            <div className='seat-container'>
                <Seat/><br/>
                <div>
                    <button className='reserveBtn' onClick={handleReservation}>결제하기</button>
                </div>

                {isPaymentModalOpen && (
                    <div className="modal-overlay">
                        <div className="modal-content">
                            <Payment onClose={closePaymentModal} mvId={mvId} mvTitle={mvTitle} selectedSubRegion={selectedSubRegion} selectedDate={selectedDate} startTime={startTime} endTime={endTime} seats={seats} selectedSeat={selectedSeat}/>
                        </div>
                    </div>
                )}
            </div>

        </div>
        </div>
    );
}

export default Reserve;
