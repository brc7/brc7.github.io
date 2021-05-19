// polyfill for safari
if (!WebAssembly.instantiateStreaming) {
    WebAssembly.instantiateStreaming = async (resp, importObject) => {
            const source = await (await resp).arrayBuffer();
            return await WebAssembly.instantiate(source, importObject);
    };
}

function handleBlob(blob) {
    const blobURL = URL.createObjectURL(blob);
    self.postMessage({
        eventType: "FINISHED",
        eventData: blobURL
    });
}

// streaming file reader that does IO with webassembly module
function parseFile(fileData, wasmModule, callback) {
    // webassembly parameters
    var BUFFER_SIZE_BYTES = 5000000;//5000000; // needs to match #define in webassembly
    wasmModule.instance.exports.setInputBufferBytes(0);
    wasmModule.instance.exports.setOutputBufferBytes(0);
    wasmModule.instance.exports.setup(); // initialize race sketch

    var filebuffer_ptr = wasmModule.instance.exports.getInputBuffer();
    var filebuffer = new Uint8Array(wasmModule.instance.exports.memory.buffer, filebuffer_ptr, BUFFER_SIZE_BYTES);

    // unwrap file data arguments
    var file = fileData.file;
    var tau = fileData.tau;
    var fastwhat = fileData.fastwhat;
    var kmer_k = fileData.k;

    // streaming buffer IO parameters
    var fileSize = file.size;
    var chunkSize = BUFFER_SIZE_BYTES; // bytes
    var offset = 0;
    var chunkReaderBlock = null;

    var blobSoFar = new Blob([], {type: 'text/plain'});

    function processChunk(event){
        var outbuffer_ptr = wasmModule.instance.exports.getOutputBuffer();

        var chunkdata = new Uint8Array(event.target.result);
        var inbuffer_num_valid_bytes = wasmModule.instance.exports.getInputBufferBytes();

        // set filebuffer contents to the filedata
        filebuffer.set(chunkdata, inbuffer_num_valid_bytes);

        // update size of filebuffer
        console.log("SETTING INBUF: ",inbuffer_num_valid_bytes + chunkdata.length);
        wasmModule.instance.exports.setInputBufferBytes(inbuffer_num_valid_bytes + chunkdata.length);

        // call the process method
        wasmModule.instance.exports.process(tau, fastwhat, kmer_k);

        // set the outbuffer
        var outbuffer_num_valid_bytes = wasmModule.instance.exports.getOutputBufferBytes();
        
        console.log("GETTING OUTBUF: ",outbuffer_num_valid_bytes);
        var outbuffer = new Uint8Array(wasmModule.instance.exports.memory.buffer, outbuffer_ptr, outbuffer_num_valid_bytes);

        // append to the growing blob of text (note: blob lives on-disk - shouldn't count toward page memory)
        var chunkBlob = new Blob([outbuffer],{type:'text/plain'});
        blobSoFar = new Blob([blobSoFar, chunkBlob], {type: 'text/plain'});
        return;
    }

    function handleChunkLoadEnd(event){
        if (event.target.error == null) {
            // offset += event.target.result.length;
            offset += chunkSize; // weird bug see stackoverflow
            processChunk(event); // callback for handling read chunk

            self.postMessage({
                eventType: "PROGRESS",
                eventData: (100*offset / fileSize) });

        } else {
            console.log("Read error: " + event.target.error);
            callback(blobSoFar);
            return;
        }
        if (offset >= fileSize) {
            console.log("Done reading file");
            callback(blobSoFar);
            return;
        }

        // read the next chunk
        chunkReaderBlock(offset, file);
    }

    chunkReaderBlock = function(_offset, _file) {
        var inbuffer_num_valid_bytes = wasmModule.instance.exports.getInputBufferBytes();
        // dynamically adjust buffer size according to "leftover" data from webassembly module
        chunkSize = BUFFER_SIZE_BYTES - inbuffer_num_valid_bytes;
        console.log(offset,chunkSize,fileSize,wasmModule.instance.exports.getInputBufferBytes());

        var r = new FileReader();
        var blob = _file.slice(_offset, _offset + chunkSize);
        
        r.onloadend = handleChunkLoadEnd;


        r.readAsArrayBuffer(blob);
    }

    // start the recursive nightmare
    chunkReaderBlock(offset, file);
}



self.addEventListener('message', function(event) {
    const {eventType, eventData, eventId } = event.data;

    if (eventType == "SUBMIT"){
        WebAssembly.instantiateStreaming(fetch('library.wasm'))
        .then(wasmModule => {
            parseFile(eventData, wasmModule, handleBlob);
        });
    }

}, false);




// // Create promise to handle Worker calls whilst
// // module is still initialising
// let wasmResolve;
// let wasmReady = new Promise((resolve) => {
//     wasmResolve = resolve;
// })

// // Handle incoming messages
// self.addEventListener('message', function(event) {

//     const { eventType, eventData, eventId } = event.data;

//     if (eventType === "INITIALISE") {
//         WebAssembly.instantiateStreaming(fetch(eventData), {})
//             .then(instantiatedModule => {
//                 const wasmExports = instantiatedModule.instance.exports;

//                 // Resolve our exports for when the messages
//                 // to execute functions come through
//                 wasmResolve(wasmExports);

//                 // Send back initialised message to main thread
//                 self.postMessage({
//                     eventType: "INITIALISED",
//                     eventData: Object.keys(wasmExports)
//                 });
    
//             });
//     } else if (eventType === "CALL") {
//         wasmReady
//             .then((wasmInstance) => {
//                 const method = wasmInstance[eventData.method];
//                 const result = method.apply(null, eventData.arguments);
//                 self.postMessage({
//                     eventType: "RESULT",
//                     eventData: result,
//                     eventId: eventId
//                 });
//             })
//             .catch((error) => {
//                 self.postMessage({
//                     eventType: "ERROR",
//                     eventData: "An error occured executing WASM instance function: " + error.toString(),
//                     eventId: eventId
//                 });
//             })
//     }

// }, false);







// self.addEventListener("message", function(event) {
//   var max;
//   var counter;

//   max = event.data && event.data.max || 100000;
//   for (counter = 0; counter < max; ++counter) {
//     if (counter % 1000 === 0) {
//       self.postMessage({counter: counter});
//     }
//   }
//   self.postMessage({counter: counter});
// });