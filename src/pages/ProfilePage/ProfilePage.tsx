import { ArrowLeftOutlined, PlusOutlined } from '@ant-design/icons'
import './ProfilePage.css'
import { cover, profile } from '../../assets/imageIndex'
import { Button, FloatButton } from 'antd'
import { useNavigate } from 'react-router-dom'

function ProfilePage() {

  const navigate = useNavigate()
  const arrowClick = () => {
    navigate('/')
  }
  return (
    <div className='profile'>
      <div className='profile__header'>
      <ArrowLeftOutlined  onClick={arrowClick}/>
      <img src={cover} alt='cover' className='profile__header-cover'/>
      <img src={profile} alt='Profile' className='profile__header-dp'/>
      <Button >Edit Profile</Button>
      <div className='profile__friends'>
      <h3>Friends List</h3>
      <ul>
        <li>John Doe</li>
        <li>Mary Smith</li>
        <li>Robert Brown</li>
        <li>Emily Johnson</li>
      </ul>
    </div>

      </div>
      <div className='profile__bio'>
        <h2>Jane Doe</h2>
        <p>Lorem ipsum dolor sit amet explicabo rem quas, maxime ad esse dolori</p>
      </div>
      <div className='profile__posts'>
        <h4>My Posts</h4>

      </div>
        <FloatButton icon={<PlusOutlined />} type='primary' />

    </div>
  )
}

export default ProfilePage