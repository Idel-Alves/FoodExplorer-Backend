const fs = require("fs");
const path = require("path");
const uploadConfig = require("../configs/upload");

class DiskStorage {
    async saveFile(file) {
        const sourcePath = path.resolve(uploadConfig.TMP_FOLDER, file); 
        const destinationPath = path.resolve(uploadConfig.UPLOADS_FOLDER, file); 
   
        if (!fs.existsSync(uploadConfig.UPLOADS_FOLDER)) {
            fs.mkdirSync(uploadConfig.UPLOADS_FOLDER, { recursive: true });
        }

        if (!fs.existsSync(sourcePath)) {
            throw new Error(`O arquivo de origem não existe: ${sourcePath}`);
        }

        try {
            await fs.promises.rename(sourcePath, destinationPath); 
            return file; 
        } catch (error) {
            console.log("Erro ao salvar o arquivo", error);
        }
    }

    async deleteFile(file) {
        const filePath = path.resolve(uploadConfig.UPLOADS_FOLDER, file);

        try {
            await fs.promises.stat(filePath);
        } catch {
            return;
        }

        await fs.promises.unlink(filePath);
    }
}

module.exports = DiskStorage;