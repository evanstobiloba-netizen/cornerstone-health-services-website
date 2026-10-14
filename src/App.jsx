import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Seo from './components/Seo.jsx'
import Home from './pages/Home.jsx'
import Services from './pages/Services.jsx'
import ServiceDetail from './pages/ServiceDetail.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import Book from './pages/Book.jsx'
import Refer from './pages/Refer.jsx'
import Specialist from './pages/Specialist.jsx'
import Volunteer from './pages/Volunteer.jsx'
import Share from './pages/Share.jsx'
import GetHelp from './pages/GetHelp.jsx'
import Resources from './pages/Resources.jsx'
import Faqs from './pages/Faqs.jsx'
import Insurance from './pages/Insurance.jsx'
import Privacy from './pages/Privacy.jsx'
import MobileHome from './pages/MobileHome.jsx'
import NotFound from './pages/NotFound.jsx'

export default function App() {
  return (
    <>
      {/* Sits above the routes so every screen, including 404 and /mobile,
          gets correct document metadata. */}
      <Seo />
      <Routes>
        {/* /mobile renders its own app shell - no desktop header or footer. */}
        <Route path="/mobile" element={<MobileHome />} />

        <Route element={<Layout />}>
          <Route index element={<Home />} />

          <Route path="about" element={<About />} />
          <Route path="services" element={<Services />} />
          <Route path="services/:slug" element={<ServiceDetail />} />

          <Route path="resources" element={<Resources />} />
          <Route path="faqs" element={<Faqs />} />
          <Route path="insurance" element={<Insurance />} />

          <Route path="contact" element={<Contact />} />
          <Route path="book" element={<Book />} />
          <Route path="get-help" element={<GetHelp />} />
          <Route path="refer-a-loved-one" element={<Refer />} />
          <Route path="talk-to-a-specialist" element={<Specialist />} />
          <Route path="volunteer-with-us" element={<Volunteer />} />
          <Route path="share-your-experience" element={<Share />} />

          <Route path="privacy-policy" element={<Privacy />} />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  )
}
