import {CvExecutorStep, IResultByCurrentStep} from './cvExecutor.interface';

export function getResultByCurrentStep(currentStep: CvExecutorStep, command: string): IResultByCurrentStep {
    return steps[currentStep](command);
}

export function getNextByStep(step: CvExecutorStep) {
    const promptByStep = {
        [CvExecutorStep.JobTitle]: 'job_title: (Front-end Developer)',
        [CvExecutorStep.GivenName]: 'given_name:',
        [CvExecutorStep.FamilyName]: 'family_name:',
        [CvExecutorStep.Email]: 'email:',
        [CvExecutorStep.Mobile]: 'mobile:',
        [CvExecutorStep.PortfolioUrl]: 'portfolio_url:',
        [CvExecutorStep.Bio]: 'bio:',
        [CvExecutorStep.Skills]: 'skills:',
        [CvExecutorStep.SkillsYears]: 'years:',
        [CvExecutorStep.SkillsConfidenceRating]: 'confidence_rating:',
        [CvExecutorStep.SkillsTechnology]: 'technology:',
        [CvExecutorStep.SkillsConfirm]: 'Do You have any more skills? (yes)',
        [CvExecutorStep.PreviousJobs]: 'previous_jobs:',
        [CvExecutorStep.PreviousJobsTitle]: 'job_title:',
        [CvExecutorStep.PreviousJobsYears]: 'years:',
        [CvExecutorStep.PreviousJobsConfirm]: 'Do You have any more previous jobs? (yes)',
        [CvExecutorStep.JsonConfirm]: 'Is this Ok? (yes)',
        [CvExecutorStep.SendingJson]: '',
        [CvExecutorStep.Aborted]: '',
    };

    return {
        step,
        prompt: promptByStep[step],
    };
}

export const steps = {
    [CvExecutorStep.Init]: getInit,
    [CvExecutorStep.JobTitle]: getJobTitle,
    [CvExecutorStep.GivenName]: getGivenName,
    [CvExecutorStep.FamilyName]: getFamilyName,
    [CvExecutorStep.Email]: getEmail,
    [CvExecutorStep.Mobile]: getMobile,
    [CvExecutorStep.PortfolioUrl]: getPortfolioUrl,
    [CvExecutorStep.Bio]: getBio,
    [CvExecutorStep.Skills]: getSkills,
    [CvExecutorStep.SkillsYears]: getSkillsYears,
    [CvExecutorStep.SkillsConfidenceRating]: getSkillsConfidenceRating,
    [CvExecutorStep.SkillsTechnology]: getSkillsTechnology,
    [CvExecutorStep.SkillsConfirm]: getSkillsConfirm,
    [CvExecutorStep.PreviousJobs]: getPreviousJobs,
    [CvExecutorStep.PreviousJobsTitle]: getPreviousJobsTitle,
    [CvExecutorStep.PreviousJobsYears]: getPreviousJobsYears,
    [CvExecutorStep.PreviousJobsConfirm]: getPreviousJobsConfirm,
    [CvExecutorStep.JsonConfirm]: getJsonConfirm,
    [CvExecutorStep.SendingJson]: getSendingJson,
    [CvExecutorStep.Aborted]: getAborted,
};

export function toFormattedJson(object: any): string {
    return JSON.stringify(object, undefined, 2);
}

function getInit() {
    return {
        message: ['Welcome to the CV terminal command!'],
        next: getNextByStep(CvExecutorStep.JobTitle),
    };
}

function getJobTitle(command: string) {
    return {
        result: {
            job_title: command || 'Front-end Developer',
        },
        next: getNextByStep(CvExecutorStep.GivenName),
    };
}

function getGivenName(command: string) {
    if (command !== '') {
        return {
            result: {
                given_name: command,
            },
            next: getNextByStep(CvExecutorStep.FamilyName),
        };
    } else {
        return {
            error: 'Wrong given_name',
            next: getNextByStep(CvExecutorStep.GivenName),
        };
    }
}

function getFamilyName(command: string) {
    if (command !== '') {
        return {
            result: {
                family_name: command,
            },
            next: getNextByStep(CvExecutorStep.Email),
        };
    } else {
        return {
            error: 'Wrong family_name',
            next: getNextByStep(CvExecutorStep.FamilyName),
        };
    }
}

function getEmail(command: string) {
    if (isValidEmail(command)) {
        return {
            result: {
                email: command,
            },
            next: getNextByStep(CvExecutorStep.Mobile),
        };
    } else {
        return {
            error: 'Wrong email',
            next: getNextByStep(CvExecutorStep.Email),
        };
    }
}

function getMobile(command: string) {
    if (/^[0-9 ]+$/i.test(command)) {
        return {
            result: {
                mobile: command,
            },
            next: getNextByStep(CvExecutorStep.PortfolioUrl),
        };
    } else {
        return {
            error: 'Wrong mobile',
            next: getNextByStep(CvExecutorStep.Mobile),
        };
    }
}

function getPortfolioUrl(command: string) {
    if (isValidUrl(command)) {
        return {
            result: {
                portfolio_url: command,
            },
            next: getNextByStep(CvExecutorStep.Bio),
        };
    } else {
        return {
            error: 'Wrong portfolio_url',
            next: getNextByStep(CvExecutorStep.PortfolioUrl),
        };
    }
}

function getBio(command: string) {
    if (command !== '') {
        return {
            result: {
                bio: command,
            },
            next: getNextByStep(CvExecutorStep.Skills),
        };
    } else {
        return {
            error: 'Wrong portfolio_url',
            next: getNextByStep(CvExecutorStep.Bio),
        };
    }
}

let skillKey = '';

function getSkills(command: string) {
    if (command !== '') {
        skillKey = command;
        return {
            result: {
                skills: {
                    [command]: {},
                },
            },
            next: getNextByStep(CvExecutorStep.SkillsYears),
        };
    } else {
        return {
            error: 'Wrong skill name',
            next: getNextByStep(CvExecutorStep.Skills),
        };
    }
}

function getSkillsYears(command: string) {
    if (/^[0-9]+$/.test(command)) {
        return {
            result: {
                skills: {
                    [skillKey]: {
                        years: parseInt(command, 10),
                    },
                },
            },
            next: getNextByStep(CvExecutorStep.SkillsConfidenceRating),
        };
    } else {
        return {
            error: 'Please enter valid skills years',
            next: getNextByStep(CvExecutorStep.SkillsYears),
        };
    }
}

function getSkillsConfidenceRating(command: string) {
    if (/^[0-9]{1,2}$/.test(command)) {
        return {
            result: {
                skills: {
                    [skillKey]: {
                        confidence_rating: parseInt(command, 10),
                    },
                },
            },
            next: getNextByStep(CvExecutorStep.SkillsTechnology),
        };
    }
    return {
        error: 'Please enter valid skills confidence_rating',

        next: getNextByStep(CvExecutorStep.SkillsConfidenceRating),
    };
}

function getSkillsTechnology(command: string) {
    if (command !== '') {
        return {
            result: {
                skills: {
                    [skillKey]: {
                        technology: command.split(/\s?,\s?/),
                    },
                },
            },
            next: getNextByStep(CvExecutorStep.SkillsConfirm),
        };
    }

    return {
        error: 'Please enter valid skills technology',
        next: getNextByStep(CvExecutorStep.SkillsTechnology),
    };
}

function getSkillsConfirm(command: string) {
    if (command === '' || /yes|ok|true/i.test(command)) {
        return {
            next: getNextByStep(CvExecutorStep.Skills),
        };
    }

    return {
        message: ['Great!'],
        next: getNextByStep(CvExecutorStep.PreviousJobs),
    };
}

let previousJobsKey = '';

function getPreviousJobs(command: string) {
    if (command !== '') {
        previousJobsKey = command;
        return {
            result: {
                previous_jobs: {
                    [command]: {},
                },
            },
            next: getNextByStep(CvExecutorStep.PreviousJobsTitle),
        };
    }
    return {
        error: 'Please enter valid previous_jobs',
        next: getNextByStep(CvExecutorStep.PreviousJobs),
    };
}

function getPreviousJobsTitle(command: string) {
    if (command !== '') {
        return {
            result: {
                previous_jobs: {
                    [previousJobsKey]: {
                        job_title: command,
                    },
                },
            },
            next: getNextByStep(CvExecutorStep.PreviousJobsYears),
        };
    }
    return {
        error: 'Please enter valid job_title',
        next: getNextByStep(CvExecutorStep.PreviousJobsTitle),
    };

}

function getPreviousJobsYears(command: string) {
    if (/^[0-9]+$/.test(command)) {
        return {
            result: {
                previous_jobs: {
                    [previousJobsKey]: {
                        years: parseInt(command, 10),
                    },
                },
            },
            next: getNextByStep(CvExecutorStep.PreviousJobsConfirm),
        };
    }
    return {
        error: 'Please enter valid year',
        next: getNextByStep(CvExecutorStep.PreviousJobsYears),
    };
}

function getPreviousJobsConfirm(command: string) {
    if (command === '' || /yes|ok|true/i.test(command)) {
        return {
            next: getNextByStep(CvExecutorStep.PreviousJobs),
        };
    }

    return {
        message: ['Json is ready to send!', 'Please check it.'],
        next: getNextByStep(CvExecutorStep.JsonConfirm),
    };
}

function getJsonConfirm(command: string) {
    if (command === '' || /yes|ok|true/i.test(command)) {
        return {
            next: getNextByStep(CvExecutorStep.SendJson),
        };
    }
    return {
        next: getNextByStep(CvExecutorStep.Aborted),
    };
}

function getSendingJson() {
    return {
        next: getNextByStep(CvExecutorStep.SendingJson),
    };
}

function getAborted() {
    return {
        next: getNextByStep(CvExecutorStep.Aborted),
    };
}

function isValidEmail(email: string): boolean {
    // tslint:disable-next-line
    const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return pattern.test(email);
}

function isValidUrl(url: string): boolean {
    // tslint:disable-next-line
    const pattern = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/;

    return pattern.test(url);
}
