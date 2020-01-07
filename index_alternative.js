const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.liveUrlChange = functions.database.ref('ProductionDB/Stock/').onWrite((event) => {
    // Exit if data is deleted.
    //if (!change.after.exists()) return null;

    // Grab the current value of what was written to the Realtime Database.
    //const value = change.after.val();
    //console.log('The liveurl value is now', value);

    // Build the messaging notification, sending to the 'all' topic.
    var message = {

        "data": {
            "message": 'Database update',
            "title": 'Please update prices on device'
        },
    };

    // Send the message.
    return admin.messaging().sendToTopic('update',message)
        .then((message) => console.log('Successfully sent message:', message)
        )
        .catch((error) => {
            console.error('Error sending message:', error);
        });
});
