var http = require('http');
var Q = require('q');

var debug = false;
var silent = true;

function getHtml(url) {
    var deferred = Q.defer();
	
	if (!silent) {
		console.log('[getHtml] url:' + url);
	}
	
	

	var req = http.get(url,function(res) {
		var statusCode = res.statusCode;
		var headers = JSON.parse(JSON.stringify(res.headers));
		
		if(!silent) {
			console.log('[getHtml] status:' + statusCode);
		}
		
		var chunks = [];
		res.on('data', function (chunk) {  
			  chunks.push(chunk);
		});
		
		res.on('end',function() {
			var buffer = Buffer.concat(chunks);
			switch (headers['content-encoding']) {
			case 'gzip':
				zlib.gunzip(buffer, function (err, decoded) {
					var result = decoded.toString();
					if(debug) {
						console.log('======= [getHtml] result =======');
						console.log(result);
						console.log('===================================');
					}
					deferred.resolve(result);
				});
				break;
			default:
				if(debug) {
					console.log('======= [getHtml] result =======');
					console.log(chunks.toString());
					console.log('===================================');
				}
				deferred.resolve(chunks.toString());
			}

		});
	});
	
	//req.socket.setTimeout(60000,function(){
	//	req.abort();
	//	deferred.reject('[getHtml] request ' + url + ' time out');
	//});
	
	req.on('error', function (e) {
		deferred.reject('[getHtml] problem with request: ' + e.message);
	});
	
	req.end();
	
	return deferred.promise;	
}

exports.getHtml = getHtml;