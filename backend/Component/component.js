import { ComponentLoader } from 'adminjs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const componentLoader = new ComponentLoader();
export const Components = {
    PDFGenerator: componentLoader.add('GeneratePdf', path.join(__dirname,'pdfgenerator.component.js')),
    ShortenedParagraph: componentLoader.add('ShortenedParagraph', path.join(__dirname,'shortenParagraph.js')),
}

export default componentLoader ;