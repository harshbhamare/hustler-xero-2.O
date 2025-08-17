document.addEventListener('DOMContentLoaded', function () {
    const navItems = document.querySelectorAll('.nav-item');
    const contentSections = document.querySelectorAll('.course-content');

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            // Handle active class for nav items
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');

            // Get the target content ID from data-attribute
            const targetId = item.getAttribute('data-content') + '-content';

            // Hide all content sections
            contentSections.forEach(section => {
                section.classList.remove('active-content');
            });

            // Show the target content section
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.add('active-content');
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const accordionItems = document.querySelectorAll('.accordion-item');

    // Function to open the first item by default
    const openFirstItem = () => {
        if (accordionItems.length > 0) {
            const firstItem = accordionItems[0];
            // Manually set the max-height to its scroll height to show it instantly
            const content = firstItem.querySelector('.accordion-content');
            content.style.maxHeight = content.scrollHeight + 'px';
        }
    };

    openFirstItem();

    accordionItems.forEach(item => {
        const button = item.querySelector('.accordion-button');
        const content = item.querySelector('.accordion-content');

        button.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close all other items
            accordionItems.forEach(otherItem => {
                otherItem.classList.remove('active');
                otherItem.querySelector('.accordion-content').style.maxHeight = null;
            });

            // If the clicked item was not already active, open it
            if (!isActive) {
                item.classList.add('active');
                content.style.maxHeight = content.scrollHeight + 'px';
            }
        });
    });
});