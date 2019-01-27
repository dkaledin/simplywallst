export function sendJsonCv(json: string): Promise<Response> {
    return fetch('https://api.simplywall.st/api/careers/job/apply', {
        method: 'POST',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json',
        },
        body: json,
    });
}
