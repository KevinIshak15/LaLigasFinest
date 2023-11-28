/*
Author:Kevin Ishak
Last Modification: 2023-11-27
*/

// Function to toggle the visibility of an HTML element with a given ID.
function toggleVisibility(id, link) {
    // Attempt to find the element by its ID.
    var element = document.getElementById(id);
    // Ensure the element exists to avoid null reference errors.
    if (element) {
        // Check the current display style of the element.
        if (element.style.display === 'none') {
            // If the element is not displayed, change it to be displayed (visible).
            element.style.display = 'block';
            // Update the link text to indicate that clicking it will now hide details.
            link.textContent = 'Learn Less';
        } else {
            // If the element is displayed, change it to not be displayed (hidden).
            element.style.display = 'none';
            // Update the link text to indicate that clicking it will show more details.
            link.textContent = 'Learn More';
        }
    }
}

function showTeamDetails(detailsId) {
    var details = document.getElementById(detailsId);
    var allDetails = document.querySelectorAll('.team-details');
    // Hide all other details
    allDetails.forEach(function(detail) {
        if (detail.id !== detailsId) {
            detail.style.display = 'none';
        }
    });
    // Show/hide the clicked team's details
    if (details) {
        details.style.display = details.style.display === 'none' ? 'block' : 'none';
    }
}
