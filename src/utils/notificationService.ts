/**
 * Browser Notification Service for 1930 CFCFRMS
 * Manages native HTML5 Desktop Notifications for Bank Lien & Case Statuses
 */

export interface AppNotification {
  id: string;
  title: string;
  body: string;
  timestamp: string;
  type: 'lien_alert' | 'case_created' | 'security_warning' | 'info';
  read?: boolean;
}

export const requestNotificationPermission = async (): Promise<NotificationPermission> => {
  if (!('Notification' in window)) {
    console.warn('HTML5 Notifications not supported in this browser.');
    return 'denied';
  }

  try {
    const permission = await Notification.requestPermission();
    return permission;
  } catch (err) {
    console.error('Error requesting notification permission:', err);
    return 'denied';
  }
};

export const sendBrowserNotification = (
  title: string,
  options?: NotificationOptions
): Notification | null => {
  if (!('Notification' in window)) return null;

  if (Notification.permission === 'granted') {
    try {
      const notification = new Notification(title, {
        icon: 'https://cdn-icons-png.flaticon.com/512/9438/9438515.png',
        badge: 'https://cdn-icons-png.flaticon.com/512/9438/9438515.png',
        tag: '1930-cybercrime-alert',
        ...options
      });

      notification.onclick = () => {
        window.focus();
        notification.close();
      };

      return notification;
    } catch (e) {
      console.warn('Failed to dispatch notification:', e);
      return null;
    }
  }

  return null;
};

export const triggerCaseCreatedNotification = (caseId: string, amount: string) => {
  sendBrowserNotification(`🛡️ 1930 Case Registered: ${caseId}`, {
    body: `Emergency Bank Lien of ${amount} initiated to beneficiary nodal desks. Keep your 1930 Ack ID saved.`,
    requireInteraction: true
  });
};

export const triggerBankLienUpdateNotification = (caseId: string, bankName: string) => {
  sendBrowserNotification(`⚡ 1930 Nodal Alert: ${bankName}`, {
    body: `Recipient bank has placed an automated freeze/lien on suspect accounts for Case ${caseId}.`,
    requireInteraction: false
  });
};
