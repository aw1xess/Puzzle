const fileInput = document.getElementById("fileInput");
let result = "";

fileInput.addEventListener("change", async () => {
    const [file] = fileInput.files;

    if (file) {
        let fileText = await file.text();
        result = findLongestSequence(fileText.split("\n"));
    }
});

function findLongestSequence(numbers) {
    function canConnect(a, b) {
        return a.slice(-2) === b.slice(0, 2);
    }

    let maxSequence = "";

    numbers.forEach((start) => {
        let result = start;
        let used = new Set([start]);
        let currentNumber = start;

        while (true) {
            let found = false;

            for (let i = 0; i < numbers.length; i++) {
                if (
                    !used.has(numbers[i]) &&
                    canConnect(currentNumber, numbers[i])
                ) {
                    result += numbers[i].slice(2);
                    currentNumber = numbers[i];
                    used.add(currentNumber);
                    found = true;
                    break;
                }
            }

            if (!found) break;
        }

        if (result.length > maxSequence.length) {
            maxSequence = result;
        }
    });

    const resultInput = document.getElementById("puzzle");
    resultInput.textContent = maxSequence;
}
