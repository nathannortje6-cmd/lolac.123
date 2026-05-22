import type { DetectionLog, SidebarItem, ThemeMode } from '../types';

export const sidebarItems: SidebarItem[] = [
  { key: 'dashboard', label: 'Dashboard', icon: '📊' },
  { key: 'logs', label: 'Live Detection Logs', icon: '🛰️' },
  { key: 'reports', label: 'Player Reports', icon: '📝' },
  { key: 'bans', label: 'Ban Management', icon: '⛔' },
  { key: 'hardware', label: 'Hardware ID Logs', icon: '💽' },
  { key: 'screenshots', label: 'Screenshots', icon: '📷' },
  { key: 'email', label: 'Email Alerts', icon: '✉️' },
  { key: 'status', label: 'System Status', icon: '⚙️' },
  { key: 'analytics', label: 'Analytics', icon: '📈' },
  { key: 'settings', label: 'Settings', icon: '🔧' },
  { key: 'logout', label: 'Logout', icon: '🚪' }
];

export const themeModes: ThemeMode[] = ['dark', 'light'];

export const severityStyles: Record<DetectionLog['severity'], string> = {
  LOW: 'bg-emerald-500/10 text-emerald-300',
  MEDIUM: 'bg-amber-500/10 text-amber-300',
  HIGH: 'bg-orange-500/10 text-orange-300',
  CRITICAL: 'bg-rose-500/10 text-rose-300'
};

export const systemStatus = [
  { label: 'Detection Engine', value: 'Online', status: 'Healthy' },
  { label: 'Email Service', value: 'Connected', status: 'Healthy' },
  { label: 'Database Sync', value: 'Idle', status: 'Stable' },
  { label: 'API Gateway', value: 'Online', status: 'Healthy' }
];

export const initialTheme: ThemeMode = 'dark';
