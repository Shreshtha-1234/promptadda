import React from 'react'
import PromptBox from './PromptBox'

const Profie = ({name , desc , data , handleEdit , handleDelete}) => {
  return (
    <section className='w-full'>
      <h1 className='head_text text-left'>
        <span className='blue_gradient'>{name}</span>&nbsp;Profile
      </h1>
      <p className='desc text_left'>{desc}</p>
      <div className='mt-16 prompt_layout'>
      {
            data.map((post ,idx) => (
                <PromptBox key={post._id} post={post} 
                handleEdit={()=>{
                  handleEdit && handleEdit(post)
                }}
                handleDelete={()=>{
                  handleDelete && handleDelete(post)
                }}
                />
            ))
        }
    </div>
    </section>
  )
}

export default Profie