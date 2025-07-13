document.addEventListener('DOMContentLoaded', () => {
    // --- Email Signup Form Logic ---
    const signupForm = document.getElementById('signup-form');
    const emailInput = document.getElementById('email-signup');
    const signupMessage = document.getElementById('signup-message');

    signupForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent default form submission

        const email = emailInput.value;

        // Basic email validation (can be more robust)
        if (email && email.includes('@') && email.includes('.')) {
            signupMessage.textContent = `Thank you for signing up, ${email}! We'll send you an email with details.`;
            signupMessage.className = 'message success';
            emailInput.value = ''; // Clear the input
            // In a real application, you would send this email to a server
            // for processing (e.g., adding to a mailing list, creating an account).
            console.log(`Email submitted: ${email}`);
        } else {
            signupMessage.textContent = 'Please enter a valid email address.';
            signupMessage.className = 'message error';
        }
    });

    // --- Simulated DripGuard Extension Logic ---
    const simulatedBrowserIcon = document.getElementById('simulated-browser-icon');
    const sampleAiTextElement = document.getElementById('sample-ai-text');
    const simulatedPopup = document.getElementById('simulated-popup');
    const closePopupBtn = document.querySelector('.close-popup-btn');
    const popupBackdrop = document.getElementById('popup-backdrop');

    const dripScoreElement = document.getElementById('drip-score');
    const dripRiskLevelElement = document.getElementById('drip-risk-level');
    const flagsList = document.getElementById('flags-list');

    // Simulated AI detection data for the prototype
    const simulatedDetectionResult = {
        score: 85, // Example Drip Score
        risk: 'High Drip Risk',
        flags: [
            'High predictability in linguistic patterns',
            'Overly consistent sentence structure (low burstiness)',
            'Generic phrasing and lack of unique perspective',
            'Repetitive use of transition words'
        ],
        // Specific phrases to highlight within the sample text
        highlightedPhrases: [
            'truly remarkable',
            'sophisticated algorithms',
            'coherent and contextually relevant text',
            'unprecedented fluency',
            'imperative to acknowledge',
            'nuanced depth or unique perspective',
            'characteristic of human creativity',
            'iterative process of training these models',
            'vast datasets',
            'certain degree of predictability in linguistic patterns',
            'Consequently',
            'discerning between human-authored content and machine-generated content',
            'presents an ongoing challenge'
        ]
    };

    // Function to apply highlighting to the sample text
    function applyHighlighting() {
        let originalText = sampleAiTextElement.textContent;
        let highlightedHtml = originalText;

        // Sort phrases by length descending to prevent shorter matches within longer phrases
        simulatedDetectionResult.highlightedPhrases.sort((a, b) => b.length - a.length);

        simulatedDetectionResult.highlightedPhrases.forEach(phrase => {
            // Use a regex with 'g' flag for global replacement and 'i' for case-insensitivity
            // Escape special characters in the phrase for regex
            const escapedPhrase = phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const regex = new RegExp(`(${escapedPhrase})`, 'gi');
            highlightedHtml = highlightedHtml.replace(regex, '<span class="highlight-ai">$&</span>');
        });
        sampleAiTextElement.innerHTML = highlightedHtml;
    }

    // Function to remove highlighting from the sample text
    function removeHighlighting() {
        sampleAiTextElement.innerHTML = sampleAiTextElement.textContent; // Resets innerHTML to plain text
    }

    // Function to show the simulated popup and update its content
    function showSimulatedPopup() {
        // Update Drip Score and Risk Level
        dripScoreElement.textContent = `${simulatedDetectionResult.score}%`;
        dripRiskLevelElement.textContent = simulatedDetectionResult.risk;
        dripRiskLevelElement.className = `risk-level ${simulatedDetectionResult.risk.toLowerCase().replace(/\s/g, '-')}`; // Add class for styling

        // Populate Heuristic Flags
        flagsList.innerHTML = ''; // Clear previous flags
        simulatedDetectionResult.flags.forEach(flag => {
            const li = document.createElement('li');
            li.textContent = flag;
            flagsList.appendChild(li);
        });

        // Apply highlighting to the sample text on the main page
        applyHighlighting();

        // Show popup and backdrop
        simulatedPopup.classList.add('visible');
        popupBackdrop.classList.add('visible');
    }

    // Function to hide the simulated popup
    function hideSimulatedPopup() {
        simulatedPopup.classList.remove('visible');
        popupBackdrop.classList.remove('visible');

        // Remove highlighting from the sample text on the main page
        removeHighlighting();
    }

    // --- Simulated Detection Process ---
    // Change icon state after a delay to simulate detection
    setTimeout(() => {
        simulatedBrowserIcon.classList.remove('default-state');
        simulatedBrowserIcon.classList.add('high-risk-state'); // Simulate high risk detected
        simulatedBrowserIcon.title = "DripGuard: High Drip Risk Detected!";
    }, 3000); // Change after 3 seconds

    // Event listener to trigger the demo when the simulated icon is clicked
    simulatedBrowserIcon.addEventListener('click', showSimulatedPopup);

    // Event listeners to close the popup
    closePopupBtn.addEventListener('click', hideSimulatedPopup);
    popupBackdrop.addEventListener('click', hideSimulatedPopup); // Close when clicking outside popup
});
