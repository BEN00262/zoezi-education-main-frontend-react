import {
  BrowserRouter,
  Route,
  Routes
} from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group'

import { ZoeziMainContextComp, ZoeziMainQueryClient } from './context';
import BlogPage from './pages/shared/blog';
import FAQPage from './pages/shared/faq';
import LandingPage from './pages/unauthenticated/landing';
import SignInPage from './pages/unauthenticated/signin';
import PricingPage from './pages/unauthenticated/pricing';
import SignUpPage from './pages/unauthenticated/signup';
import PagesGlobalLayout from './components/shared/Layout';
import { ForwardProtectedRoute, ProtectedRoute } from './components/shared/protected';
import DashboardPage from './pages/authenticated/dashboard';
import SubjectsPage from './pages/authenticated/dashboard/subpages/subjects';
import SpecialPapersPage from './pages/authenticated/dashboard/subpages/special_papers/papers';
import SpecialPaperCategoriesPage from './pages/authenticated/dashboard/subpages/special_papers/categories';
import SpecialPaperSubjectsPage from './pages/authenticated/dashboard/subpages/special_papers/subjects';
import { QueryClientProvider } from 'react-query';

function App() {
  return (
    <BrowserRouter>
      <ZoeziMainContextComp>
        <QueryClientProvider client={ZoeziMainQueryClient}>
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
                    <Route path="/dashboard" element={<DashboardPage/>}/>
                    <Route path="/subjects/:grade_name/:grade_reference_id" element={<SubjectsPage/>}/>

                    {/* special paper(s) navigation */}
                    <Route path="/special/:grade_reference_id" element={<SpecialPapersPage/>}/>
                    <Route path="/special/categories/:grade_name/:grade_reference_id" element={<SpecialPaperCategoriesPage/>}/>
                    <Route path="/special/subjects/:grade_name/:category_name/:grade_reference_id" element={<SpecialPaperSubjectsPage/>}/>

                  </Route>
                </Routes>
              </CSSTransition>
            </TransitionGroup>
          </PagesGlobalLayout>
        </QueryClientProvider>
      </ZoeziMainContextComp>
    </BrowserRouter>
  )
}

export default App
