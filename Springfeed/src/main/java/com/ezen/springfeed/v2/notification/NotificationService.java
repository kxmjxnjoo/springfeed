package com.ezen.springfeed.v2.notification;

import com.ezen.springfeed.model.Notification;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotificationService {

    private final NotificationRepository nr;

    public NotificationService(NotificationRepository nr) {
        this.nr = nr;
    }

    public List<Notification> getNotificationsByUserTo(String userid) {
        return nr.findAllNotificationByUserToOrderByCreateDateDesc(userid);
    }

    public void addNotification(Notification noti) {
        nr.save(noti);
    }
}
