export type DetectionSeverity = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
export type DetectionStatus = 'ACTIVE' | 'PENDING' | 'RESOLVED';

export interface DetectionLog {
  id: string;
  username: string;
  cheat: string;
  time: string;
  ip: string;
  hwid: string;
  severity: DetectionSeverity;
  status: DetectionStatus;
}

export interface SidebarItem {
  key: string;
  label: string;
  icon: string;
}

export interface EmailSettings {
  moderatorEmail: string;
  serviceId: string;
  templateId: string;
  publicKey: string;
  smtpServer: string;
  smtpPort: string;
  alertEnabled: boolean;
}

export type ThemeMode = 'dark' | 'light';
