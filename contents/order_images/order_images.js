// Define the list of image sources
const imageDir = "../.."
const imageSources = [
    "images/image5.jpg",
    "images/image70.jpg",
    "images/image24.jpg",
    "images/image53.jpg",
    "images/image66.jpg",
    "images/image71.png",
    "images/image65.jpg",
    "images/image42.jpg",
    "images/image78.jpg",
    "images/image7.jpg",
    "images/image10.jpg",
    "images/image64.jpg",
    "images/image39.jpg",
    "images/image69.jpg",
    "images/image82.jpg",
    "images/image45.jpg",
    "images/image12.jpg",
    "images/image32.jpg",
    "images/image40.jpg",
    "images/image56.jpg",
    "images/image43.jpg",
    "images/image25.jpg",
    "images/image62.jpg",
    "images/image59.jpg",
    "images/image21.jpg",
    "images/image57.jpg",
    "images/image80.jpg",
    "images/image60.jpg",
    "images/image68.png",
    "images/image26.png",
    "images/image29.png",
    "images/image48.jpg",
    "images/image73.jpg",
    "images/image19.jpg",
    "images/image54.jpg",
    "images/image1.jpg",
    "images/image50.jpg",
    "images/image35.jpg",
    "images/image20.jpg",
    "images/image15.png",
    "images/image3.jpg",
    "images/image74.jpg",
    "images/image52.jpg",
    "images/image75.jpg",
    "images/image83.png",
    "images/image17.png",
    "images/image49.jpg",
    "images/image9.jpg",
    "images/image22.jpg",
    "images/image14.png",
    "images/image37.jpg",
    "images/image81.png",
    "images/image36.jpg",
    "images/image38.jpg",
    "images/image47.jpg",
    "images/image58.jpg",
    "images/image23.jpg",
    "images/image79.jpg",
    "images/image11.jpg",
    "images/image63.jpg",
    "images/image77.jpg",
    "images/image4.jpg",
    "images/image27.png",
    "images/image72.jpg",
    "images/image61.jpg",
    "images/image55.png",
    "images/image8.jpg",
    "images/image44.jpg",
    "images/image16.png",
    "images/image28.png",
    "images/image51.jpg",
    "images/image13.jpg",
    "images/image2.jpg",
    "images/image6.jpg",
    "images/image34.jpg",
    "images/image67.jpg",
    "images/image31.jpg",
    "images/image46.jpg",
    "images/image30.jpg",
    "images/image33.jpg",
    "images/image18.jpg",
    "images/image76.jpg",
    "images/image41.jpg"
];

const imagesWithIndices = imageSources.map((src, index) => ({ src, index }));



const slider = document.getElementById('numImagesSlider');
const numImagesLabel = document.getElementById('numImagesLabel');

numImagesSelect = parseInt(slider.value, 10);
numImagesLabel.textContent = numImagesSelect;// Initial number of images to display


// Update the number of images based on the slider value
slider.addEventListener('input', () => {
    numImagesSelect = parseInt(slider.value, 10);
    numImagesLabel.textContent = numImagesSelect;
    createAndPositionImages(); // Recreate the images with the new number
});




const circleContainer = document.getElementById('circle-container');
const popupSolved = document.getElementById('popup-solved');
const popupFailed = document.getElementById('popup-failed');

console.log(JSON.stringify(imageSources));

// Declare variables to share between callbacks
let selectedImages; // Original set of selected images
let imagesToSelect; // Images the user needs to select in order



// Initialize the puzzle
createAndPositionImages();


// Function to create and position images in a circular pattern
function createAndPositionImages() {

    // CSS and sizes
    let containerSize = 0.9 * Math.min(window.innerWidth, window.innerHeight); // Size of the circular container (adaptative)
    let maxImageRadius = (containerSize * Math.sin(Math.PI / numImagesSelect)) / (1 + Math.sin(Math.PI / numImagesSelect)) / 2;
    let imageSize = 2 * maxImageRadius * 0.9; // Adjust image size
    let centerSize = (containerSize - 2 * imageSize) * 0.85;
    let centerPosition = containerSize / 2;


    // Set CSS variables
    document.documentElement.style.setProperty('--container-size', `${containerSize}px`);
    document.documentElement.style.setProperty('--image-size', `${imageSize}px`);
    document.documentElement.style.setProperty('--highlight-size', `${imageSize * 3 / 100}px`);
    document.documentElement.style.setProperty('--center-size', `${centerSize}px`);
    document.documentElement.style.setProperty('--center-position', `${centerPosition}px`);

    adjustFontSize()



    // Clear previous images
    const images = document.querySelectorAll('.circle-container .image');
    images.forEach(image => image.remove());

    // Initialize and shuffle the images
    selectedImages = shuffleSelectArray([...imagesWithIndices]); // Make a copy and shuffle
    imagesToSelect = [...selectedImages]; // Copy to keep track of user selection

    console.log(JSON.stringify(selectedImages));

    // Initialize the angle and radius for positioning
    const angleIncrement = (2 * Math.PI) / selectedImages.length;
    const radius = containerSize / 2 - imageSize / 2;

    selectedImages.forEach((imageObj, position) => {
        const img = document.createElement('img');
        img.src = `${imageDir}/${imageObj.src}`;
        img.alt = `Image ${position + 1}`;
        img.classList.add('image');

        // Calculate position for the image
        const angle = angleIncrement * position;
        const x = radius * Math.cos(angle) + radius;
        const y = radius * Math.sin(angle) + radius;
        img.style.left = `${x}px`;
        img.style.top = `${y}px`;

        // Add click event listener
        img.addEventListener('click', () => handleImageClick(img, imageObj));

        circleContainer.appendChild(img);
    });
}

function handleImageClick(img, imageObj) {
    let minRemainderIndex = getMinimumIndex(imagesToSelect);
    console.log(JSON.stringify(imagesToSelect));
    console.log("imageObj.index:", imageObj.index);
    console.log("minRemainderIndex:", minRemainderIndex);

    if (imageObj.index === minRemainderIndex) {
        img.classList.add('highlight');        
    } else {
        popupFailed.classList.add('active');
    }

    imagesToSelect = removeImageByIndex(imagesToSelect, imageObj.index);
    if (imagesToSelect.length === 0) {
        popupSolved.classList.add('active');
    }
}

// Function to select and shuffle a number of elements from the array
function shuffleSelectArray(images) {
    shuffleArray(images);
    return images.slice(0, numImagesSelect);
}

// Function to shuffle an array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Function to get the minimum index from imagesToSelect
function getMinimumIndex(images) {
    return Math.min(...images.map(imageObj => imageObj.index));
}

// Function to remove an image by index from imagesToSelect
function removeImageByIndex(images, targetIndex) {
    const indexToRemove = findIndexInImageIndexList(images, targetIndex);
    images.splice(indexToRemove, 1);
    return images;
}

// Function to find the index of an image in the array
function findIndexInImageIndexList(pairsArray, targetIndex) {
    for (let i = 0; i < pairsArray.length; i++) {
        if (pairsArray[i].index === targetIndex) {
            return i;
        }
    }
    return -1;
}

// Function to reset the puzzle (deselects images but keeps the same set)
function resetPuzzle(popupId) {
    // Remove the 'highlight' class from all images
    const images = document.querySelectorAll('.circle-container .image');
    images.forEach(image => image.classList.remove('highlight'));

    // Hide the popup message
    document.getElementById(popupId).classList.remove('active');

    // Re-initialize the imagesToSelect array to the original selectedImages
    imagesToSelect = [...selectedImages];
}

// Function to change to a new puzzle (reshuffles and selects new images)
function changePuzzle(popupId) {
    createAndPositionImages();
    document.getElementById(popupId).classList.remove('active');
}

function adjustFontSize() {
    const centerText = document.querySelector('.center-text');
    const parentWidth = centerText.offsetWidth;
    const parentHeight = centerText.offsetHeight;

    // Start with a reasonably large font size
    let fontSize = 100;

    // Reduce the font size until it fits within the container
    centerText.style.fontSize = `${fontSize}px`;
    while (
        centerText.scrollWidth > parentWidth ||
        centerText.scrollHeight > parentHeight
    ) {
        fontSize--;
        centerText.style.fontSize = `${fontSize}px`;
    }
}
