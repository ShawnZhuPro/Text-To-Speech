// Get the HTML element for voice selection
const voiceSelect = document.getElementById("voice-select");

// Initialize the SpeechSynthesis object
const synth = window.speechSynthesis;
let voices; // Variable to store available voices

// Function to populate the dropdown with available voices
function addVoicesToSelect() {
  voices = synth.getVoices(); // Get the available voices

  // Loop through the voices and create an option for each
  for (let i = 0; i < voices.length; i++) {
    const option = document.createElement("option");
    option.textContent = `${voices[i].name} - ${voices[i].lang}`; // Display voice name and language

    // Add a tag for default voice if it's the default one
    if (voices[i].default) {
      option.textContent += " - DEFAULT";
    }

    // Set data attributes for language and name
    option.setAttribute("data-lang", voices[i].lang);
    option.setAttribute("data-name", voices[i].name);

    // Append the created option to the voice selection dropdown
    voiceSelect.appendChild(option);
  }
}

// Function to handle form submission for text-to-speech conversion
function onSubmit(e) {
  e.preventDefault(); // Prevent default form submission behavior

  // Get the text input from the form
  const textInput = document.getElementById("text-input");

  // Create a SpeechSynthesisUtterance object with the input text
  const utterThis = new SpeechSynthesisUtterance(textInput.value);

  // Get the selected voice from the dropdown
  const selectedOption =
    voiceSelect.selectedOptions[0].getAttribute("data-name");

  // Match the selected voice and set it for utterance
  for (let i = 0; i < voices.length; i++) {
    if (voices[i].name === selectedOption) {
      utterThis.voice = voices[i];
      break; // Exit the loop once the voice is set
    }
  }

  // Speak the provided text using the selected voice
  synth.speak(utterThis);
}

// Initial population of voices in the dropdown
addVoicesToSelect();

// Event listener to update voices when available voices change
if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = addVoicesToSelect;
}

// Event listener for form submission to trigger text-to-speech conversion
document.getElementById("form").addEventListener("submit", onSubmit);
