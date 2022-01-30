import { promises as fs } from 'fs';
import path from 'path';
import process from './imageprocess';

/*Logic Provided by the instructor
 * The user needs to enter filename, height and width... if any of the params is missing throw an error stating that all the 3 params needs to be entered
If the params are of invalid type, again throw an error*/
interface ImageQuery {
	filename?: string;
	width?: string;
	height?: string;
}

//https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html#param-and-returns
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/static

/**
 *  image pathes
 * @param {ImageQuery} params
 * @param {string} [params.filename] filename
 * @param {string} [params.width] width
 * @param {string} [params.height] height
 * @return {null | string} returntype(path)
 */

class imageFile {
   	static imagesCompletePath = path.resolve(__dirname, '../images/complete');
	static imagesResizedPath = path.resolve(__dirname, '../images/resized');

	static async getImagePath(params: ImageQuery): Promise<null | string> {
	  if (!params.filename) {
	    return null;
	  }
	  const imagePath: string =
			params.width && params.height ? path.resolve(
			  imageFile.imagesResizedPath,
			  `${params.filename} width-${params.width} and height-${params.height}.jpg`
			)
			  : path.resolve(imageFile.imagesCompletePath, `${params.filename}.jpg`);
	  try {
	    await fs.access(imagePath);
	    return imagePath;
	  } catch {
	    return null;
	  }

	}

	/**
* Check if an image is available.
* @param {string} [filename=''] filename .
* @return {boolean} testing image availabilty.
*/
	static async isImageAvailable(filename: string = ''): Promise<boolean> {
	  if (!filename) {
	    return false;
	  }

	  return (await imageFile.getImageNames()).includes(filename);
	}

	/**
  * getting available images.
  * @return {string[]} Available image names.
  */
	 static async getImageNames(): Promise<string[]> {
	  try {
	    return (await fs.readdir(imageFile.imagesCompletePath)).map(
	      (filename: string): string => filename.split('.')[0]
	    );
	  } catch {
	    return [];
	  }
	}

	/**
   * Determine the resized Image.
   * @param {ImageQuery} params
   * @param {string} [params.filename]
   * @param {string} [params.width]
   * @param {string} [params.height]
   * @return {boolean}
  */
	static async isResizedImageAvailable(params: ImageQuery): Promise<boolean> {
	  if (!params.filename || !params.width || !params.height) {
	    return false;
	  }

	  // path
	  const filePath: string = path.resolve(
	    imageFile.imagesResizedPath,
	    `${params.filename} width-${params.width} and height-${params.height}.jpg`
	  );

	  try {
	    await fs.access(filePath);
	    return true;
	  } catch {
	    return false;
	  }
	}
	/**
 * resized path.
*/

	static async resizePath(): Promise<void> {
	  try {
	    await fs.access(imageFile.imagesResizedPath);

	  } catch {
	    fs.mkdir(imageFile.imagesResizedPath);
	  }
	}

	/**
   * @param {ImageQuery} params
   * @param {string} [params.filename]
   * @param {string} [params.width]
   * @param {string} [params.height]
   * @return {null|string}
   */
	static async createResizedImage(params: ImageQuery): Promise<null | string> {
	  if (!params.filename || !params.width || !params.height) {
	    return null;
	  }

	  const filePathCompleted: string = path.resolve(
	    imageFile.imagesCompletePath,
	    `${params.filename}.jpg`
	  );
	  const filePathResized: string = path.resolve(
	    imageFile.imagesResizedPath,
	    `${params.filename} width-${params.width} and height-${params.height}.jpg`
	  );

	  console.log(`Resize ${filePathResized}`);
	  imageFile.resizePath();
	  // Resize original image
	  return await process({
	    source: filePathCompleted,
	    target: filePathResized,
	    width: parseInt(params.width),
	    height: parseInt(params.height)
	  });
	}
}

export default imageFile;