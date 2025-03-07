document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.hum-menu');
    const menu = document.querySelector('ul');

    menuToggle.addEventListener('click', () => {
        menu.classList.toggle('active');
    });

    const $viewer = document.querySelector('.model');
    const sections = document.querySelectorAll('.color-pick');
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');

    const customList = [
        { name: 'body', colors: ['black', 'white', 'gray', 'red', 'blue', 'yellow'], cameraPosition: { phi: 30, theta: 0, zoom: 0.6 } },
        { name: 'sleeves', colors: ['black', 'white', 'gray', 'red', 'blue', 'yellow'], cameraPosition: { phi: 10, theta: 90, zoom: 0.8 } },
        { name: 'collar', colors: ['black', 'white', 'gray', 'red', 'blue', 'yellow'], cameraPosition: { phi: 60, theta: 20, zoom: 0.6 } }
    ];

    let startPoint = 0;

    function updateSlider() {
        sections.forEach((section, index) => section.hidden = index !== startPoint);
        const { name, colors, cameraPosition } = customList[startPoint];
        const buttons = sections[startPoint].querySelectorAll('button');

        buttons.forEach((button, index) => {
            button.style.backgroundColor = colors[index];
            button.onclick = () => colorChanger(name, colors[index]);
        });

        if ($viewer.setCameraPosition) $viewer.setCameraPosition(cameraPosition);
    }

    function colorChanger(name, color) {
        if ($viewer.setColor) $viewer.setColor({ name, color });
        console.log(`Color changed: ${name} -> ${color}`);
    }

    prevButton.addEventListener('click', () => {
        startPoint = (startPoint - 1 + customList.length) % customList.length;
        updateSlider();
    });

    nextButton.addEventListener('click', () => {
        startPoint = (startPoint + 1) % customList.length;
        updateSlider();
    });

    if (typeof TSDViewer !== 'undefined' && TSDViewer.create) {
        TSDViewer.create($viewer, { model: 'hva-polo', plugins: 'custom', logo: 'true', onLoadComplete: updateSlider });
    }
});
