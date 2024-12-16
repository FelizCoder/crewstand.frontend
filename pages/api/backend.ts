import { NextApiRequest, NextApiResponse } from 'next';

const handler = (_req: NextApiRequest, res: NextApiResponse) => {
  const backendUri = new URL(process.env.BACKEND_URI || "")
  const backendPort = backendUri.port
  res.status(200).json({ backend_port: backendPort });
};

export default handler;
