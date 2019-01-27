import {getResultByCurrentStep} from '../cvExecutor.helper';
import {CvExecutorStep} from '../cvExecutor.interface';

describe('getResultByCurrentStep', () => {
    it('should return expected response for every receive command', () => {
        const actualList = [];

        actualList.push(getResultByCurrentStep(CvExecutorStep.Init, ''));
        actualList.push(getResultByCurrentStep(CvExecutorStep.JobTitle, ''));
        actualList.push(getResultByCurrentStep(CvExecutorStep.GivenName, 'Warren'));
        actualList.push(getResultByCurrentStep(CvExecutorStep.FamilyName, 'Buffett'));
        actualList.push(getResultByCurrentStep(CvExecutorStep.Email, 'tupaclives1985@gmail.com'));
        actualList.push(getResultByCurrentStep(CvExecutorStep.Mobile, '04 0404 4044'));
        actualList.push(getResultByCurrentStep(CvExecutorStep.PortfolioUrl, 'https://warrenbuffett.id.au'));
        actualList.push(getResultByCurrentStep(CvExecutorStep.Bio, 'Hi I like building cool things...'));

        actualList.push(getResultByCurrentStep(CvExecutorStep.Skills, 'php'));
        actualList.push(getResultByCurrentStep(CvExecutorStep.SkillsYears, '2'));
        actualList.push(getResultByCurrentStep(CvExecutorStep.SkillsConfidenceRating, '50'));
        actualList.push(getResultByCurrentStep(CvExecutorStep.SkillsTechnology, 'symfony, laravel'));
        actualList.push(getResultByCurrentStep(CvExecutorStep.SkillsConfirm, 'yes'));

        actualList.push(getResultByCurrentStep(CvExecutorStep.Skills, 'js'));
        actualList.push(getResultByCurrentStep(CvExecutorStep.SkillsYears, '3'));
        actualList.push(getResultByCurrentStep(CvExecutorStep.SkillsConfidenceRating, '99'));
        actualList.push(getResultByCurrentStep(CvExecutorStep.SkillsTechnology, 'typescript,react , redux, node'));
        actualList.push(getResultByCurrentStep(CvExecutorStep.SkillsConfirm, 'no'));

        actualList.push(getResultByCurrentStep(CvExecutorStep.PreviousJobs, 'acme corp'));
        actualList.push(getResultByCurrentStep(CvExecutorStep.PreviousJobsTitle, 'Front-end developer'));
        actualList.push(getResultByCurrentStep(CvExecutorStep.PreviousJobsYears, '2'));
        actualList.push(getResultByCurrentStep(CvExecutorStep.PreviousJobsConfirm, ''));

        actualList.push(getResultByCurrentStep(CvExecutorStep.PreviousJobs, 'example studios'));
        actualList.push(getResultByCurrentStep(CvExecutorStep.PreviousJobsTitle, 'Junior developer'));
        actualList.push(getResultByCurrentStep(CvExecutorStep.PreviousJobsYears, '1'));
        actualList.push(getResultByCurrentStep(CvExecutorStep.PreviousJobsConfirm, 'no'));

        expect(actualList).toMatchSnapshot();
    });
});
