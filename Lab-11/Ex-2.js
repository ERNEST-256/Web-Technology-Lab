const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'sample.txt');

fs.writeFile(filePath, 'Line 1: File created using fs.writeFile().\n', (writeError) => {
    if (writeError) {
        console.error('Error creating file:', writeError);
        return;
    }

    console.log('File created successfully.');

    fs.readFile(filePath, 'utf8', (readError, data) => {
        if (readError) {
            console.error('Error reading file:', readError);
            return;
        }

        console.log('Initial file content:');
        console.log(data);

        fs.appendFile(filePath, 'Line 2: Data appended using fs.appendFile().\n', (appendError) => {
            if (appendError) {
                console.error('Error appending to file:', appendError);
                return;
            }

            console.log('Data appended successfully.');

            fs.readFile(filePath, 'utf8', (finalReadError, updatedData) => {
                if (finalReadError) {
                    console.error('Error reading updated file:', finalReadError);
                    return;
                }

                console.log('Updated file content:');
                console.log(updatedData);

                fs.unlink(filePath, (deleteError) => {
                    if (deleteError) {
                        console.error('Error deleting file:', deleteError);
                        return;
                    }

                    console.log('File deleted successfully.');
                });
            });
        });
    });
});
