const admin = require('firebase-admin');

const serviceAccount = require(process.env.FIRESTORE_SERVICE_ACCOUNT)
const dbUrl = process.env.FIRESTORE_DB_URL

//console.log('testing serviceAccount is')
//console.dir(serviceAccount)

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: dbUrl
});

let program = require('commander');

//----------------------------------------------------------------------

const processCommand = (cmd, options)=>{
  if(program.C){
    //console.log('basic query)')
    let query = admin.firestore().collection(program.C).limit(parseInt(program.L))
    if(program.O && program.D){
      query = query.orderBy(program.O, program.D)
    }
    if(program.P && program.X && program.V){
      //console.log('adding where clause for "'+program.P+' '+program.X+' '+program.V+'"')
      query = query.where(program.P, program.X, program.V)
    }
    query.get().then((qsnap)=>{
      qsnap.forEach((snap)=>{
        let d = snap.data()
        if(d.createdAt){
          d.createdAt = new Date(d.createdAt).toISOString()
        }
        console.dir(d)
      })
      console.log('query got '+qsnap.size+' results')
    })

  }
}

program
.option('-c <collection>', 'firestore collection to use', 'users')
.option('-p <property>', 'document property to filter')
.option('-d <direction>', 'direction of order by (asc or desc)')
.option('-x <operation>', 'match operation on property and value, any of "<",">" or "=="')
.option('-v <value>', 'document value to filter match')
.option('-l <limit>', 'limit number of results', '10')
.option('-o <orderby>', 'document property to order results by')
//.command('q')
//.action(processCommand)
  .parse(process.argv)

processCommand()
