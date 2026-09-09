const https = require('https');
const token = process.argv[2];
const url = new URL('https://design.penpot.app/mcp/stream?userToken=' + token);

// Initialize
const initData = JSON.stringify({jsonrpc:'2.0',method:'initialize',params:{protocolVersion:'2024-11-05',capabilities:{},clientInfo:{name:'hermes',version:'1.0'}},id:1});

const initReq = https.request({hostname:url.hostname,path:url.pathname+url.search,method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json, text/event-stream','Content-Length':initData.length}}, initRes => {
  let sessionId = initRes.headers['mcp-session-id'];
  let body = '';
  initRes.on('data', chunk => body += chunk);
  initRes.on('end', () => {
    console.log('Session:', sessionId);
    
    // Try execute_code
    const callData = JSON.stringify({jsonrpc:'2.0',method:'tools/call',params:{name:'execute_code',arguments:{code:'return { pages: penpotUtils.getPages() };'}},id:2});
    const callReq = https.request({hostname:url.hostname,path:url.pathname+url.search,method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json, text/event-stream','mcp-session-id':sessionId,'Content-Length':callData.length}}, callRes => {
      let callBody = '';
      callRes.on('data', chunk => callBody += chunk);
      callRes.on('end', () => console.log('Execute result:', callBody.substring(0, 2000)));
    });
    callReq.write(callData);
    callReq.end();
  });
});
initReq.write(initData);
initReq.end();
