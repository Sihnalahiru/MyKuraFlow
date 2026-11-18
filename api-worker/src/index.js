const corsHeaders = origin => ({
  "Access-Control-Allow-Origin": origin,
  "Access-Control-Allow-Methods": "GET,POST,PUT,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type,Authorization",
  "Access-Control-Max-Age": "86400",
  "Vary": "Origin"
});
const json = (data, status=200, headers={}) => new Response(JSON.stringify(data), {
  status, headers: {"Content-Type":"application/json; charset=utf-8", "Cache-Control":"no-store", ...headers}
});
const b64 = bytes => btoa(String.fromCharCode(...new Uint8Array(bytes)));
const fromB64 = value => Uint8Array.from(atob(value), c=>c.charCodeAt(0));
const randomId = (n=32) => { const a=new Uint8Array(n); crypto.getRandomValues(a); return b64(a).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,""); };
const sha256 = async value => b64(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value)));
async function hashPassword(password) { const salt=new Uint8Array(16); crypto.getRandomValues(salt); const key=await crypto.subtle.importKey("raw",new TextEncoder().encode(password),"PBKDF2",false,["deriveBits"]); const bits=await crypto.subtle.deriveBits({name:"PBKDF2",salt,iterations:310000,hash:"SHA-256"},key,256); return {salt:b64(salt),hash:b64(bits),iterations:310000};}
async function verifyPassword(password, salt, expected, iterations) {
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(password), "PBKDF2", false, ["deriveBits"]);
  const bits = await crypto.subtle.deriveBits({name:"PBKDF2",salt:fromB64(salt),iterations,hash:"SHA-256"},key,256);
  const actual = new Uint8Array(bits), wanted = fromB64(expected);
  return actual.length===wanted.length && actual.reduce((v,b,i)=>v|(b^wanted[i]),0)===0;
}
function allowedOrigin(request, env) {
  const origin=request.headers.get("Origin")||"";
  return origin===env.APP_ORIGIN || origin==="http://localhost:8788" ? origin : "";
}
async function getUser(request, env) {
  const auth=request.headers.get("Authorization")||"";
  const token=auth.startsWith("Bearer ")?auth.slice(7):"";
  if(!token) return null;
  const tokenHash=await sha256(token);
  return await env.DB.prepare("SELECT u.id,u.username,u.display_name,u.gender,u.avatar,u.xp FROM sessions s JOIN users u ON u.id=s.user_id WHERE s.token_hash=? AND s.expires_at>?").bind(tokenHash,Math.floor(Date.now()/1000)).first();
}
async function handle(request, env) {
  const url=new URL(request.url), path=url.pathname.replace(/^\/api/,"");
  if(request.method==="OPTIONS") return new Response(null,{status:204});
  if(path==="/health" && request.method==="GET") return json({ok:true,service:"MyKuraFlow API",version:1});
  if(path==="/login" && request.method==="POST") {
    let body; try{body=await request.json()}catch{return json({error:"Invalid request"},400)}
    const username=String(body.username||"").trim().toLowerCase(), password=String(body.password||"");
    if(!/^[a-z0-9_]{3,24}$/.test(username)||password.length<8||password.length>128) return json({error:"Invalid username or password"},400);
    const now=Math.floor(Date.now()/1000), windowStart=Math.floor(now/900)*900;
    await env.DB.prepare("INSERT INTO auth_rate_limits(username,window_start,attempts) VALUES(?,?,1) ON CONFLICT(username,window_start) DO UPDATE SET attempts=attempts+1").bind(username,windowStart).run();
    const limiter=await env.DB.prepare("SELECT attempts FROM auth_rate_limits WHERE username=? AND window_start=?").bind(username,windowStart).first();
    if(limiter?.attempts>10) return json({error:"Too many attempts. Try again in 15 minutes."},429);
    const user=await env.DB.prepare("SELECT * FROM users WHERE username=? COLLATE NOCASE").bind(username).first();
    if(!user || !(await verifyPassword(password,user.password_salt,user.password_hash,user.password_iterations))) return json({error:"Incorrect username or password"},401);
    const token=randomId(), tokenHash=await sha256(token), days=Math.min(3650,Math.max(1,Number(env.SESSION_DAYS)||3650)), expires=now+days*86400;
    await env.DB.batch([
      env.DB.prepare("INSERT INTO sessions(token_hash,user_id,expires_at) VALUES(?,?,?)").bind(tokenHash,user.id,expires),
      env.DB.prepare("UPDATE users SET last_active=CURRENT_TIMESTAMP WHERE id=?").bind(user.id),
      env.DB.prepare("DELETE FROM sessions WHERE expires_at<?").bind(now)
    ]);
    return json({token,expiresAt:expires,user:{id:user.id,username:user.username,displayName:user.display_name,gender:user.gender,avatar:user.avatar,xp:user.xp}});
  }
  if(path==="/logout" && request.method==="POST") {
    const auth=request.headers.get("Authorization")||"", token=auth.startsWith("Bearer ")?auth.slice(7):"";
    if(token) await env.DB.prepare("DELETE FROM sessions WHERE token_hash=?").bind(await sha256(token)).run();
    return json({ok:true});
  }
  const user=await getUser(request,env);
  if(!user) return json({error:"Please sign in again"},401);
  if(path==="/me" && request.method==="GET") return json({user});
  if(path==="/change-password" && request.method==="POST") {
    let body;try{body=await request.json()}catch{return json({error:"Invalid request"},400)}
    const oldPassword=String(body.currentPassword||""),newPassword=String(body.newPassword||"");
    if(newPassword.length<12||newPassword.length>128) return json({error:"New password must be at least 12 characters."},400);
    const record=await env.DB.prepare("SELECT password_salt,password_hash,password_iterations FROM users WHERE id=?").bind(user.id).first();
    if(!record||!(await verifyPassword(oldPassword,record.password_salt,record.password_hash,record.password_iterations))) return json({error:"Current password is incorrect."},401);
    const next=await hashPassword(newPassword);
    await env.DB.prepare("UPDATE users SET password_salt=?,password_hash=?,password_iterations=? WHERE id=?").bind(next.salt,next.hash,next.iterations,user.id).run();
    return json({ok:true});
  }
  if(path==="/progress" && request.method==="GET") {
    const row=await env.DB.prepare("SELECT completed_ids,updated_at FROM study_progress WHERE user_id=?").bind(user.id).first();
    return json({completedIds:JSON.parse(row?.completed_ids||"[]"),updatedAt:row?.updated_at||null});
  }
  if(path==="/progress" && request.method==="PUT") {
    let body; try{body=await request.json()}catch{return json({error:"Invalid request"},400)}
    if(!Array.isArray(body.completedIds)||body.completedIds.length>5000||body.completedIds.some(x=>typeof x!=="string"||x.length>180)) return json({error:"Invalid progress payload"},400);
    const ids=[...new Set(body.completedIds)].slice(0,5000);
    const count=ids.length, xp=count*10;
    await env.DB.batch([
      env.DB.prepare("INSERT INTO study_progress(user_id,completed_ids,updated_at) VALUES(?,?,CURRENT_TIMESTAMP) ON CONFLICT(user_id) DO UPDATE SET completed_ids=excluded.completed_ids,updated_at=CURRENT_TIMESTAMP").bind(user.id,JSON.stringify(ids)),
      env.DB.prepare("UPDATE users SET xp=(SELECT COUNT(*)*10 FROM json_each(?)) + COALESCE((SELECT SUM(score)*5 FROM quiz_attempts WHERE user_id=?),0),last_active=CURRENT_TIMESTAMP WHERE id=?").bind(JSON.stringify(ids),user.id,user.id)
    ]);
    return json({ok:true,completed:count,xp});
  }
  if(path==="/quiz-attempts" && request.method==="POST") {
    let body;try{body=await request.json()}catch{return json({error:"Invalid request"},400)}
    const score=Number(body.score), total=Number(body.total), timeUsed=Number(body.timeUsed);
    if(!Number.isInteger(score)||!Number.isInteger(total)||total<1||total>50||score<0||score>total||!Number.isInteger(timeUsed)||timeUsed<0||timeUsed>7200) return json({error:"Invalid quiz result"},400);
    await env.DB.prepare("INSERT INTO quiz_attempts(id,user_id,score,total,time_used) VALUES(?,?,?,?,?)").bind(randomId(16),user.id,score,total,timeUsed).run();
    await env.DB.prepare("UPDATE users SET xp=(SELECT json_array_length(completed_ids)*10 FROM study_progress WHERE user_id=?) + COALESCE((SELECT SUM(score)*5 FROM quiz_attempts WHERE user_id=?),0),last_active=CURRENT_TIMESTAMP WHERE id=?").bind(user.id,user.id,user.id).run();
    return json({ok:true});
  }
  if(path==="/leaderboard" && request.method==="GET") {
    const rows=await env.DB.prepare("SELECT u.id,u.display_name AS displayName,u.username,u.gender,u.avatar,u.xp,COALESCE((SELECT COUNT(*) FROM json_each(p.completed_ids)),0) AS completed,COALESCE((SELECT COUNT(*) FROM quiz_attempts q WHERE q.user_id=u.id),0) AS quizzes,COALESCE((SELECT ROUND(AVG(CAST(score AS REAL)/total)*100) FROM quiz_attempts q WHERE q.user_id=u.id),0) AS accuracy,u.last_active AS lastActive FROM users u LEFT JOIN study_progress p ON p.user_id=u.id ORDER BY u.xp DESC,u.last_active ASC LIMIT 3").all();
    return json({leaderboard:rows.results||[]});
  }
  if(path==="/activity" && request.method==="GET") {
    const rows=await env.DB.prepare("SELECT score,total,time_used AS timeUsed,created_at AS createdAt FROM quiz_attempts WHERE user_id=? ORDER BY created_at DESC LIMIT 10").bind(user.id).all();
    return json({quizAttempts:rows.results||[]});
  }
  return json({error:"Not found"},404);
}
export default {
  async fetch(request,env) {
    const origin=allowedOrigin(request,env);
    if(request.headers.get("Origin") && !origin) return json({error:"Origin not allowed"},403);
    try {
      const response=await handle(request,env);
      const headers=new Headers(response.headers);
      if(origin) for(const [k,v] of Object.entries(corsHeaders(origin))) headers.set(k,v);
      return new Response(response.body,{status:response.status,headers});
    } catch(error) {
      console.error("API error",error);
      return json({error:"Service temporarily unavailable"},500,origin?corsHeaders(origin):{});
    }
  }
};
