console.log('Give your stealer logs into ./logs');


const fs = require('fs-extra');
const path = require('path');
const { exit } = require('process');
let walk = function(dir, done) {
  let results = [];
  fs.readdir(dir, function(err, list) {

    if (err) return done(err);
    let i = 0;
    (function next() {
      let file = list[i++];
      if (!file) return done(null, results);
      file = path.resolve(dir, file);
      fs.stat(file, function(err, stat) {
        if (stat && stat.isDirectory()) {
          walk(file, function(err, res) {
            results = results.concat(res);
            next();
          });
        } else {
          results.push(file);
          next();
        }
      });
    })();
  });
};

if(!fs.existsSync("logs")){
	fs.mkdirSync('logs');
	console.log('I couldn\'t find the "logs" folder, so I created it for you. All you have to do is put the logs in the "logs" folder and run the script again.');
	exit();
}
if(!fs.existsSync("result")){
	fs.mkdirSync('result');
}
console.log('Collecting ways, don\'t finish the script until it wants you to.\nYes, now it\'s not you who wants it, it\'s the script :3');

walk('./logs', function(err, results) {
  if (err) throw err;
  console.log(results)
  for ( strPath of results) {
	  try{
	  if( strPath.endsWith('Passwords.txt')){
  let data = fs.readFileSync(strPath);
let password2 = [...(data.toString()
				.matchAll(/URL: ((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)\r\nUsername: (([^\n]*))\r\nPassword: (([^\n]*))/g))]
					.map(m => m.slice(1)); 
					password2.forEach(x => {
						if(x[1].split('//')[0] == "android:") return;
						console.log(`${x[1]}\n${x[4]}:${x[6]}`)
						fs.appendFileSync(`./result/${x[1].split('//')[1]}.txt`,  x[4] + ":" + x[6] + "\n");
						fs.appendFileSync('allLogPass.txt',  x[4] + ":" + x[6] + "\n");
					});

 }
	  } catch(err) {
		  console.log(err)
	  }
  }
});
walk('./logs', function(err, results) {
	if (err) throw err;
	console.log(results)
	for ( strPath of results) {
		try{
			if(strPath.endsWith('.ldb') || strPath.endsWith('.txt') || strPath.endsWith('.log')){
				let data = fs.readFileSync(strPath, 'utf8');
				let tk = [...data.toString('utf8')
				.matchAll(/(mfa\.[\w_\-]{84})|([\w]{24}\.[\w_\-]{6}\.[\w_\-]{27})/g)]
				.map( m => m.slice(1)).flat(Infinity)
				.filter(Boolean).filter(tok => tok.startsWith('mfa.') || /\d{17,18}/.test(Buffer.from(tok.split('.')[0], 'base64').toString())); 
				tk.forEach(t => {
					console.log(t)	
					fs.appendFileSync(`tokens.txt`, t +'\n');	
				});
			}
		} catch(err) {
			console.log(err)
		}
	}
});
walk('./logs', function(err, results) {
  if (err) throw err;
  console.log(results)
  for ( strPath of results) {
	  try{
	  if( strPath.endsWith('.txt')){
  let data = fs.readFileSync(strPath);
let password2 = [...(data.toString()
				.matchAll(/Server: (?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?):([0-9]{1,5})\r\nUsername: (([^\n]*))\r\nPassword: (([^\n]*))/g))]; 
					
				  password2.forEach(x => {
					    console.log(x[0].replace(/\r\n/g, "|"));
						if(x[3].includes('root')){
						fs.appendFileSync('server_root.txt', x[0].replace(/\r\n/g, "|") + "\n");
						} else {
					    fs.appendFileSync('server.txt', x[0].replace(/\r\n/g, "|") + "\n");
						}
					}); 

 }
	  } catch(err) {
		  console.log(err)
	  }
  }
});
