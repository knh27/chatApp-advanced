import moment from 'moment';
import React, { memo } from 'react'
import { fileFormat } from '../../lib/features';
import RenderAttachment from './RenderAttachment';

const MessageComponent = ({message, user}) => {
    const{sender, content, attachments=[], createdAt}=message;
    const sameSender=sender?._id===user?._id
    const timeAgo=moment(createdAt).fromNow();
  return (
    <div style={{
        alignSelf:sameSender?"flex-end":"flex-start",
        background:"white",
        color:"black",
        borderRadius:"5px",
        width:'fit-content',
        padding:"0.5rem"
    }}>
      
        {!sameSender && (
            <p className='text-green-600 font-bold text-sm'>{sender.name}</p>
        )}
        {content&& <p>{content}</p>}

        {
          attachments.length>0 && attachments.map((attachment, index)=>{
            const url=attachment.url;
            const file=fileFormat(url);
             return <a className='text-black ' href={url} target='_blank' download key={index} >
              {RenderAttachment(file, url)}
            </a>
          })
        }
        <p className='text-gray-500 text-sm' >{timeAgo}</p>
    </div>
  )
}

export default memo(MessageComponent);
