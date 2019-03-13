# firestorequery
A small CLI tool to make queries to firestore

## Preqreuisites

* Go to your firebase project page
* Click the settings cogwheel icon at the top left
* Select Project settings
* Go to the 'Service Accounts' tab
* Click 'Generate new private key'
* Put this file in a safe place. This gives full access to your project and data!

Set the FIRESTORE_DB_URL to https://PROJECTID.firebaseio.com where PROJECTID is the name of your firebase project

    export FIRESTORE_DB_URL=https://PROJECTID.firebaseio.com

Set the FIRESTORE_SERVICE_ACCOUNT to the filepath of the private key file you downloaded

    export FIRESTORE_SERVICE_ACCOUNT=./my-key.json
    
## Running

    node index.js -h    to get help
    node index.js -c users      list ten documents from the 'suers' collection
    node index.js -c users -p username -x \> -v r     list users with username starting with r
    
        