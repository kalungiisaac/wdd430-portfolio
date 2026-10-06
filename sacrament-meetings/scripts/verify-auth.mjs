/* Verification harness for the auth + metadata activity.
 * Run: node scripts/verify-auth.mjs [baseURL]
 * Exercises: redirect -> bad login -> good login -> protected access -> sign out.
 */
const BASE = process.argv[2] ?? 'http://localhost:3000';
const jar = new Map();

function cookieHeader() {
  return [...jar.entries()].map(([k, v]) => `${k}=${v}`).join('; ');
}

function absorb(res) {
  const raw = res.headers.getSetCookie?.() ?? [];
  for (const c of raw) {
    const [pair] = c.split(';');
    const idx = pair.indexOf('=');
    if (idx < 0) continue;
    const name = pair.slice(0, idx).trim();
    const value = pair.slice(idx + 1).trim();
    if (value === '' || /Max-Age=0/i.test(c)) jar.delete(name);
    else jar.set(name, value);
  }
}

async function get(path, { redirect = 'manual' } = {}) {
  const url = path.startsWith('http') ? path : BASE + path;
  const res = await fetch(url, {
    redirect,
    headers: { cookie: cookieHeader() },
  });
  absorb(res);
  return res;
}

const ok = [];
const bad = [];
function check(label, pass, detail = '') {
  (pass ? ok : bad).push(label);
  console.log(`${pass ? 'PASS' : 'FAIL'}  ${label}${detail ? ` — ${detail}` : ''}`);
}

// Pull the hidden server-action inputs out of the login form markup and HTML-decode
// them — the markup ships them as {&quot;id&quot;:...} but the multipart body needs
// the decoded {"id":...} or Next rejects it with "Failed to find Server Action".
function actionFields(html) {
  const decode = (s) =>
    s
      .replaceAll('&quot;', '"')
      .replaceAll('&#x27;', "'")
      .replaceAll('&lt;', '<')
      .replaceAll('&gt;', '>')
      .replaceAll('&amp;', '&');
  const grab = (name) => {
    const re = new RegExp(`name="\\$${name.replace(/[$:]/g, (c) => '\\' + c)}"[^>]*value="([^"]*)"`);
    const m = html.match(re);
    return m ? decode(m[1]) : '';
  };
  return { v0: grab('ACTION_1:0'), v1: grab('ACTION_1:1'), key: grab('ACTION_KEY') };
}

async function login(email, password) {
  const page = await get('/login');
  const html = await page.text();
  const f = actionFields(html);
  if (!f.v0 || !f.key) throw new Error('could not extract server action fields');
  // The form's encType is multipart/form-data, so mirror that exactly.
  const fd = new FormData();
  fd.set('$ACTION_REF_1', '');
  fd.set('$ACTION_1:0', f.v0);
  fd.set('$ACTION_1:1', f.v1);
  fd.set('$ACTION_KEY', f.key);
  fd.set('email', email);
  fd.set('password', password);
  return fetch(BASE + '/login', {
    method: 'POST',
    redirect: 'manual',
    // Next.js rejects Server Action requests without a matching Origin.
    headers: { cookie: cookieHeader(), origin: BASE },
    body: fd,
  }).then((res) => {
    absorb(res);
    return res;
  });
}

// Submit a server-action form found in `html`. Action fields are numbered per form
// ($ACTION_REF_1, $ACTION_2:0, ...), so read whatever index the markup actually uses
// rather than assuming index 1.
async function submitActionForm(html, actionPath, fields = {}, marker = null) {
  const forms = html.split('<form').slice(1);
  // Select by visible button text when a marker is given; otherwise the first
  // form that carries action metadata.
  const target = marker
    ? forms.find((f) => f.includes(marker) && (f.includes('$ACTION_KEY') || f.includes('$ACTION_ID_')))
    : forms.find((f) => f.includes('$ACTION_KEY') || f.includes('$ACTION_ID_'));
  if (!target) throw new Error(`no server action form found for ${actionPath}`);
  const decode = (s) =>
    s.replaceAll('&quot;', '"').replaceAll('&#x27;', "'")
      .replaceAll('&lt;', '<').replaceAll('&gt;', '>').replaceAll('&amp;', '&');
  const grab = (name) => {
    const m = target.match(
      new RegExp(`name="\\$${name.replace(/[$:]/g, (c) => '\\' + c)}"[^>]*value="([^"]*)"`)
    );
    return m ? decode(m[1]) : '';
  };

  const fd = new FormData();

  // Encoding A: $ACTION_ID_<hash> — a directly-referenced imported server action.
  const idMatch = target.match(/name="\$ACTION_ID_([0-9a-f]+)"/);
  if (idMatch) {
    fd.set(`$ACTION_ID_${idMatch[1]}`, '');
  } else {
    // Encoding B: $ACTION_REF_n / $ACTION_n:0 / $ACTION_KEY — an inline closure.
    const refMatch = target.match(/name="\$ACTION_REF_(\d+)"/);
    const idx = refMatch ? refMatch[1] : '1';
    fd.set(`$ACTION_REF_${idx}`, '');
    const v0 = grab(`ACTION_${idx}:0`);
    const v1 = grab(`ACTION_${idx}:1`);
    if (v0) fd.set(`$ACTION_${idx}:0`, v0);
    if (v1) fd.set(`$ACTION_${idx}:1`, v1);
    const key = grab('ACTION_KEY');
    if (key) fd.set('$ACTION_KEY', key);
  }

  for (const [k, v] of Object.entries(fields)) fd.set(k, v);
  return fetch(BASE + actionPath, {
    method: 'POST',
    redirect: 'manual',
    headers: { cookie: cookieHeader(), origin: BASE },
    body: fd,
  }).then((res) => {
    absorb(res);
    return res;
  });
}

// --- 1. Protected routes redirect unauthenticated users -------------------
console.log('\n-- Unauthenticated route protection --');
for (const p of ['/meetings/new', '/meetings/1/edit']) {
  const res = await get(p);
  const loc = res.headers.get('location') ?? '';
  check(`${p} -> 307 to /login`, res.status === 307 && loc.startsWith('/login'), `${res.status} ${loc}`);
}

// --- 2. Public routes remain reachable -----------------------------------
console.log('\n-- Public routes stay open --');
for (const p of ['/', '/meetings', '/meetings/current', '/meetings/1', '/speakers', '/login']) {
  const res = await get(p);
  check(`${p} -> 200`, res.status === 200, String(res.status));
}

// --- 3. Wrong credentials rejected ---------------------------------------
console.log('\n-- Credential validation --');
const badRes = await login('owner@example.com', 'definitely-wrong');
const badHtml = await badRes.text();
check(
  'wrong password shows error',
  /Invalid email or password|Something went wrong/i.test(badHtml) && !/All Sacrament Meetings/.test(badHtml)
);
const stillBlocked = await get('/meetings/new', { redirect: 'manual' });
check('wrong password does not grant access', stillBlocked.status === 307, String(stillBlocked.status));

// --- 4. Correct credentials sign in --------------------------------------
console.log('\n-- Successful login --');
const goodRes = await login('owner@example.com', 'change-me-123');
check('login redirects (303)', goodRes.status === 303, `status=${goodRes.status}`);
const hasSession = [...jar.keys()].includes('authjs.session-token');
check('session cookie set', hasSession, [...jar.keys()].join(', ') || 'none');
// Follow the post-login redirect the way a browser would.
const landRes = await get(goodRes.headers.get('location') ?? '/');
check('post-login landing resolves 200', landRes.status === 200, String(landRes.status));

// --- 5. Protected routes now reachable -----------------------------------
console.log('\n-- Protected routes after login --');
for (const p of ['/meetings/new', '/meetings/1/edit']) {
  const res = await get(p);
  check(`${p} -> 200`, res.status === 200, String(res.status));
}
// auth.config.ts redirects authenticated users off the login page.
const awayRes = await get('/login', { redirect: 'manual' });
check(
  'logged-in user redirected away from /login',
  awayRes.status >= 300 && awayRes.status < 400 && (awayRes.headers.get('location') ?? '').includes('/meetings'),
  `${awayRes.status} ${awayRes.headers.get('location')}`
);

// --- 6. Sign-out clears the session --------------------------------------
console.log('\n-- Sign out --');
const adminHtml = await (await get('/meetings/new')).text();
check('sign-out control rendered on protected page', /Sign Out/.test(adminHtml));
check('session shown in admin nav', /Signed in as/.test(adminHtml));

const signOutRes = await submitActionForm(adminHtml, '/meetings/new', {}, 'Sign Out');
check(
  'sign-out action issued redirect',
  signOutRes.status >= 300 && signOutRes.status < 400,
  `status=${signOutRes.status}`
);
// Absorb clears the session cookie when Max-Age=0 is present.
const afterOut = await get('/meetings/new', { redirect: 'manual' });
check(
  'protected route blocked after sign-out',
  afterOut.status === 307 && (afterOut.headers.get('location') ?? '').startsWith('/login'),
  `${afterOut.status} ${afterOut.headers.get('location')}`
);

// --- 7. Metadata spot checks ---------------------------------------------
console.log('\n-- Metadata --');
const home = await (await get('/')).text();
check('root <title> present', /<title>[^<]+<\/title>/.test(home));
check('meta description present', /<meta name="description" content="[^"]+"/.test(home));
check('og:image present', /property="og:image"/.test(home));
const ogRes = await get('/opengraph-image');
check('opengraph-image renders PNG', ogRes.status === 200 && (ogRes.headers.get('content-type') ?? '').includes('image'), `${ogRes.status} ${ogRes.headers.get('content-type')}`);
const detailRes = await get('/meetings/1');
const detail = await detailRes.text();
const m = detail.match(/<title>([^<]*)<\/title>/);
check(
  'route-specific title on /meetings/1',
  detailRes.status === 200 && !!m && !m[1].startsWith('Sacrament Meetings'),
  `status=${detailRes.status} title=${m?.[1] ?? '(none)'}`
);

console.log(`\n${ok.length} passed, ${bad.length} failed`);
if (bad.length) {
  console.log('Failed:\n - ' + bad.join('\n - '));
  process.exit(1);
}
