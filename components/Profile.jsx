import React from 'react'
import PromptCard from './PromptCard'
const Profile = ({desc,data,name,handleEdit,handleDelete}) => {
  return (
    <section className="w-full">
      <h1 className='head_text text-left'> <span className='blue_gradient'>{name} profile</span></h1>
      <p className='text-left desc'>
          {desc}
      </p>
      <div className="mt-10 prompt_layout">
     {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleEdit={()=>handleEdit && handleEdit(post)}
          handleDelete={()=>handleDelete && handleDelete(post)}
        />
      ))}
    </div>
    </section>
  )
}

export default Profile