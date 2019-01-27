import {BaseExecutor, SetState} from 'react-simply-terminal-emulator';
import merge from 'lodash.merge';
import {getResultByCurrentStep, toFormattedJson} from './cvExecutor.helper';
import {CvExecutorStep, IErrorsJsonResponse, ISuccessJsonResponse} from './cvExecutor.interface';
import {sendJsonCv} from './cvExecutor.service';

export class CvExecutor extends BaseExecutor {
    private setState: SetState;
    private prevStep: CvExecutorStep;
    private complete: boolean;
    private result = {};

    public init() {
        this.prevStep = CvExecutorStep.Init;
        this.complete = false;
    }

    public execute(command: string, setState: SetState): void {
        this.setState = setState;

        const currentStepData = getResultByCurrentStep(this.prevStep, command);
        const {
            next,
            error,
        } = currentStepData;

        const message = currentStepData.message || [];
        const result = currentStepData.result || {};

        if (next.step === CvExecutorStep.JsonConfirm) {
            this.updateState([toFormattedJson(this.result)], next.prompt);
            this.prevStep = next.step;

        } else if (next.step === CvExecutorStep.SendJson) {
            this.updateState(['Sending...'], '');
            this.prevStep = CvExecutorStep.SendingJson;

            sendJsonCv(JSON.stringify(this.result)).then(response => {
                this.complete = true;
                const responseMessage: string[] = [];

                response.json().then(json => {
                    if (response.status === 200) {
                        responseMessage.push((json as ISuccessJsonResponse).success);
                    } else {
                        (json as IErrorsJsonResponse).errors
                            .forEach(responseError => {
                                responseMessage.push(`${responseError.title}: ${responseError.detail}`);
                            });
                    }
                    this.updateState(responseMessage);
                });
            });

        } else if (next.step === CvExecutorStep.Aborted) {
            this.complete = true;
            this.updateState(['Aborted']);

        } else {
            if (error === undefined) {
                this.updateState(message, next.prompt);
                this.prevStep = next.step;
                this.result = merge(this.result, result);

            } else {
                this.updateState([error], next.prompt);
            }
        }
    }

    public isCompleted(): boolean {
        return this.complete;
    }

    protected getCommandPattern() {
        return /^cv$/i;
    }

    private updateState(newLines: string[], prompt?: string) {
        this.setState((prevState, props) => {
            const nextPrompt = prompt === undefined
                ? props.prompt
                : prompt;

            return {
                history: [
                    ...prevState.history,
                    ...newLines,
                ],
                prompt: nextPrompt,
            };
        });
    }
}
