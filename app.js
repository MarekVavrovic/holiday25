const container = document.querySelector(".container");

container.addEventListener("click", (e) => {
  const transaction = e.target.closest(".transaction");
  const closeBtn = e.target.closest(".close-btn");
  const img = e.target.closest(".img");

  if (closeBtn ) {
    const expandedTransaction = document.querySelector(".transaction.expanded");

    const otherTransactions = [
      ...document.querySelectorAll(".transaction"),
    ].filter((t) => t !== expandedTransaction);

    otherTransactions.forEach((t) => t.classList.remove("not-expanded"));

    if (expandedTransaction) {
      document.startViewTransition({
        update: () => {
          expandedTransaction.classList.remove("expanded");
        },
        types: ["collapse"],
      });
    }

    return;
  }

  if (img) {
    const transactionImg = img.closest(".transaction");

    if (!transactionImg.classList.contains("expanded")) {
      const otherTransactions = [
        ...document.querySelectorAll(".transaction"),
      ].filter((t) => t !== transactionImg);

      otherTransactions.forEach((t) => t.classList.add("not-expanded"));

      document.startViewTransition({
        update: () => {
          transactionImg.classList.add("expanded");
        },
        types: ["expand"],
      });
    }

    return;
  }

  if (transaction) {
    if (!transaction.classList.contains("expanded")) {
      const otherTransactions = [
        ...document.querySelectorAll(".transaction"),
      ].filter((t) => t !== transaction);

      otherTransactions.forEach((t) => t.classList.add("not-expanded"));

      document.startViewTransition({
        update: () => {
          transaction.classList.add("expanded");
        },
        types: ["expand"],
      });
    }
  }
});



// Countdown configuration
const countdowns = {
  aprilArrival:       new Date(2026, 3, 17, 20, 25, 11),   // 17/04/2026
  aprilDeparture:     new Date(2026, 3, 29, 15, 30, 11),   // 29/04/2026
  augustArrival:      new Date(2026, 7, 15, 16, 10, 11),   // 15/08/2026
  septemberDeparture: new Date(2026, 8,  2, 15, 30, 11),   // 02/09/2026
  decemberArrival:    new Date(2026, 11, 19, 20,  0, 11),  // 19/12/2026
  decemberDeparture:  new Date(2027, 0,  2, 14, 55, 11),   // 02/01/2027 14:55:00
};

// labels for each countdown
const countdownLabels = {
  aprilArrival: "čas do príletu:",
  aprilDeparture: "čas do odletu:",
  augustArrival: "čas do príletu:",
  septemberDeparture: "čas do odletu:",
  decemberArrival: "čas do príletu:",
  decemberDeparture: "čas do odletu:",
};

//  update all countdowns
function updateCountdowns() {
  document.querySelectorAll(".deadline").forEach((deadlineElement) => {
    const dataDate = deadlineElement.getAttribute("data-date");
    const futureDate = countdowns[dataDate];

    

    if (!futureDate) return; // Skip if the date key is not found

    const timeLeft = calculateTimeLeft(futureDate);
    const displayText = timeLeft
      ? `${countdownLabels[dataDate]} ${timeLeft}`
      : "EXPIRED";

    const countdownElement = deadlineElement.querySelector(".deadline-format p");
    if (countdownElement) {
      countdownElement.textContent = displayText;
    }
  });
}

// Function to calculate remaining time
function calculateTimeLeft(futureDate) {
  const now = new Date().getTime();
  const distance = futureDate.getTime() - now;

  if (distance < 0) return null; 

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  return `${days}d ${hours}h ${minutes}m ${seconds}s`;
}


updateCountdowns();
setInterval(updateCountdowns, 1000);

