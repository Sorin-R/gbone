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
const mobileFontSize = 35; // Fixed font size in pixels for mobile devices
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
// 
//-----------------------------------------------------------------------------------------------------------//