// drop down menu

const menuToggle = document.querySelector('.hum-menu');
const menu = document.querySelector('ul');

menuToggle.addEventListener('click', () => {
    menu.classList.toggle('active');
});
function showList(listId) {
    // Hide both lists
    document.getElementById("list1").classList.add("hidden");
    document.getElementById("list2").classList.add("hidden");

    // Show the selected list
    document.getElementById(listId).classList.remove("hidden");
  }


  ///
  ///document.addEventListener('DOMContentLoaded', () => {
    //const htmlElement = document.documentElement; 
   // let lastScrollPosition = 0;
  
   //  window.addEventListener('scroll', () => {
   //   const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    //    if (currentScrollPosition > lastScrollPosition) {
        // Scrolling down
    //   htmlElement.classList.add('is-scrolled-down');
    //  } else {
    //    // Scrolling up
    //    htmlElement.classList.remove('is-scrolled-down');
    //  }
    // lastScrollPosition = currentScrollPosition;
    //});
  //});

//calling and making list for cutom

const $viewer = document.querySelector('.model'); 
const sections = document.querySelectorAll('.color-pick'); 
const prevButton = document.getElementById('prev'); 
const nextButton = document.getElementById('next'); 


const customList = [ 
    
    { 
        name: 'body', 
        colors: ['black', 'white','gray','rgb(139, 36, 36)','rgb(115, 31, 234)'],
        cameraPosition: { phi: 30, theta: 0, zoom:0.6} 
    },
    { 
        name: 'sleeves', 
        colors: ['black', 'white','gray','rgb(139, 36, 36)','rgb(115, 31, 234)'],
        cameraPosition: { phi: 10, theta: 90, zoom:0.8 } 
    },
    { 
        name: 'collar',  
        colors: ['black', 'white','gray','rgb(139, 36, 36)','rgb(115, 31, 234)'],
        cameraPosition: { phi: 60, theta: 20, zoom:0.6} 
       
    }
];

let startPoint = 0; 

function updateSlider() {
    sections.forEach((section, index) => {
        section.hidden = index !== startPoint; 
    });

    const { name, colors, cameraPosition } = customList[startPoint];
    const buttonColor = sections[startPoint].querySelectorAll('button'); 
//change and update color and camera position function
    buttonColor.forEach((button, index) => {
        button.style.backgroundColor = colors[index]; 
        button.onclick = () => colorChanger(name, colors[index]); 
    });

    
    $viewer.setCameraPosition(cameraPosition); 
}


function colorChanger(name, color) {
    $viewer.setColor({ name, color });
    console.log(`Kleur veranderd: ${name} -> ${color}`);
}

// next and previse button
prevButton.addEventListener('click', () => {
    startPoint = (startPoint - 1 + customList.length) % customList.length;
    updateSlider();
});

nextButton.addEventListener('click', () => {
    startPoint = (startPoint + 1) % customList.length;
    updateSlider();
});

// maak de viewer aan 
TSDViewer.create($viewer, {
    model: 'hva-polo',
    plugins: 'custom',
    logo: 'true',
    onLoadComplete: () => {   
        updateSlider();
    },
});
let viewList = 1;
