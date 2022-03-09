/**
 * Check user access to endpoint
 * @param allowedAccessTypes Endpoints
 * @param userAccessTypes User access endpoints
 * @returns true - if has
 */
export function hasUserAccessToEndpoint(allowedAccessTypes: string[], userAccessTypes: string[]): boolean {
  return allowedAccessTypes.some((at) => userAccessTypes.some((uat) => uat === at));
}
