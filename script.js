let votes = {
    "Candidate 1": 0,
    "Candidate 2": 0,
    "Candidate 3": 0,
    "Candidate 4": 0
};

let votedIds = [];

function updateTotalVotes(){
    document.getElementById("totalVotes").textContent = votedIds.length;
}

const voteChart = new Chart(
    document.getElementById("voteChart"),
    {
        type: "bar",
        data: {
            labels: Object.keys(votes),
            datasets: [{
                label: "Number of Votes",
                data: Object.values(votes),
                backgroundColor: [
                    "mediumseagreen",
                    "steelblue",
                    "orange",
                    "tomato"
                ]
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: { stepSize: 1 }
                }
            }
        }
    }
);

document.getElementById("voteForm").addEventListener("submit", function(e){
    e.preventDefault();

    const voterId = document.getElementById("voterId").value;
    const candidate = document.querySelector('input[name="candidate"]:checked');
    const message = document.getElementById("message");

    if(voterId < 1 || voterId > 100){
        message.textContent = "Voter ID must be between 1 and 100!";
        message.style.color = "red";
        return;
    }

    if(votedIds.includes(voterId)){
        message.textContent = "This Voter ID has already voted!";
        message.style.color = "red";
        return;
    }

    if(votedIds.length >= 100){
        message.textContent = "Voting closed. Maximum voters reached.";
        message.style.color = "red";
        return;
    }

    votes[candidate.value]++;
    votedIds.push(voterId);

    voteChart.data.datasets[0].data = Object.values(votes);
    voteChart.update();

    message.textContent = "Vote submitted successfully!";
    message.style.color = "green";

    updateTotalVotes();
    this.reset();
});

updateTotalVotes();
