import { FloatButton } from 'antd'
import { profile } from '../../assets/imageIndex'
import './HomePage.css'
import { PlusOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { Feed, Friends, Navbar, Notifications, Recents } from '../../components/componetIndex'
import { useNavigate } from 'react-router-dom'


function HomePage() {

  const [showtext, setShowText] = useState(true);
  const [tab, setTab] = useState('Feed')
  const navigate = useNavigate()

  const handleTabChange = (tab: string) => {
    setTab(tab);
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowText(false);
    }, 3000);
    return () => clearTimeout((timer))
  }, [])

  const handleProfileClick = () => {
    navigate("/profile")
  }
  return (
    <div className='home'>
      <div className='home__header'>
        <img src={profile} alt='profile' className='home__header-profile' onClick={handleProfileClick}/>
        {showtext && <p className='header-text'>Welcome Back</p>}
      </div>
      <div className='home__body'>
      <div className='home__body-nav'>
       <Navbar onTabChange={handleTabChange}/>

      </div>
      <div className='home__body-content'>
      {tab === 'Feed' && <Feed />}
        {tab === 'Friends' && <Friends />}
        {tab === 'Recents' && <Recents />}
        {tab === 'Notifications' && <Notifications />}
      </div>
      <FloatButton icon={<PlusOutlined />} type='primary'/>
      </div>
    </div>
  )
}

export default HomePage