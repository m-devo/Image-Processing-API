import path from 'path';
import fs from 'fs';
import imageFile from '../../filename';

it('Image Processing functionality through sharp library ', async (): Promise<void> => {
  await imageFile.createResizedImage({ filename: 'encenadaport', width: '200', height: '200' });

  const newPath: string = path.resolve(
    imageFile.imagesResizedPath,
    'encenadaport width-200 and height-200.jpg'
  );
  var err: null | string = '';

  try {
    await fs.accessSync(newPath);
    err = null;
  } catch {
    err = 'Image is missing';
  }

  expect(err).toBeNull();
});
