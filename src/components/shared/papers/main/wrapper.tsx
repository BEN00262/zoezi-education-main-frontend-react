import { positions, Provider as AlertProvider } from 'react-alert';
// @ts-ignore
import AlertTemplate from 'react-alert-template-basic';
import CongratsPopComp from './components/CongratsPopComp';
import GlobalErrorBoundaryComp from './components/GlobalErrorBoundaryComp';
import StateWatcherComp from "./components/state_watcher"
import { GlobalContextComp } from './contexts/global';

const options = {
    position: positions.MIDDLE,
    timeout:3000
}

const PaperWrapperComp: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <AlertProvider template={AlertTemplate} {...options}>
            <GlobalContextComp>
                <GlobalErrorBoundaryComp>
                    <CongratsPopComp/>
                    {children}
                    <StateWatcherComp/>
                </GlobalErrorBoundaryComp>
            </GlobalContextComp>
        </AlertProvider>
    );
}

export default PaperWrapperComp;