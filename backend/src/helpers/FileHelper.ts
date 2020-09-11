import * as fs from 'fs';
import variables from '../configuration/config';
import { UtilsHelper } from './UtilsHelper';
import * as jimp from 'jimp'

export class FileHelper {
  static async writePicture(base64Data: string): Promise<string> {
    try {
      //verifica se é uma base64, senão ele devolve
      if (base64Data.indexOf('base64') == -1)
        return base64Data

      //extraindo só o conteúdo
      let positionEndStringIdentifyBase64: number = (base64Data.indexOf('base64') + 7)
      let _base64Data = base64Data.substr(positionEndStringIdentifyBase64)

      //verifica a pasta onde ele vai salvar existe, senão a pasta é criada
      let _directory = variables.folderStorage
      let dirExists = await fs.existsSync(_directory)
      if (!dirExists) 
        await fs.mkdirSync(_directory)

      //cria um hash e um path para o arquivo
      let filename = `${UtilsHelper.GenerateUniqueHash}.jpg`
      let fileNamePath = `${_directory}/${filename}`

      await fs.writeFileSync(fileNamePath, _base64Data, 'base64')
      console.log('File saved in', fileNamePath)
    
      //lê e edita o arquivo e muda a qualidade para a qualidade configurada
      let jimpResult = await jimp.read(fileNamePath)
      jimpResult.quality(parseInt(variables.pictureQuality.toString())).write(fileNamePath)
      return filename

    } catch(error) {
      console.log('Error save file', error)
      return ''
    }
  }
}