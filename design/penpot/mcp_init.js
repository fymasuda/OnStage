const https = require('https');
const token = process.argv[2];
const url = new URL('https://design.penpot.app/mcp/stream?userToken=' + token);
const data = JSON.stringify({jsonrpc:'2.0',method:'initialize',params:{protocolVersion:'2024-11-05',capabilities:{},clientInfo:{name:'hermes',version:'1.0'}},id:1});
const req = https.request({hostname:url.hostname,path:url.pathname+url.search,method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json, text/event-stream','Content-Length':data.length}}, res => {
  let body = '';
  console.log('Status:', res.statusCode);
  console.log('Headers:', JSON.stringify({...res.headers, 'mcp-session-id': res.headers['mcp-session-id'] || 'NONE'}, null, 2));
  res.on('data', chunk => body += chunk);
  res.on('end', () => console.log('Body:', body.substring(0, 3000)));
});
req.write(data);
req.end();
