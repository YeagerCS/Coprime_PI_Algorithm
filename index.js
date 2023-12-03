const evalPI = (coprimes, total) => {
    const probability = coprimes / total;
    return Math.sqrt((6 / probability))
}

const utilityScript = `
function isCoPrime(a, b) {
    return gcd(a, b) === 1;
}

function gcd(a, b) {
    a = Math.abs(a);
    b = Math.abs(b);

    while (b !== 0) {
        const temp = b;
        b = a % b;
        a = temp;
    }

    return a;
}
`;

const utilBlob = new Blob([utilityScript], {type: "application/javascript"})

const workerScript = `
onmessage = function(e) {
    importScripts(e.data.scriptBlob)
    const {start, end, max, min} = e.data;
    let coprimeCounter = 0;

    for(let i = 0; i < end; i++){
        const r1 = Math.round(Math.random() * (max - min) + min)
        const r2 = Math.round(Math.random() * (max - min) + min)

        if(isCoPrime(r1, r2)){
            coprimeCounter++;
        }
    }

    postMessage(coprimeCounter)
}
`;

const blob = new Blob([workerScript], {type: "application/javascript"})
const worker = new Worker(URL.createObjectURL(blob))


const run = async () => { 
    const total = (10 ** 6);
    let coprimeCounter = 0;
    const chunkSize = 10 ** 7;

    for(let i = 0; i < total; i += chunkSize){
        const end = Math.min(i + chunkSize, total);

        worker.postMessage({ scriptBlob: URL.createObjectURL(utilBlob), start: 1, end, max: 1000, min: 1});

        const result = await new Promise(resolve => {
            worker.onmessage = e => resolve(e.data);
        })

        coprimeCounter += result;
    }

    console.log(evalPI(coprimeCounter, total));
}