var program = require('commander');
var fs = require('fs');
var stream = require('lei-stream');

var outFile = 'test.json';
program
    .version('0.0.1')
    .option('-i,--input [file]','the input log')
    .parse(process.argv);

if(!program.hasOwnProperty('input')) {
    console.log('input file must be specify');
	process.exit(0)
} 

 if(!fs.existsSync(program.input)) {
    console.log('file "' + program.input + '" not found.');
    process.exit(0);
 }
 
var dict = {};
dict.dict = 'caton';
dict.num = 0;
dict.data = [];

var s = stream.readLine(fs.createReadStream(program.input), {
//var s = stream.readLine(source, {
    // ���з���Ĭ��\n
    newline: '\n',
    // �Ƿ��Զ���ȡ��һ�У�Ĭ��false
    autoNext: false,
});

 s.on('data', function (data) {
	var item = {};
	var field = data.split('@*');
	for(var i in field) {
		if(field[i] === '') {
			continue;
		}
		item[i.toString()] = field[i];
	}
	console.log(item);
	dict.data.push(item);
	dict.num = dict.num + 1;
    s.next();
});

 // ������ʱ����end�¼�
s.on('end', function () {
	console.log('done');
	fs.writeFileSync(outFile,JSON.stringify(dict, null, 4));
});
