export default function handler(request, response) {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_API;

  response.status(200).json({
    client_id: clientId
  });
}
