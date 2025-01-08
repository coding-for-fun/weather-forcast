const  AppConstants = new Map<string, string>([
["TITLE" , "Let's check today's Weather"],
["IN_PROGRESS" , "Getting weather details..."],
["NOT_FOUND", "City not found"],
["APP_TITLE", "WEATHER FORECAST"]
]);

export function getConstants(key:string): string | undefined {
    return AppConstants.get(key);
 }