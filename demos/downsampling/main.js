const worker = new Worker('worker.js');


var submissionObject = {
    file:null, 
    tau:10.0, // float >= 0 and < 100
    fastwhat:0, // for fastq, 1 for fasta
    k:14, // anywhere from 3 to 30
    downloadFilename:'file.fastq',
    downloadURL:null};

// file select element
const fileSelectButton = document.getElementById("fileSelectButton");
const fileInput = document.getElementById("fileInput");

// submission / download button
const actionButton = document.getElementById("downloadFormBtn");
const actionText = document.getElementById("submitDownloadButtonText");

// html form inputs
const tauInput = document.getElementById("tauInput");
const kInput = document.getElementById("kInput");

actionButton.addEventListener("click", handleAction)

fileSelectButton.addEventListener("click", function (e) {
  if (fileInput) {
    fileInput.click();
  }
}, false);

fileInput.addEventListener("change", handleFiles, false);

worker.addEventListener('message', handleWorkerUpdate);

// code to handle the files
function handleFiles(e) {
    if (this.files.length) {
        submissionObject.file = this.files[0];
    }
}

// gathers parameters from the form into a submission object
// which is then sent to the webassembly
function handleAction(e) {

    if (actionText.innerText == "Submit") {
        if (submissionObject.file){
            submissionObject.tau = parseFloat(tauInput.value);
            submissionObject.k = parseInt(kInput.value);
            console.log(submissionObject);
            // submit the submissionObject to the webworker
            worker.postMessage({eventType: "SUBMIT", eventData: submissionObject});

            actionButton.className = "form-download-button";
            actionText.innerText = "Progress";
        } else {
            // user still needs to select a file!
        }
    } else if (actionText.innerText == "Download") {
        actionText.innerText = "Submit";
        document.getElementById("loadingBar").style.width = "0%";
        document.getElementById("loadingBar").style.background = "";
        downloadBlob(submissionObject);
    }

}

function handleWorkerUpdate(event) {
    
    const { eventType, eventData, eventId } = event.data;
    if (eventType == "PROGRESS"){
        document.getElementById("loadingBar").style.width = eventData.toString()+"%";
    } else if (eventType == "FINISHED"){
        submissionObject.downloadURL = eventData;
        actionButton.classList.add("hoverable");
        document.getElementById("loadingBar").style.width = "100%";
        document.getElementById("loadingBar").style.background = "transparent";
        actionText.innerText = "Download";
    }
}

function downloadBlob(submissionObject){
    if (submissionObject.downloadURL){
        const link = document.createElement("a");
        link.href = submissionObject.downloadURL;
        link.download = submissionObject.downloadFilename;
        document.body.appendChild(link);
    
        link.dispatchEvent(
            new MouseEvent('click', {
                bubbles: true, 
                cancelable: true, 
                view: window 
            })
        );

        document.body.removeChild(link);
    }
}
