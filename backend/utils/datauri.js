import DataUriParser from "datauri/parser.js"

import path from "path";

const getDataUri = (file) => {
    const extName = path.extname(file.originalname).toString().toLowerCase();
    
    // For non-image files (PDFs, etc.), return the file info for raw upload
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
    
    if (imageExtensions.includes(extName)) {
        const parser = new DataUriParser();
        return parser.format(extName, file.buffer);
    } else {
        // For raw files (PDFs), return object with buffer and content type
        return {
            content: file.buffer,
            contentType: extName === '.pdf' ? 'application/pdf' : 'application/octet-stream',
            isRaw: true
        };
    }
}

export default getDataUri;