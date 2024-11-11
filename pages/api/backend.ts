import { NextApiRequest, NextApiResponse } from 'next';

const handler = (_req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({ backend_uri: process.env.BACKEND_WS_URI });
};

export default handler;
