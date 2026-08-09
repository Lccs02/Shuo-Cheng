import fs from "node:fs";
import http from "node:http";
import path from "node:path";

const root = process.cwd();
const contentDir = path.join(root, "content");
const editable = fs
  .readdirSync(contentDir)
  .filter((name) => name.endsWith(".json") && name !== "github-cache.json");
const port = Number(process.env.CONTENT_STUDIO_PORT || 4173);

function send(response, status, body, type = "application/json; charset=utf-8") {
  response.writeHead(status, { "Content-Type": type, "Cache-Control": "no-store" });
  response.end(body);
}

function safeFile(name) {
  if (!editable.includes(name)) return null;
  const file = path.resolve(contentDir, name);
  return file.startsWith(path.resolve(contentDir) + path.sep) ? file : null;
}

const page = `<!doctype html>
<html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width">
<title>程硕主页 · 本地内容工作室</title>
<style>
:root{font-family:system-ui,sans-serif;color:#222;background:#f3f1ec}*{box-sizing:border-box}
body{margin:0;display:grid;grid-template-columns:260px 1fr;min-height:100vh}aside{padding:24px;border-right:1px solid #cbc5ba;background:#fff}
main{padding:32px;min-width:0}button,select{font:inherit}select{width:100%;padding:10px}textarea{width:100%;height:66vh;margin-top:16px;padding:18px;font:14px/1.6 Consolas,monospace;border:1px solid #aaa;background:#fff}
.actions{display:flex;gap:10px;align-items:center;flex-wrap:wrap}.primary{background:#862f2d;color:white;border:0;padding:10px 18px}.secondary{padding:9px 16px;background:white;border:1px solid #999}
#status{color:#666}.tip{font-size:13px;line-height:1.7;color:#666}@media(max-width:720px){body{grid-template-columns:1fr}aside{border-right:0;border-bottom:1px solid #ccc}textarea{height:58vh}}
</style></head><body><aside><h1>内容工作室</h1><p class="tip">仅绑定本机 127.0.0.1，不参与网站构建。选择 JSON 后可增删条目、切换 featured / visible、检查中英文字段并格式化保存。</p><label for="file">内容文件</label><select id="file"></select><p class="tip">论文、项目、奖项、竞赛和时间轴均在对应数组文件中管理。保存前会检查 JSON 格式、空的中英文字段和 URL。</p></aside>
<main><div class="actions"><button class="primary" id="save">验证并保存</button><button class="secondary" id="format">格式化 JSON</button><button class="secondary" id="validate">仅检查</button><span id="status">请选择文件</span></div><textarea id="editor" spellcheck="false" aria-label="JSON 编辑器"></textarea></main>
<script>
const file=document.querySelector('#file'),editor=document.querySelector('#editor'),status=document.querySelector('#status');
async function list(){const files=await fetch('/api/files').then(r=>r.json());file.innerHTML=files.map(x=>'<option>'+x+'</option>').join('');await load()}
async function load(){editor.value=await fetch('/api/file?name='+encodeURIComponent(file.value)).then(r=>r.text());status.textContent='已加载 '+file.value}
function inspect(data,path='root',issues=[]){if(Array.isArray(data))data.forEach((v,i)=>inspect(v,path+'['+i+']',issues));else if(data&&typeof data==='object')Object.entries(data).forEach(([k,v])=>{if(/(?:Zh|En)$/.test(k)&&typeof v==='string'&&!v.trim())issues.push(path+'.'+k+' 为空');if(/Url$/.test(k)&&v){try{new URL(v)}catch{issues.push(path+'.'+k+' 不是有效 URL')}}inspect(v,path+'.'+k,issues)});return issues}
function validate(){try{const data=JSON.parse(editor.value),issues=inspect(data);status.textContent=issues.length?issues.join('；'):'检查通过';return !issues.length}catch(e){status.textContent='JSON 错误：'+e.message;return false}}
file.addEventListener('change',load);document.querySelector('#validate').onclick=validate;document.querySelector('#format').onclick=()=>{try{editor.value=JSON.stringify(JSON.parse(editor.value),null,2)+'\\n';validate()}catch(e){status.textContent=e.message}};
document.querySelector('#save').onclick=async()=>{if(!validate())return;const r=await fetch('/api/file?name='+encodeURIComponent(file.value),{method:'PUT',headers:{'Content-Type':'application/json'},body:editor.value});status.textContent=r.ok?'已格式化并保存 '+file.value:'保存失败：'+await r.text()};
list();
</script></body></html>`;

const server = http.createServer((request, response) => {
  const url = new URL(request.url || "/", `http://${request.headers.host}`);
  if (url.pathname === "/") return send(response, 200, page, "text/html; charset=utf-8");
  if (url.pathname === "/api/files") return send(response, 200, JSON.stringify(editable));
  if (url.pathname === "/api/file") {
    const file = safeFile(url.searchParams.get("name") || "");
    if (!file) return send(response, 404, "未知文件", "text/plain; charset=utf-8");
    if (request.method === "GET")
      return send(response, 200, fs.readFileSync(file, "utf8"), "application/json; charset=utf-8");
    if (request.method === "PUT") {
      let body = "";
      request.setEncoding("utf8");
      request.on("data", (chunk) => {
        body += chunk;
        if (body.length > 2_000_000) request.destroy();
      });
      request.on("end", () => {
        try {
          const parsed = JSON.parse(body);
          fs.writeFileSync(file, `${JSON.stringify(parsed, null, 2)}\n`);
          send(response, 200, JSON.stringify({ ok: true }));
        } catch (error) {
          send(
            response,
            400,
            error instanceof Error ? error.message : String(error),
            "text/plain; charset=utf-8",
          );
        }
      });
      return;
    }
  }
  send(response, 404, "Not found", "text/plain; charset=utf-8");
});

server.listen(port, "127.0.0.1", () => {
  console.log(`本地内容工作室：http://127.0.0.1:${port}`);
  console.log("按 Ctrl+C 停止。");
});
