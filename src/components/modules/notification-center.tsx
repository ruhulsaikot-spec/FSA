'use client';

import { useState } from 'react';
import { notifications as initialNotifications } from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Bell,
  CheckCircle,
  AlertTriangle,
  AlertCircle,
  Info,
  Trash2,
  CheckCheck,
} from 'lucide-react';

type NotificationType = 'all' | 'warning' | 'danger' | 'info' | 'success';

const filterTabs: { label: string; value: NotificationType }[] = [
  { label: 'সব', value: 'all' },
  { label: 'সতর্কতা', value: 'warning' },
  { label: 'বিপদ', value: 'danger' },
  { label: 'তথ্য', value: 'info' },
  { label: 'সফল', value: 'success' },
];

const typeIconMap = {
  warning: AlertTriangle,
  danger: AlertCircle,
  info: Info,
  success: CheckCircle,
};

const typeColorMap: Record<string, { border: string; bg: string; badge: string; icon: string }> = {
  warning: {
    border: 'border-l-amber-500',
    bg: 'bg-amber-50 dark:bg-amber-950/30',
    badge: 'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300',
    icon: 'text-amber-600 dark:text-amber-400',
  },
  danger: {
    border: 'border-l-red-500',
    bg: 'bg-red-50 dark:bg-red-950/30',
    badge: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300',
    icon: 'text-red-600 dark:text-red-400',
  },
  info: {
    border: 'border-l-sky-500',
    bg: 'bg-sky-50 dark:bg-sky-950/30',
    badge: 'bg-sky-100 text-sky-800 dark:bg-sky-900/50 dark:text-sky-300',
    icon: 'text-sky-600 dark:text-sky-400',
  },
  success: {
    border: 'border-l-emerald-500',
    bg: 'bg-emerald-50 dark:bg-emerald-950/30',
    badge: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300',
    icon: 'text-emerald-600 dark:text-emerald-400',
  },
};

const typeLabelMap: Record<string, string> = {
  warning: 'সতর্কতা',
  danger: 'বিপদ',
  info: 'তথ্য',
  success: 'সফল',
};

export function NotificationCenter() {
  const [notificationList, setNotificationList] = useState(initialNotifications);
  const [activeFilter, setActiveFilter] = useState<NotificationType>('all');

  const filteredNotifications =
    activeFilter === 'all'
      ? notificationList
      : notificationList.filter((n) => n.type === activeFilter);

  const unreadCount = notificationList.filter((n) => !n.read).length;

  const handleMarkAllRead = () => {
    setNotificationList((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const handleMarkRead = (id: string) => {
    setNotificationList((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const handleDeleteAll = () => {
    setNotificationList([]);
  };

  return (
    <div className="p-4 md:p-6 space-y-4 max-w-[1600px] mx-auto">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Bell className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-xl">বিজ্ঞপ্তি কেন্দ্র</CardTitle>
              <p className="text-sm text-muted-foreground">
                মোট {notificationList.length}টি বিজ্ঞপ্তি{unreadCount > 0 && ` · ${unreadCount}টি অপঠিত`}
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleMarkAllRead}
            disabled={unreadCount === 0}
            className="gap-2"
          >
            <CheckCheck className="h-4 w-4" />
            সব পড়া হিসেবে চিহ্নিত
          </Button>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2">
            {filterTabs.map((tab) => (
              <Button
                key={tab.value}
                variant={activeFilter === tab.value ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveFilter(tab.value)}
                className="rounded-full px-4"
              >
                {tab.label}
                {tab.value !== 'all' && (
                  <Badge
                    variant="secondary"
                    className="ml-2 h-5 min-w-[20px] justify-center rounded-full px-1.5 text-xs"
                  >
                    {notificationList.filter((n) => n.type === tab.value).length}
                  </Badge>
                )}
              </Button>
            ))}
          </div>

          {/* Notification List */}
          <div className="max-h-[600px] overflow-y-auto space-y-2 pr-1 custom-scrollbar">
            {filteredNotifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
                <Bell className="h-12 w-12 mb-3 opacity-30" />
                <p className="text-lg font-medium">কোনো বিজ্ঞপ্তি নেই</p>
                <p className="text-sm">এই বিভাগে নতুন বিজ্ঞপ্তি আসলে এখানে দেখাবে</p>
              </div>
            ) : (
              filteredNotifications.map((notification) => {
                const Icon = typeIconMap[notification.type];
                const colors = typeColorMap[notification.type];
                return (
                  <div
                    key={notification.id}
                    className={`rounded-lg border-l-4 p-4 transition-all duration-200 hover:shadow-md ${
                      notification.read
                        ? 'border-l-border bg-background'
                        : `${colors.border} ${colors.bg}`
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                          notification.read
                            ? 'bg-muted'
                            : colors.badge
                        }`}
                      >
                        <Icon
                          className={`h-4 w-4 ${
                            notification.read ? 'text-muted-foreground' : colors.icon
                          }`}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4
                            className={`text-sm font-semibold truncate ${
                              notification.read
                                ? 'text-muted-foreground'
                                : 'text-foreground'
                            }`}
                          >
                            {notification.title}
                          </h4>
                          {!notification.read && (
                            <span className="h-2 w-2 shrink-0 rounded-full bg-primary" />
                          )}
                        </div>
                        <p
                          className={`text-sm leading-relaxed ${
                            notification.read
                              ? 'text-muted-foreground'
                              : 'text-foreground/80'
                          }`}
                        >
                          {notification.message}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs font-normal">
                              {typeLabelMap[notification.type]}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {notification.time}
                            </span>
                          </div>
                          {!notification.read && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleMarkRead(notification.id)}
                              className="h-7 gap-1.5 text-xs text-muted-foreground hover:text-foreground"
                            >
                              <CheckCheck className="h-3.5 w-3.5" />
                              পড়া হয়েছে
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Clear All Button */}
          {notificationList.length > 0 && (
            <div className="flex justify-center pt-2 border-t">
              <Button
                variant="destructive"
                size="sm"
                onClick={handleDeleteAll}
                className="gap-2"
              >
                <Trash2 className="h-4 w-4" />
                সব মুছুন
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}