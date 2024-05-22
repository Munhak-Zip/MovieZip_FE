import React, {useState} from "react";
import '../../resources/css/Movie/Reserve.css';
const Reserve = () => {
    const [mode, setMode] = useState('WELCOME');

    function Header(props) {
        console.log('props', props, props.title)
        return <header>
            <h1><a href="/" onClick={(event)=> {
                event.preventDefault();
                props.onChangeMode();
            }}>{props.title}</a></h1>
        </header>
    }

    function Information(props) {
        return (
        <div className={"content"}>
            영화명 : {props.title} <br/>
            날짜 : {props.date} <br/>
            시간 : {props.time}
        </div>
        )
    }
    function Seat() {
        const rows = 10;
        const cols = 20;
        const rowLabels = 'ABCDEFGHIJ'.split('');
        let tableRows = [];

        for (let row = 0; row < rows; row++) {
            let tableCells = [];
            for (let col = 1; col <= cols; col++) {
                let seatId = `${rowLabels[row]}-${col}`;
                tableCells.push(
                    <td>
                        {`${rowLabels[row]}${col}`}
                    </td>
                );
            }
            tableRows.push(<tr key={row}>{tableCells}</tr>);
        }

        return <div className={"seatTable"}>
            좌석 선택
            <table>
                {tableRows}
            </table>
        </div>
    }

    return (
        <div className={"div1"}>
            <Header title={"MOVIE.ZIP"} onChangeMode={() => {
                setMode('WELCOME');
            }}></Header>
            <Information title={"파묘"} date={"2024-05-21"} time={"14:00"} /><br/>
            <Seat/>
        </div>
    )
}
export default Reserve;