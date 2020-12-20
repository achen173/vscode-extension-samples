// This script will be run within the webview itself
// It cannot access the main VS Code APIs directly.
(function () {
    
    const vscode = acquireVsCodeApi();

    const oldState = vscode.getState();

    const counter1 = document.getElementById('lines-of-code-counter1');
    const counter2 = document.getElementById('lines-of-code-counter2');
    const counter3 = document.getElementById('lines-of-code-counter3');
    console.log(oldState);
    let currentCount = (oldState && oldState.count) || 0;
    counter1.textContent = currentCount;
    counter2.textContent = currentCount;
    counter3.textContent = currentCount;

    setInterval(() => {

        counter1.textContent = currentCount++;
        counter2.textContent = currentCount++;
        navigator.getBattery().then(function(battery) {
            // Battery level is between 0 and 1, so we multiply it by 100 to get in percents
            counter3.textContent = "Battery level: " + battery.level * 100 + "%";
        });
        // Update state
        vscode.setState({ count: currentCount });


    }, 100);

    // Handle messages sent from the extension to the webview
    window.addEventListener('message', event => {
        const message = event.data; // The json data that the extension sent
        switch (message.command) {
            case 'refactor':
                currentCount = Math.ceil(currentCount * 0.5);
                counter.textContent = currentCount;
                break;
        }
    });
}());