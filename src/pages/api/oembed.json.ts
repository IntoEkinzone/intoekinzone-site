import type { APIRoute } from 'astro';

const oEmbedData = {
  provider_name: "IntoEkinZone",
  provider_url: "https://intoekinzone.com",
};

export const GET: APIRoute = () => {
  return new Response(JSON.stringify(oEmbedData), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};