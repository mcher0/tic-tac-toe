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
    
    return  {render,modifyBoard,wipeBoard}
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
    const update = () =>{
        if (currentPlayerIndex == 0){
            currentPlayerIndex++;
        }else{
            currentPlayerIndex--;
        }
    }
    const restart = () =>{
        let players =[{},{}];
        document.querySelector("#player1").textContent = "";
        document.querySelector("#player2").textContent = "";
        currentPlayerIndex = 0;
        gameOver = false;
        board.wipeBoard();

    }
    return {start,handleClick,update,restart}
  })();