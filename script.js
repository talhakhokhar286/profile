var typed= new Typed(".text",{
    strings:["Graphic Designer","Logo Designer","UI/UX Designer", "Web & App Desiner", "Forentend Developer"],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop:true
});

const reviews = JSON.parse(localStorage.getItem('reviews')) || [
    { email: "johndoe@gmail.com", rating: 5, message: "Great work! Highly recommended." },
    { email: "janesmith@gmail.com", rating: 4, message: "Very professional and timely." },
    { email: "miketaylor@gmail.com", rating: 5, message: "Amazing design and support." },
    { email: "lucybrown@gmail.com", rating: 4, message: "Very creative and easy to work with." },
    { email: "chrisevans@gmail.com", rating: 5, message: "Excellent service and communication." }
];

const reviewsSection = document.getElementById('reviews');
const seeMoreBtn = document.getElementById('see-more-btn');
let visibleReviews = 3; // Only show 3 reviews initially

// Function to display reviews
function displayReviews() {
    reviewsSection.innerHTML = ''; // Clear the section
    reviewsSection.classList.add('reviews-grid'); // Add grid layout

    for (let i = 0; i < visibleReviews && i < reviews.length; i++) {
        const reviewDiv = document.createElement('div');
        reviewDiv.classList.add('review-box');

        // Extract the first two letters of the email
        const initials = reviews[i].email.substring(0, 2).toUpperCase();

        // Creating email section with initials instead of DP and email text
        const emailDiv = document.createElement('div');
        emailDiv.classList.add('review-email');
        emailDiv.innerHTML = `
            <div class="initials-circle">${initials}</div>
            <span>${reviews[i].email}</span>
        `;

        // Creating content section with rating and message
        const contentDiv = document.createElement('div');
        contentDiv.classList.add('review-content');
        contentDiv.innerHTML = `
            <div class="review-rating">${getStars(reviews[i].rating)}</div>
            <div class="review-message">${reviews[i].message}</div>
        `;

        reviewDiv.appendChild(emailDiv);
        reviewDiv.appendChild(contentDiv);

        reviewsSection.appendChild(reviewDiv);
    }

    if (visibleReviews >= reviews.length) {
        seeMoreBtn.style.display = 'none';
    } else {
        seeMoreBtn.style.display = 'block';
    }
}

// Function to generate stars based on rating
function getStars(rating) {
    let stars = '';
    for (let i = 0; i < rating; i++) {
        stars += '★';
    }
    for (let i = rating; i < 5; i++) {
        stars += '☆';
    }
    return stars;
}

// Display initial reviews
displayReviews();

// Show more reviews when 'See More' button is clicked
seeMoreBtn.addEventListener('click', () => {
    visibleReviews += 3; // Show 3 more reviews
    displayReviews();
});

// Send review through Gmail (This would require a backend like PHP/Node.js to send the email)
function sendReview(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const rating = document.getElementById('rating').value;
    const message = document.getElementById('review').value;

    // Add new review to the reviews array
    reviews.push({ email, rating, message });

    // Store updated reviews in localStorage
    localStorage.setItem('reviews', JSON.stringify(reviews));

    alert('Review submitted successfully!');

    // Clear the form
    document.getElementById('reviewForm').reset();

    // Re-display reviews
    displayReviews();
}
