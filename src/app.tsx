import * as React from 'react';
import {Terminal, terminalEmulator} from 'react-simply-terminal-emulator';
import {CvExecutor} from './cvExecutor/cvExecutor';
import {welcomeMessage} from './app.helper';

terminalEmulator.addExecutor(new CvExecutor());

export class App extends React.Component {
    public render() {
        return (
            <Terminal
                prompt={'cv@simplywallst:~$'}
                terminalEmulator={terminalEmulator}
                history={welcomeMessage}
            />
        );
    }
}
