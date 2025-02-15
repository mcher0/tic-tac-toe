const startButton = document.querySelector("#start-button");
startButton.addEventListener("click",()=>{
    Game.start();
})
const restartButton = document.querySelector('#restart-button')
restartButton.addEventListener("click",()=>{
    alert("AA")
    Game.restart();
})

const board = (function () {
    let board=["","","","","","","","",""];
    const render = () =>{
        let boardHTML ="";
        board.forEach((square,index) =>{
            boardHTML += `<div class="square" id="square-${index}">${square}</div>`;
            document.querySelector('#gameboard').innerHTML = boardHTML;
        })        
    }
    const modifyBoard = (index,mark) =>{
        if(board[index] != ""){
            alert("Square already taken")
        }else{
            board[index] = mark;
        }
    }
    const wipeBoard = () =>{
        for (let i=0;i<board.length;i++){
            board[i]="";
        }
        document.querySelector('#gameboard').innerHTML = " ";
    }
    const getBoard = () =>{
        return board;
    }
    
    return  {render,modifyBoard,wipeBoard,getBoard}
  })();

const createPlayer = (name,mark) =>{
    return{
        name,
        mark
    }
}

const Game = (function () {
    let players;
    let currentPlayerIndex;
    let gameOver;
    const start = () =>{
        players =[
            createPlayer(document.querySelector("#player1").value,"X"),
            createPlayer(document.querySelector("#player2").value,"O"),
        ]
        currentPlayerIndex = 0;
        gameOver = false;
        board.render();
        const squares = document.querySelectorAll(".square");
        squares.forEach((square) =>{
            square.addEventListener("click",Game.handleClick);
        })
    }
    const handleClick = (event) =>{
        let index = event.target.id.split("-")[1];
        board.modifyBoard(index,players[currentPlayerIndex].mark);
        event.target.innerHTML = `${players[currentPlayerIndex].mark}`
        Game.update();

    }

    const checkWin = (board)=>{
        const winningCombinations = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6],
        ]
            for (let i=0;i<winningCombinations.length;i++){
                const [a,b,c] = winningCombinations[i];
                if (board[a] != "" && board[a]==board[b] && board[b] == board[c]){
                    return true;
                    break;
                }
            }
        
    }
    const isNotTie = (board) =>{
        let emptyCellsLeft = false;
        for (let i=0;i<board.length;i++){
            console.log(i);
            if (board[i] == "" ){
                emptyCellsLeft = true;
            }
        }
        return emptyCellsLeft;

    }

    const update = () =>{
        gameOver = checkWin(board.getBoard());
        if (gameOver){
                document.querySelector("#result-display").textContent = `${players[currentPlayerIndex].name} wins!`;
                console.log("gameOver triggered");
                board.render();
        }else{
            if(isNotTie(board.getBoard())){
                if (currentPlayerIndex == 0){
                    currentPlayerIndex++;
                }else{
                    currentPlayerIndex--;
                }
            }else{
                document.querySelector("#result-display").textContent = `It's a tie!`;
                board.render();
            }
            
        }

    }
    const restart = () =>{
        let players =[{},{}];
        document.querySelector("#result-display").textContent = ``;
        document.querySelector("#player1").textContent = "";
        document.querySelector("#player2").textContent = "";
        currentPlayerIndex = 0;
        gameOver = false;
        board.wipeBoard();

    }
    return {start,handleClick,update,restart}
  })();