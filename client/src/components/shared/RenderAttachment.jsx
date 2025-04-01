import React from 'react'
import { transformImage } from '../../lib/features';
import { FileOpen as FileOpenIcon} from '@mui/icons-material';

function RenderAttachment(file, url) {

    switch (file) {
        case "video":
            return <video src={url} preload='none' width={"200px"} controls />

        case "audio":
            return <video src={url} preload='none'  controls />

        case "image":
           return <img className='object-contain' src={transformImage(url,200)} alt="image" preload='none' width={"150px"}  height={"100px"} controls />
           
    
        default:
            return <FileOpenIcon/>
            
    }
  
}

export default RenderAttachment
