// Identifiants TURN Cloudflare de courte durée pour la liaison téléphone ↔ ordinateur de Home mapper.
// La clé TURN reste dans les secrets du Worker : la page ne reçoit que des identifiants temporaires.
const ORIGINS = ['https://axellaffite.github.io', 'http://localhost:8765'];
const TTL = 24 * 3600;

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || '';
    if (!ORIGINS.includes(origin)) return new Response('Forbidden', { status: 403 });
    const cors = { 'Access-Control-Allow-Origin': origin, 'Vary': 'Origin' };
    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: { ...cors, 'Access-Control-Allow-Methods': 'GET' } });
    if (request.method !== 'GET') return new Response('Method not allowed', { status: 405, headers: cors });

    const res = await fetch(`https://rtc.live.cloudflare.com/v1/turn/keys/${env.TURN_KEY_ID}/credentials/generate-ice-servers`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${env.TURN_KEY_API_TOKEN}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ ttl: TTL })
    });
    if (!res.ok){
      console.error('TURN credentials', res.status, await res.text());
      return new Response('TURN unavailable', { status: 502, headers: cors });
    }
    const { iceServers } = await res.json();
    // Les navigateurs bloquent le port 53 : ces URL feraient attendre la connexion pour rien
    const servers = iceServers.map(s => ({ ...s, urls: [].concat(s.urls).filter(u => !/:53(\?|$)/.test(u)) })).filter(s => s.urls.length);
    return Response.json({ iceServers: servers }, { headers: { ...cors, 'Cache-Control': 'no-store' } });
  }
};
