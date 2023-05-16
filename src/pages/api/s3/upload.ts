import S3 from 'aws-sdk/clients/s3';
import type { NextApiRequest, NextApiResponse } from 'next';

const s3 = new S3({
  region: 'ap-south-1',
  accessKeyId: process.env.AWS_ACCESS,
  secretAccessKey: process.env.AWS_SECRET,
  signatureVersion: 'v4',
});

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { name, type } = req.body;

    const fileParams = {
      Bucket: process.env.BUCKET_NAME,
      Key: name,
      Expires: 600,
      ContentType: type,
    };

    const url = await s3.getSignedUrlPromise('putObject', fileParams);

    res.status(200).json({ url });
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '8mb', // Set desired value here
    },
  },
};
