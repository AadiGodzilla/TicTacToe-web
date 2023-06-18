const buttons = document.querySelectorAll(".cells");
const reset = document.getElementById("reset");
const statusbar = document.getElementById("status");

var players = ["X", "O"];
var currentPlayer = players[Math.floor(Math.random() * players.length)];

statusbar.innerHTML = `${currentPlayer}'s Turn`;

var Finish;

var winCondition = [
    // Horizontal check
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    // Vertical check
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    // Diagonal check
    [0, 4, 8],
    [2, 4, 6],
];

function nextTurn(button) {
    if (button.innerHTML == "" && currentPlayer == players[0] && !Finish) {
        button.innerHTML = currentPlayer;
        currentPlayer = players[1];
    }

    if (button.innerHTML == "" && currentPlayer == players[1] && !Finish) {
        button.innerHTML = currentPlayer;
        currentPlayer = players[0];
    }

    check_Win();
}

function check_Win() {
    for (var i = 0; i < winCondition.length; i++) {
        var cellA = buttons[winCondition[i][0]];
        var cellB = buttons[winCondition[i][1]];
        var cellC = buttons[winCondition[i][2]];

        if (
            cellA.innerHTML == players[0] &&
            cellB.innerHTML == players[0] &&
            cellC.innerHTML == players[0]
        ) {
            Finish = true;

            cellA.style.backgroundColor = "green";
            cellB.style.backgroundColor = "green";
            cellC.style.backgroundColor = "green";

            statusbar.innerHTML = "X Wins";
        }

        if (
            cellA.innerHTML == players[1] &&
            cellB.innerHTML == players[1] &&
            cellC.innerHTML == players[1]
        ) {
            Finish = true;

            cellA.style.backgroundColor = "green";
            cellB.style.backgroundColor = "green";
            cellC.style.backgroundColor = "green";

            statusbar.innerHTML = "O Wins";
        }
    }
    if (
        buttons[0].innerHTML != "" &&
        buttons[1].innerHTML != "" &&
        buttons[2].innerHTML != "" &&
        buttons[3].innerHTML != "" &&
        buttons[4].innerHTML != "" &&
        buttons[5].innerHTML != "" &&
        buttons[6].innerHTML != "" &&
        buttons[7].innerHTML != "" &&
        buttons[8].innerHTML != "" &&
        !Finish
    ) {
        Finish = true;

        buttons.forEach((element) => {
            element.style.color = "grey";
        });

        statusbar.innerHTML = "Tie";
    }

    if (Finish) {
        reset.disabled = false;
    }

    if (!Finish) {
        statusbar.innerHTML = `${currentPlayer}'s Turn`;
    }
}

for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("touchstart", function () {
        nextTurn(this);
    });
}

reset.onclick = () => {
    Finish = false;

    for (var i = 0; i < buttons.length; i++) {
        buttons[i].innerHTML = "";
        buttons[i].style.backgroundColor = "white";
        buttons[i].style.color = "black";
        console.clear();
    }

    statusbar.innerHTML = `${currentPlayer}'s Turn`;

    reset.disabled = true;
};
