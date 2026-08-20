import { datadogRum } from '@datadog/browser-rum';

export function initDatadog() {
  const applicationId = import.meta.env.VITE_DATADOG_APPLICATION_ID;
  const clientToken = import.meta.env.VITE_DATADOG_CLIENT_TOKEN;

  if (!applicationId || !clientToken) {
    return;
  }

  datadogRum.init({
    applicationId,
    clientToken,
    site: 'datadoghq.eu',
    service: 'chalethub',
    env: import.meta.env.MODE,
    version: import.meta.env.VITE_APP_VERSION ?? '0.0.0',
    sessionSampleRate: 100,
    sessionReplaySampleRate: 20,
    trackResources: true,
    trackUserInteractions: true,
    trackLongTasks: true,
    defaultPrivacyLevel: 'mask-user-input',
  });
}
