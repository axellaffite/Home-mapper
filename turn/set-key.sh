#!/usr/bin/env bash
# Enregistre une clé TURN Cloudflare (Realtime > TURN Server) dans le Worker, après avoir vérifié la paire
set -euo pipefail
cd "$(dirname "$0")"

read -r -p "Turn Token ID : " id
read -r -s -p "API Token (masqué) : " token; echo

code=$(curl -s -o /dev/null -w '%{http_code}' -X POST \
  -H "Authorization: Bearer $token" -H 'Content-Type: application/json' -d '{"ttl":60}' \
  "https://rtc.live.cloudflare.com/v1/turn/keys/$id/credentials/generate-ice-servers")
case "$code" in
  200|201) echo "Clé valide." ;;
  404) echo "Turn Token ID inconnu de Cloudflare : recopiez l'identifiant de la clé." >&2; exit 1 ;;
  401) echo "L'API Token ne correspond pas à cette clé : recopiez le token de la même clé." >&2; exit 1 ;;
  *) echo "Réponse inattendue de Cloudflare (HTTP $code)." >&2; exit 1 ;;
esac

printf %s "$id" | npx wrangler secret put TURN_KEY_ID
printf %s "$token" | npx wrangler secret put TURN_KEY_API_TOKEN
echo "Clé enregistrée dans le Worker."
