import ButtonBase from '@mui/material/ButtonBase'
import { useNavigate } from '@tanstack/react-router';
import { FaAngleLeft } from 'react-icons/fa6'

export default function BackButton() {
  const router = useNavigate();
  
  return (
    <ButtonBase title='Back to Previous Page' className='w-7 rounded-sm' onClick={() => router({ to: '..' })}>
      <FaAngleLeft />
    </ButtonBase>
  )
}
