import {
  BrowserRouter,
  Route,
  Routes
} from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import AOS from 'aos';
import 'aos/dist/aos.css';

import { ZoeziMainContextComp, ZoeziMainQueryClient } from './context';
import BlogPage from './pages/shared/blog';
import FAQPage from './pages/shared/faq';
import LandingPage from './pages/unauthenticated/landing';
import SignInPage from './pages/unauthenticated/signin';
import PricingPage from './pages/unauthenticated/pricing';
import SignUpPage from './pages/unauthenticated/signup';
import PagesGlobalLayout from './components/shared/Layout';
import { WhoseLearningProtectedRoute, ForwardProtectedRoute, ProtectedRoute } from './components/shared/protected';
import DashboardPage from './pages/authenticated/dashboard';
import SubjectsPage from './pages/authenticated/dashboard/subpages/subjects';
import SpecialPapersPage from './pages/authenticated/dashboard/subpages/special_papers/papers';
import SpecialPaperCategoriesPage from './pages/authenticated/dashboard/subpages/special_papers/categories';
import SpecialPaperSubjectsPage from './pages/authenticated/dashboard/subpages/special_papers/subjects';
import { QueryClientProvider } from 'react-query';
import { useEffect } from 'react';
import ErrorPage from './pages/shared/error';
import WhoseLearningPage from './pages/authenticated/whose_learning';
import TermsOfUsePage from './pages/shared/terms_of_use';
import PrivacyNoticePage from './pages/shared/privacy_notice';
import ReportsPage from './pages/authenticated/reports';
import LibraryPage from './pages/authenticated/library';
import MainPaperPage from './pages/authenticated/dashboard/subpages/paper';
import SamplePaperPage from './pages/authenticated/dashboard/subpages/sample_paper';
import SettingsPage from './pages/authenticated/settings/student';
import AccountDeletePage from './pages/authenticated/settings/student/subpages/account_delete';
import ParentSettingsPage from './pages/authenticated/settings/parent';
import SubscriptionsPage from './pages/authenticated/subscriptions';
import StudyBuddiesPage from './pages/authenticated/studdy-buddies';
import StudyParticipationPage from './pages/authenticated/studdy-buddies/participation';
import SLibraryPaperPage from './pages/authenticated/library/special_paper';
import NLibraryPaperPage from './pages/authenticated/library/normal_paper';
import TimeTablePage from './pages/authenticated/timetable';

function App() {
  useEffect(() => {
    AOS.init();
  }, [])

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
                    <Route path="/pricing" element={<PricingPage/>}/>
                    <Route path="/signin" element={<SignInPage/>}/>
                    <Route path="/signup" element={<SignUpPage/>}/>
                  </Route>

                  <Route path="/blog/:slug?" element={<BlogPage/>}/>
                  <Route path="/faq" element={<FAQPage/>}/>
                  <Route path="/terms-of-use" element={<TermsOfUsePage/>}/>
                  <Route path="/privacy-notice" element={<PrivacyNoticePage/>}/>

                  <Route element={<ProtectedRoute/>}>
                    {/* all routes that require auth */}
                    <Route path="/choose-child" element={<WhoseLearningPage/>}/>
                    <Route path="/editprofile" element={<ParentSettingsPage/>}/>
                    
                    <Route element={<WhoseLearningProtectedRoute/>}>
                      <Route path="/dashboard" element={<DashboardPage/>}/>
                      <Route path="/reports" element={<ReportsPage/>}/>

                      {/* timetable */}
                      <Route path='/timetable' element={<TimeTablePage/>} />
                      
                      <Route path="/library" element={<LibraryPage/>}/>
                      <Route path="/library/special/:gradeName/:category/:paperID/:savedStateID/:studyBuddyReference" element={<SLibraryPaperPage/>}/>
                      <Route path="/library/normal/:libraryRef" element={<NLibraryPaperPage/>}/>

                      {/* settings */}
                      <Route path="/student-edit-profile" element={<SettingsPage/>}/>
                      <Route path="/account-delete/:student_reference" element={<AccountDeletePage/>}/>

                      {/* making subscription choices */}
                      <Route path="/subscription_payments/:gradeID/:gradeName/:is_special_grade?" element={<SubscriptionsPage/>}/>
                      
                      {/* study buddies */}
                      <Route path="/study-buddies" element={<StudyParticipationPage/>}/>
                      <Route path="/study-buddies/:gradeName/:category/:paperID/:savedStateID/:studyBuddyReference" element={<StudyBuddiesPage/>}/>

                      {/* standard papers */}
                      <Route path="/paper-cover/:gradeName/:category/:paperID/:studyBuddyReference?" element={<MainPaperPage frontPage={true}/>}/>
                      <Route path="/paper/:gradeName/:category/:paperID/:studyBuddyReference?" element={<MainPaperPage frontPage={false}/>}/>
                      <Route path="/sample-paper" element={<SamplePaperPage/>}/>

                      <Route path="/subjects/:grade_reference_id" element={<SubjectsPage/>}/>

                      {/* special paper(s) navigation */}
                      <Route path="/special/:grade_reference_id" element={<SpecialPapersPage/>}/>
                      <Route path="/special/categories/:grade_name/:grade_reference_id" element={<SpecialPaperCategoriesPage/>}/>
                      <Route path="/special/subjects/:grade_name/:category_name/:grade_reference_id" element={<SpecialPaperSubjectsPage/>}/>
                    </Route>

                  </Route>

                  <Route element={<ErrorPage code={404} message="Resource does not exist"/>} path="*" />
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
