export default function handler(request, response) {
  // This securely grabs the key from your Vercel dashboard settings
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_API;

  // This sends the key back to your frontend code safely
  response.status(200).json({
    client_id: clientId
  });
}
