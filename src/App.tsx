import {
  BrowserRouter,
  Route,
  Routes
} from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group'

import { ZoeziMainContextComp } from './context';
import BlogPage from './pages/shared/blog';
import FAQPage from './pages/shared/faq';
import LandingPage from './pages/unauthenticated/landing';
import SignInPage from './pages/unauthenticated/signin';
import PricingPage from './pages/unauthenticated/pricing';
import SignUpPage from './pages/unauthenticated/signup';
import PagesGlobalLayout from './components/shared/Layout';
import { ForwardProtectedRoute, ProtectedRoute } from './components/shared/protected';

function App() {
  return (
    <BrowserRouter>
      <ZoeziMainContextComp>
        <PagesGlobalLayout>
          <TransitionGroup>
            <CSSTransition
              timeout={450}
              classNames="fade"
            >
              <Routes>
                <Route element={<ForwardProtectedRoute/>}>
                  <Route path="/"  element={<LandingPage/>}/>
                </Route>
                <Route path="/pricing" element={<PricingPage/>}/>
                <Route path="/blog/:slug?" element={<BlogPage/>}/>
                <Route path="/faq" element={<FAQPage/>}/>
                <Route path="/signin" element={<SignInPage/>}/>
                <Route path="/signup" element={<SignUpPage/>}/>

                <Route element={<ProtectedRoute/>}>
                  {/* all routes that require auth */}
                </Route>
              </Routes>
            </CSSTransition>
          </TransitionGroup>
        </PagesGlobalLayout>
      </ZoeziMainContextComp>
    </BrowserRouter>
  )
}

export default App
