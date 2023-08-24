import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { crearTarea } from '../features/tareas/tareaSlice'

const TareaForm = () => {
  const [texto, setTexto] = useState('')
  const dispatch = useDispatch()

  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(crearTarea({ texto }))
    setTexto('')
  }

  return (
    <section className='form'>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='texto'>Tarea:</label>
          <input
            type='text'
            name='texto'
            id='texto'
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <button className='btn btn-block' type='submit'>Submit</button>
        </div>
      </form>
    </section>
  )
}

export default TareaForm
