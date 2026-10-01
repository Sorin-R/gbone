//-----------------------------------------------------------------------------------------------------------//
// JavaScript to handle the toggle of the mobile menu
//-----------------------------------------------------------------------------------------------------------//
// Toggle the menu when the menu icon is clicked
document.getElementById('menu-icon').addEventListener('click', function () {
    let menu = document.getElementById('menu');
    menu.classList.toggle('show');

    // Toggle the active state for the menu icon
    this.classList.toggle('active');

    // Change the icon based on the active state
    const icon = this.querySelector('i');
    if (this.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

//-----------------------------------------------------------------------------------------------------------//
// Close the menu when a menu item is clicked
//-----------------------------------------------------------------------------------------------------------//
document.addEventListener('DOMContentLoaded', function () {
    let menuItems = document.querySelectorAll('#menu a');
    menuItems.forEach(function (menuItem) {
        menuItem.addEventListener('click', function () {
            let menu = document.getElementById('menu');
            if (menu) {
                menu.classList.remove('show');
            }

            // Reset the menu icon to default state (bars icon)
            let menuIcon = document.getElementById('menu-icon');
            if (menuIcon) {
                menuIcon.classList.remove('active');
                const icon = menuIcon.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    });
});

//-----------------------------------------------------------------------------------------------------------//
// Hero section background image slideshow
//-----------------------------------------------------------------------------------------------------------//
document.addEventListener('DOMContentLoaded', function () {
    const heroSection = document.getElementById('hero');
    const images = [
        'url("img/jpeg/image1.jpg")',
        'url("img/jpeg/image2.jpg")',
        'url("img/jpeg/image3.jpg")',
        'url("img/jpeg/image4.jpg")',
        'url("img/jpeg/image5.jpg")',
    ];

    let currentIndex = 0;

    // Set initial background image
    heroSection.style.backgroundImage = images[currentIndex];

    function changeBackground() {
        heroSection.classList.add('hidden');

        setTimeout(() => {
            // Cycle index and change background image
            heroSection.style.backgroundImage =
                images[++currentIndex % images.length];
            heroSection.classList.remove('hidden');
        }, 1000); // Wait for the fade-out to finish
    }

    // Change background every 3 seconds
    setInterval(changeBackground, 3000);
});

//-----------------------------------------------------------------------------------------------------------//
// Caroucel animation for the catalog section
//-----------------------------------------------------------------------------------------------------------//
const caroucelWrap = document.querySelector('.caroucel-wrap');
const caroucelItems = document.querySelectorAll('.caroucel-item');
const [left, right] = [
    document.querySelector('.left'),
    document.querySelector('.right'),
];
let activeIndex = 0;
const itemWidth = 380; // Each item is 200px wide + 30px (15px margin on each side)
const visibleItems = 4; // Number of visible items (approx. based on 350px holl width)
const totalItems = caroucelItems.length;
const stopIndex = totalItems - visibleItems; // Calculate the stop index when the last two items are fully visible

const updateCarousel = () => {
    caroucelWrap.style.transform = `translateX(${-activeIndex * itemWidth}px)`;
    updateButtons();
};

const updateButtons = () => {
    left.classList.toggle('disabled', activeIndex === 0);
    right.classList.toggle('disabled', activeIndex >= stopIndex);
};

updateButtons();

left.addEventListener('click', () => {
    if (activeIndex > 0) {
        activeIndex--;
        updateCarousel();
    }
});

right.addEventListener('click', () => {
    if (activeIndex < stopIndex) {
        activeIndex++;
        updateCarousel();
    }
});

//-----------------------------------------------------------------------------------------------------------//
// Caroucel image zoom functionality
//-----------------------------------------------------------------------------------------------------------//
document.addEventListener('DOMContentLoaded', function () {
    const carouselItems = document.querySelectorAll('.caroucel-item');
    const fullscreenContainer = document.querySelector('.fullscreen-container');
    const fullscreenContent = document.querySelector('.fullscreen-content');
    const closeFullscreenBtn = document.querySelector('.close-fullscreen');

    // Event listener for zoom buttons
    carouselItems.forEach(item => {
        item.querySelector('.zoom-btn').addEventListener('click', function () {
            const backgroundImage =
                window.getComputedStyle(item).backgroundImage;

            // Set the background image of the fullscreen content
            fullscreenContent.style.backgroundImage = backgroundImage;

            // Display the fullscreen modal
            fullscreenContainer.style.display = 'flex';
        });
    });

    // Event listener for close button in fullscreen modal
    closeFullscreenBtn.addEventListener('click', function () {
        fullscreenContainer.style.display = 'none';
    });
});

//-----------------------------------------------------------------------------------------------------------//
// H1 zoom effect on scroll for non-mobile devices.
//-----------------------------------------------------------------------------------------------------------//
const dynamicText = document.querySelector('h1');
const initialFontSize = 58; // Initial font size in pixels for larger screens
// const mobileFontSize = 35; // Fixed font size in pixels for mobile devices
const minFontSize = 10; // Minimum font size for non-mobile screens
const mobileBreakpoint = 1024; // Set the mobile breakpoint (e.g., 768px)

function adjustFontSize() {
    if (window.innerWidth >= mobileBreakpoint) {
        // Enable the effect on non-mobile devices
        window.addEventListener('scroll', handleScroll);
        // Reset font size to the initial size when resizing back to desktop
        dynamicText.style.fontSize = `${initialFontSize}px`;
    } else {
        // Disable the effect and set the fixed font size on mobile devices
        window.removeEventListener('scroll', handleScroll);
        dynamicText.style.fontSize = `${mobileFontSize}px`;
    }
}

function handleScroll() {
    // Calculate the new font size based on the scroll position for non-mobile devices
    const scrollTop = window.pageYOffset;

    // Decrease font size as you scroll up (closer to the top)
    const newFontSize = Math.max(
        initialFontSize - scrollTop * 0.1,
        minFontSize
    );

    // Apply the new font size
    dynamicText.style.fontSize = `${newFontSize}px`;
}

// Run adjustFontSize on load and on window resize
adjustFontSize();
window.addEventListener('resize', adjustFontSize);

//-----------------------------------------------------------------------------------------------------------//
// Animation for the contact section. Scroll the contact blocks within the contacts block and jumping.
//-----------------------------------------------------------------------------------------------------------//
document.addEventListener('DOMContentLoaded', function () {
    const contactBlocks = document.querySelectorAll('.contacts-block-white');
    const contactsBlock = document.querySelector('.contacts-block');

    // Trigger the jump animation after a delay
    contactBlocks.forEach(block => {
        setTimeout(() => {
            block.classList.add('show'); // Add the class to start the jump
        }, 0); // Optional delay before starting the jump
    });

    // Speed factor: Increase this number to make it scroll faster
    const speedFactor = 0.5; // Adjust this value as needed

    // Function to handle the scroll animation
    function handleScroll() {
        // Get the scroll position
        const scrollPosition = window.scrollY;

        // Get the bounding rectangle of the contacts block
        const contactsBlockRect = contactsBlock.getBoundingClientRect();

        // Adjust each contact block based on scroll position
        contactBlocks.forEach(block => {
            // Calculate the new position for the block based on scroll with speed factor
            const offset =
                (scrollPosition - contactsBlockRect.top) * speedFactor;

            // Stop the block at the edge of the contacts block
            const blockPosition = Math.max(
                0,
                Math.min(offset, contactsBlockRect.height - block.offsetHeight)
            );

            // Move the block
            block.style.transform = `translateY(${blockPosition}px)`;
        });
    }

    // Add scroll event listener only if the screen width is greater than 480px
    function checkScreenWidth() {
        if (window.innerWidth > 480) {
            window.addEventListener('scroll', handleScroll);
        } else {
            window.removeEventListener('scroll', handleScroll); // Ensure it is removed on smaller screens
        }
    }

    // Initial check
    checkScreenWidth();

    // Check on resize
    window.addEventListener('resize', checkScreenWidth);
});

//-----------------------------------------------------------------------------------------------------------//
// h2 dropdown effect
//-----------------------------------------------------------------------------------------------------------//
document.addEventListener('DOMContentLoaded', function () {
    // Select all <h2> elements
    const headings = document.querySelectorAll('h2');

    // Select all <p> elements
    const paragraphs = document.querySelectorAll('p');

    // Select all elements with the class '.service'
    const serviceBlocks = document.querySelectorAll('.service');

    function handleScroll() {
        const triggerBottom = window.innerHeight * 0.85;

        // Check visibility for each <h2> element
        headings.forEach(heading => {
            const headingTop = heading.getBoundingClientRect().top; // Get the top position of the heading

            if (headingTop < triggerBottom) {
                heading.classList.add('visible'); // Add visible class
            } else {
                heading.classList.remove('visible'); // Remove visible class
            }
        });

        // Check visibility for each <p> element
        paragraphs.forEach(paragraph => {
            const paragraphTop = paragraph.getBoundingClientRect().top; // Get the top position of the paragraph

            if (paragraphTop < triggerBottom) {
                paragraph.classList.add('visible'); // Add visible class
            } else {
                paragraph.classList.remove('visible'); // Remove visible class
            }
        });

        // Check visibility for each '.service' block
        serviceBlocks.forEach(block => {
            const blockTop = block.getBoundingClientRect().top; // Get the top position of the block

            if (blockTop < triggerBottom) {
                block.classList.add('visible'); // Add visible class
            } else {
                block.classList.remove('visible'); // Remove visible class
            }
        });
    }

    // Add the scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Trigger the handleScroll function on page load
    handleScroll();
});

//-----------------------------------------------------------------------------------------------------------//
// JavaScript for form submission handling (simple)
//-----------------------------------------------------------------------------------------------------------//

const form = document.getElementById('contactForm');
const successMessage = document.getElementById('successMessage');

form.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form from submitting the traditional way

    // Show success message
    successMessage.style.display = 'block';

    // Clear form inputs after submission
    form.reset();

    // Hide the message after 3 seconds
    setTimeout(() => {
        successMessage.style.display = 'none';
    }, 3000);
});
