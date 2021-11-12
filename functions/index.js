const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp();

exports.saveDrawing = functions.https.onCall(async (body, context) => {
  // Grab the text parameter.

  // Push the new message into Firestore using the Firebase Admin SDK.
  await admin.firestore().collection('images').add({ imageData: body.image });
  // Send back a message that we've successfully written the message body.data.image
  //res.json({ result: 'sucess, thanks for the drawing!' });
  return 'sucess, thanks for the drawing!'
});
