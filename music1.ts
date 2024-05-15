let form: HTMLFormElement = document.getElementById('upload-form-id') as HTMLFormElement;
let formContainer: HTMLDivElement = document.querySelector('.upload-form-container') as HTMLDivElement;
let fileInput: HTMLInputElement = document.querySelector('.file-input-method') as HTMLInputElement;
let playSongDiv: HTMLDivElement = document.querySelector('.display-selected-song') as HTMLDivElement;
let playSongButton: HTMLButtonElement = document.querySelector('.play-song-button') as HTMLButtonElement;
let songElement: HTMLAudioElement = document.querySelector('.audio-element') as HTMLAudioElement;
let SongFile: File | null = null;

// the song playing codes and the ones of the play and pause buttons
let songNameElement: HTMLHeadElement = document.querySelector('.display-selected-song-name') as HTMLHeadElement;
let playButton: HTMLDivElement = document.querySelector('.icons-sample-play') as HTMLDivElement;
let pauseButton: HTMLDivElement = document.querySelector('.icons-sample-pause') as HTMLDivElement;
let songContainer: HTMLDivElement = document.querySelector('.playing-container') as HTMLDivElement;
let songContaierTitle: HTMLDivElement = document.querySelector('.playing-container-details-song-file') as HTMLDivElement;
let rightShifterButton: HTMLElement = document.getElementById('right-shifter') as HTMLElement;
let leftShifterButton: HTMLElement = document.getElementById('left-shifter') as HTMLElement;

// volume control elements
let volumeControl: HTMLInputElement = document.querySelector('.volume-control') as HTMLInputElement;
let volumeWorking: HTMLElement = document.querySelector('.volume-working') as HTMLElement;
let volumeMute: HTMLElement = document.querySelector('.volume-muted') as HTMLElement;

// the mins controller 
let minsController: HTMLInputElement = document.querySelector('.playing-container-controllers-level-range') as HTMLInputElement;
let timeRemain: HTMLDivElement = document.querySelector('.time-remain') as HTMLDivElement;
let totalTime: HTMLDivElement = document.querySelector('.total-time') as HTMLDivElement;

if (form == null || fileInput == null || playSongDiv == null || playSongButton == null || songElement == null || songNameElement == null || playButton == null || pauseButton == null || songContainer == null || songContaierTitle == null || rightShifterButton == null || leftShifterButton == null || volumeControl == null || volumeWorking == null || volumeMute == null || minsController == null || timeRemain == null || totalTime == null) {
    alert('Error: Could not find the file input or form element');
}

// working on it

const updateMinsController = () => {
    if (songElement == null) {
        alert('Error: No song selected');
        return;
    } else {
        // Calculate the current time as a percentage of the total duration
        const percentage = (songElement.currentTime / songElement.duration) * 100;
        minsController.value = percentage.toString();
    }
};

minsController.addEventListener('change', () => {
    if (songElement == null) {
        alert('Error: No song selected');
        return;
    } else {
        // Get the percentage value from the slider
        let percentage = parseFloat(minsController.value);
        if (isNaN(percentage)) {
            alert('Error: Mins control not working');
            return;
        } else {
            // Convert the percentage back to a time value
            songElement.currentTime = (percentage / 100) * songElement.duration;
        }
    }
});

songElement.addEventListener('timeupdate', () => {
    updateMinsController();
});

// Since we're using percentages, the max attribute should always be 100
minsController.max = "100";
minsController.min = "0";

// Function to format time in minutes and seconds
function formatTime(timeInSeconds: number) {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    // Pad seconds with a leading zero if less than 10
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    return `${minutes}:${formattedSeconds}`; // Returns time in "minutes:seconds" format
}

// Update the display of elapsed time and total time
const updateTimeDisplay = () => {
    if (songElement) {
        // Elapsed time
        const elapsedTime = songElement.currentTime;
        timeRemain.textContent = formatTime(elapsedTime);

        // Total duration of the song
        totalTime.textContent = formatTime(songElement.duration);
    }
};

// Call this function whenever you need to update the time display
// For instance, on song load and during playback
songElement.addEventListener('loadedmetadata', updateTimeDisplay);
songElement.addEventListener('timeupdate', updateTimeDisplay);


// working on it 

volumeWorking.addEventListener('click', () => {
    if (songElement == null) {
        alert('Error: No song selected');
        return
    } else {
        songElement.volume = 0;
        volumeControl.value = '0';
    }
})


volumeControl.addEventListener('change', () => {
    if (songElement == null) {
        alert('Error: No song selected');
        return
    } else {
        let volume: number = volumeControl.value as unknown as number;
        if (volume == null) {
            alert('Error: Volume control not working');
        } else {
            let realVolume: string = (volume / 100).toString() as unknown as string;
            if (realVolume == '0') {
                volumeMute.style.display = 'none';
                volumeWorking.style.display = 'flex';
            } else {
                volumeMute.style.display = 'flex';
                volumeWorking.style.display = 'none';
            }
            songElement.volume = parseFloat(realVolume);
        }
    }
})

rightShifterButton.addEventListener('click', () => {
    if (songElement == null) {
        alert('Error: No song selected');
        return
    } else {
        songElement.currentTime -= 5;
    }
})

leftShifterButton.addEventListener('click', () => {
    if (songElement == null) {
        alert('Error: No song selected');
        return
    } else {
        songElement.currentTime += 5;
    }
})

playButton.addEventListener('click', () => {
    playButton.style.display = 'none';
    pauseButton.style.display = 'flex';
    if (songElement.src == null) {
        alert('Error: No song selected');
        return
    } else {
        songElement.play();
    }
})

pauseButton.addEventListener('click', () => {
    playButton.style.display = 'flex';
    pauseButton.style.display = 'none';
    if (songElement.src == null) {
        alert('Error: No song selected');
        return
    } else {
        songElement.pause();
    }
})


fileInput.addEventListener('change', () => {
    songSelectionProcess();
})

playSongButton.addEventListener('click', () => {
    playSongProcess()
})

const playSongProcess = () => {
    if (SongFile != null) {
        let url: string = URL.createObjectURL(SongFile);
        // songElement.style.display = 'flex';
        songElement.src = url;
        songElement.volume = parseFloat(((volumeControl.value as unknown as number) / 100).toString());
        songElement.play();
        songContainer.style.display = 'flex';
        songContaierTitle.innerHTML = SongFile.name;
        playSongButton.innerHTML = 'Song Playing...'
    } else {
        alert('Error: Please Select a song');
    }
}

const songSelectionProcess = () => {
    if (fileInput.value != '') {
        SongFile = fileInput.files![0];
        let fileName: string = SongFile.name;
        let fileType: string = SongFile.type;
        if (fileType != 'audio/mpeg' && fileType != 'audio/wav' && fileType != 'audio/mp3') {
            alert('Selecte file not a song');
            fileInput.value = '';
            return;
        } else {
            formContainer.style.display = 'none';
            form.style.display = 'none';
            playSongDiv.style.display = 'flex';

            songNameElement.innerHTML = fileName;
        }
    } else {
        alert('Error: No file selected');
    }
}