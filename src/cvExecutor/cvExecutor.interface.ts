export interface IResultByCurrentStep {
    result?: {};
    message?: [];
    error?: string;
    next: {
        step: CvExecutorStep,
        prompt: string,
    };
}

export enum CvExecutorStep {
    Init,
    JobTitle,
    GivenName,
    FamilyName,
    Email,
    Mobile,
    PortfolioUrl,
    Bio,
    Skills,
    SkillsYears,
    SkillsConfidenceRating,
    SkillsTechnology,
    SkillsConfirm,
    PreviousJobs,
    PreviousJobsTitle,
    PreviousJobsYears,
    PreviousJobsConfirm,
    JsonConfirm,
    SendJson,
    SendingJson,
    Aborted,
}

export interface ISuccessJsonResponse {
    success: string;
}

export interface IErrorsJsonResponse {
    errors: IErrorJsonResponse[];
}

interface IErrorJsonResponse {
    status: number;
    source: {
        parameter: string;
    };
    title: string;
    detail: string;
}
