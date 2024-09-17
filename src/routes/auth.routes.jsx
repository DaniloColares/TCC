import { Routes, Route } from 'react-router-dom';

import { Splash } from '../pages/Splash';
import { Home } from '../pages/Home';
import { Devices } from '../pages/Devices'
import { TimerIrrigation } from '../pages/TimerIrrigation';
import { Temperature } from '../pages/Temperature';
import { WaterLevel } from '../pages/WaterLevel';

export function AuthRoutes() {
  return (
    <Routes>
      <Route path='/' element={<Splash />} />
      <Route path='/home' element={<Home />} />
      <Route path='/devices' element={<Devices />} />
      <Route path='/temperature' element={<Temperature />} />
      <Route path='/timer' element={<TimerIrrigation />} />
      <Route path='/waterlevel' element={<WaterLevel />} />
    </Routes>
  )
}