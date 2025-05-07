document.addEventListener('DOMContentLoaded', () => {
  const stars = document.querySelectorAll('.star');
  const avgDisplay = document.querySelector('#average-rating');
  let ratings = [];
  let userRating = 0;

  stars.forEach((star, index) => {
    // Click: set rating
    star.addEventListener('click', () => {
      userRating = index + 1;
      ratings.push(userRating);
      updateStars(userRating);
      updateAverage();
      console.log(userRating)
    }); 

    // Hover: temporary star highlight
    star.addEventListener('mouseover', () => {
      updateStars(index + 1);
    });

    // Mouse leave: reset to current rating
    star.addEventListener('mouseleave', () => {
      updateStars(userRating);
    });
  });

  function updateStars(rating) {
    stars.forEach((star, i) => {
      star.textContent = i < rating ? '★' : '☆';
    });
  }

  sessionStorage.setItem("average","1")

  function updateAverage() {
    const sum = ratings.reduce((a, b) => a + b, 0);
    const avg = (sum / ratings.length).toFixed(1);
    avgDisplay.textContent = `Average Rating: ${sessionStorage.getItem("average")} / 5`;
    sessionStorage.setItem("average",`${avg}`)
    console.log(sessionStorage.getItem("average"))
  }
});
