// faq-script.js
document.addEventListener('DOMContentLoaded', () => {
    const accordionItems = document.querySelectorAll('.accordion-item');

    // Set the correct height for the initially open item
    const firstActiveItem = document.querySelector('.accordion-item.active');
    if (firstActiveItem) {
        const content = firstActiveItem.querySelector('.accordion-content');
        content.style.maxHeight = content.scrollHeight + 'px';
    }

    accordionItems.forEach(item => {
        const button = item.querySelector('.accordion-button');
        const content = item.querySelector('.accordion-content');

        button.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close all other accordion items
            accordionItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.accordion-content').style.maxHeight = '0';
                }
            });

            // Toggle the clicked item's active state
            item.classList.toggle('active');

            // Set max-height for the active item to animate smoothly
            if (item.classList.contains('active')) {
                content.style.maxHeight = content.scrollHeight + 'px';
            } else {
                content.style.maxHeight = '0';
            }
        });
    });
});