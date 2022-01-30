import express from 'express';
import fileName from './../../filename';
//using interface
//params and returns
//https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html#param-and-returns

interface ImageQuery {
    filename?: string;
    width?: string;
    height?: string;
}

/**
 * @param {ImageQuery} query
 * @return {null|string}
 */
const validate = async (query: ImageQuery): Promise<null | string> => {
  // Check if requested file is available
  if (!(await fileName.isImageAvailable(query.filename))) {
    const availableImageNames: string = (
      await fileName.getImageNames()
    ).join(', ');
    return 'please enter a valid path';
  }

  if (!query.width && !query.height) {
    return null;
  }

  // Check for valid width value
  const width: number = parseInt(query.width || '');
  if (Number.isNaN(width) || width < 1) {
    return 'please enter a valid path width value';
  }

  // Check for valid height value
  const height: number = parseInt(query.height || '');
  if (Number.isNaN(height) || height < 1) {
    return 'please enter a valid height value';
  }

  return null;
};

const images: express.Router = express.Router();

images.get(
  '/',
  async (
    request: express.Request,
    response: express.Response
  ): Promise<void> => {
    const validationMessage: null | string = await validate(request.query);
    if (validationMessage) {
      response.send(validationMessage);
      return;
    }

    let error: null | string = '';

    //  resized image if availabe
    if (!(await fileName.isResizedImageAvailable(request.query))) {
      error = await fileName.createResizedImage(request.query);
    }

    //  image error
    if (error) {
      response.send(error);
      return;
    }

    // get image path and image
    const path: null | string = await fileName.getImagePath(request.query);
    if (path) {
      response.sendFile(path);
    } else {
      response.send(null);
    }
  }
);

export default images;