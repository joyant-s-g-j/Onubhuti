"use client"
import { getNotifications, markNotificationsAsRead } from '@/actions/notification.action'
import NotificationSkeleton from '@/components/NotificationSkeleton'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

type Notifications = Awaited<ReturnType<typeof getNotifications>>
type Notification = Notifications[number]

function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [isLoading, setLoading] = useState(true)

  useEffect(() =>{
    const fetchNotifications = async () => {
        setLoading(true)
        try {
            const data = await getNotifications();
            setNotifications(data);
            const unreadIds = data.filter(n => !n.read).map(n => n.id)
            if(unreadIds.length > 0) await markNotificationsAsRead(unreadIds)
        } catch (error) {
            toast.error("Failed to fetch notifications")
        } finally {
            setLoading(false)
        }
    }
    fetchNotifications()
  }, [])

  if(isLoading) return <NotificationSkeleton />
  return (
    <div>NotificationsPage</div>
  )
}

export default NotificationsPage