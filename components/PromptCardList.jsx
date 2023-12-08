import React from 'react'
import PromptBox from './PromptBox'

const PromptCardList = ({data , handleTagclick}) => {
  return (
    <div className='mt-16 prompt_layout'>
        {
            data.map((post ,idx) => (
                <PromptBox key={post._id} post={post} handleTagclick={handleTagclick} />
            ))
        }
    </div>
  )
}

export default PromptCardList