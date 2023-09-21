console.log('Hello, world!');
// Importing the EventEmitter class from the 'events' module

const { EventEmitter } = require('events');
// Creating an instance of EventEmitter
const trafficLightEmitter = new EventEmitter();

// Array representing the traffic light colors and their durations
const lights = [
  { color: 'Red', duration: 5000 },
  { color: 'Yellow', duration: 2000 },
  { color: 'Green', duration: 5000 }
];

// Index to keep track of the current light color
let currentIndex = 0;

// Function to change the traffic light color and emit an event
function changeColor() {
    // Get the light based on the current index
  const light = lights[currentIndex];
   // Log the current color to the console
  console.log(light.color);
  // Emit an event indicating the color change
  trafficLightEmitter.emit('colorChange', light.color);
  // Update the index to the next color, cycling back to 0 if at the end
  currentIndex = (currentIndex + 1) % lights.length;
  // Schedule the next color change based on the duration of the current color
  setTimeout(changeColor, light.duration);
}

// Initial call to start the color change process
changeColor();

// Listen for the 'colorChange' event and log the color change
trafficLightEmitter.on('colorChange', (color) => {
  console.log(`The light just changed to ${color}`);
});
