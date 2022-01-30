import sharp from 'sharp';

interface resizeStrings {
  source: string;
  target: string;
  width: number;
  height: number;
}

/**
 * Process image via sharp.
 * @param {resizeStrings} params strings.
 * @param {string} params.source Source image path.
 * @param {string} params.target Target path.
 * @param {number} params.width Target width.
 * @param {number} params.height Target height.
 * @return {null|string} Error message or null.
 */
const process = async (
  params: resizeStrings
): Promise<null | string> => {
  try {
    await sharp(params.source)
      .resize(params.width, params.height)
      .toFormat('jpg')
      .toFile(params.target);
    return null;
  } catch {
    return 'Image could not be Resized.';
  }
};

export default process;
