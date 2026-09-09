const https = require('https');
const token = process.argv[2];
const url = new URL('https://design.penpot.app/mcp/stream?userToken=' + token);
const data = JSON.stringify({jsonrpc:'2.0',method:'tools/call',params:{name:'execute_code',arguments:{code:'return { pages: penpotUtils.getPages(), rootName: penpot.root ? penpot.root.name : "no root" };'}},id:2});
const req = https.request({hostname:url.hostname,path:url.pathname+url.search,method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json, text/event-stream','mcp-session-id':'16bfa4ba-c1c4-4732-9747-7bb88e831776','Content-Length':data.length}}, res => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => console.log(body.substring(0, 3000)));
});
req.write(data);
req.end();
