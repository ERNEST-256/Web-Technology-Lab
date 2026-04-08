const EventEmitter = require('events');

const appEvents = new EventEmitter();

appEvents.on('taskCompleted', (taskName, userName) => {
    console.log(`[Listener 1] ${userName} completed: ${taskName}`);
});

appEvents.on('taskCompleted', (taskName) => {
    console.log(`[Listener 2] Notification saved for task: ${taskName}`);
});

appEvents.on('taskFailed', (taskName, reason) => {
    console.log(`[Failure Listener] ${taskName} failed because: ${reason}`);
});

console.log('Starting event-driven flow...');

setTimeout(() => {
    appEvents.emit('taskCompleted', 'Build Node.js Server', 'Aarav');
}, 500);

setTimeout(() => {
    appEvents.emit('taskCompleted', 'Perform File Operations', 'Aarav');
}, 1000);

setTimeout(() => {
    appEvents.emit('taskFailed', 'Deploy App', 'Server not reachable');
}, 1500);
