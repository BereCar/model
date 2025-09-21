import jsonfile from 'jsonfile';
import moment from 'moment/moment.js';
import simpleGit from 'simple-git';
import random from 'random';

const path = './data.json';

const markCommit = (x, y) => {
const date = moment()
.subtract(1, 'y')
.add (1, 'd')
.add(x, 'w')
.add(y, 'd')
.format();
const data = {date: date};

jsonfile.writeFile(path, data, ()=> {
simpleGit().add([path]).commit(date, {'--date':date}).push()
})
}
//markCommit(3,4)

const makeCommits = (n)=>{
    if (n === 0) return simpleGit().push();
    const x = random.int(0,54);
    const y = random.int(0,6);
    const date = moment().subtract(1, 'y').add (1, 'd').add(x, 'w').add(y, 'd').format();
    const data = {date: date};
    console.log(date);
    let today = moment().startOf('day');
if (moment(date).isAfter(today)) {
    console.log('The date is in the future.');
}else{
  jsonfile.writeFile(path, data, ()=> {
        simpleGit()
        .add([path])
        .commit(date, {'--date':date},makeCommits.bind(this, --n));
    });
}
   

 
}
makeCommits(100); 